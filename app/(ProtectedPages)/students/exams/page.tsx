import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarIcon, Clock, Lock } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function StudentExamsPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "STUDENT") {
    redirect("/sign-in");
  }

  // Get the student's linked faculty information
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      faculty: true
    }
  });

  const facultyUserId = student?.faculty?.userId;

  // Removed strict faculty linking requirement so students can view all available exams 
  const exams = await prisma.exam.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      _count: {
        select: { questions: true }
      },
      results: {
        where: { studentId: session.user.id }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Exams</h1>
          <p className="text-muted-foreground mt-1">
            Browse and take available examinations.
          </p>
        </div>
      </div>

      {exams.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card border-dashed">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
             <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Exams Available</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            There are currently no examinations scheduled or available for you to take.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const now = new Date();
            
            // Availability Logic
            const isCompleted = exam.results.length > 0;
            const hasStarted = exam.startTime ? now >= exam.startTime : true;
            const hasExpired = exam.expiresAt ? now > exam.expiresAt : false;
            
            const isAvailable = hasStarted && !hasExpired && !isCompleted;
            const isUpcoming = !hasStarted && !isCompleted;

            return (
              <Card key={exam.id} className={`flex flex-col ${(!isAvailable && !isCompleted) ? 'opacity-70 grayscale-30' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="line-clamp-2">{exam.title}</CardTitle>
                    {isCompleted ? (
                       <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium dark:bg-blue-900/30 dark:text-blue-400">
                         Completed
                       </span>
                    ) : isAvailable ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium dark:bg-green-900/30 dark:text-green-400">
                         Available
                      </span>
                    ) : isUpcoming ? (
                       <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium dark:bg-yellow-900/30 dark:text-yellow-400">
                         Upcoming
                       </span>
                    ) : (
                       <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 dark:bg-red-900/30 dark:text-red-400">
                         <Lock className="w-3 h-3"/> Closed
                       </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">
                    {exam.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {exam.duration} mins</span>
                  </div>
                  <div className="flex items-center text-muted-foreground gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{exam._count.questions} Questions</span>
                  </div>
                  
                  {(exam.startTime || exam.expiresAt) && (
                     <div className="pt-3 mt-3 border-t space-y-1.5">
                       {exam.startTime && (
                         <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>Starts: {format(exam.startTime, "PPp")}</span>
                         </div>
                       )}
                       {exam.expiresAt && (
                         <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <CalendarIcon className="w-3.5 h-3.5 text-red-400" />
                            <span>Ends: {format(exam.expiresAt, "PPp")}</span>
                         </div>
                       )}
                     </div>
                  )}
                </CardContent>
                <CardFooter className="border-t bg-muted/20 pt-4">
                   <Button 
                      className="w-full" 
                      disabled={!isAvailable || isCompleted}
                      variant={isCompleted ? "secondary" : "default"}
                      asChild={isAvailable}
                   >
                     {isCompleted ? (
                        "Already Completed"
                     ) : isAvailable ? (
                        <Link href={`/students/exams/${exam.id}`}>
                           Start Exam
                        </Link>
                     ) : isUpcoming ? (
                        "Not Yet Available"
                     ) : (
                        "Exam Closed"
                     )}
                   </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
