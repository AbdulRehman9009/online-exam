import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarIcon, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function FacultyExamsPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "FACULTY") {
    redirect("/sign-in");
  }

  const exams = await prisma.exam.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      _count: {
        select: { questions: true, results: true },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Exams</h1>
          <p className="text-muted-foreground mt-1">
            Create, view, and manage your examinations.
          </p>
        </div>
        <Link href="/faculty/exams/create">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Exam
          </Button>
        </Link>
      </div>

      {exams.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card border-dashed">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <PlusCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No exams found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            You haven't created any exams yet. Start by creating your first online
            examination for your students.
          </p>
          <Link href="/faculty/exams/create" className="mt-6">
            <Button>Create Exam</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const isActive = exam.startTime && exam.expiresAt
              ? new Date() >= exam.startTime && new Date() <= exam.expiresAt
              : true; // if no schedule, active by default (or consider it draft based on logic)
              
            const isExpired = exam.expiresAt && new Date() > exam.expiresAt;

            return (
              <Card key={exam.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="line-clamp-2">{exam.title}</CardTitle>
                    {isExpired ? (
                       <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full whitespace-nowrap dark:bg-red-900/30 dark:text-red-400">
                         Expired
                       </span>
                    ) : isActive ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full whitespace-nowrap dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full whitespace-nowrap dark:bg-yellow-900/30 dark:text-yellow-400">
                        Scheduled
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
                    <FileQuestion className="w-4 h-4" />
                    <span>{exam._count.questions} Questions</span>
                  </div>
                   <div className="flex items-center text-muted-foreground gap-2">
                    <Users className="w-4 h-4" />
                    <span>{exam._count.results} Submissions</span>
                  </div>
                  
                  {(exam.startTime || exam.expiresAt) && (
                     <div className="pt-3 mt-3 border-t space-y-1.5">
                       {exam.startTime && (
                         <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>Start: {format(exam.startTime, "PPp")}</span>
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
                <CardFooter className="border-t bg-muted/20 pt-4 flex justify-between">
                   <Button variant="outline" size="sm">
                     Edit
                   </Button>
                   <Button variant="secondary" size="sm">
                     View Results
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

// Ensure icons used exist in the component
import { FileQuestion } from "lucide-react";
