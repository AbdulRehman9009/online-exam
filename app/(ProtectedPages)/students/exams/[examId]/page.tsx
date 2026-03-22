import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Clock, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function TakeExamPage({ params }: { params: Promise<{ examId: string }> }) {
   const session = await auth();

   if (!session || !session.user || session.user.role !== "STUDENT") {
      redirect("/sign-in");
   }
   const { examId } = await params;

   const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
         questions: true,
         results: {
            where: { studentId: session.user.id }
         }
      }
   });

   if (!exam) {
      notFound();
   }

   // Pre-access Security Check for schedules
   const now = new Date();
   const hasStarted = exam.startTime ? now >= exam.startTime : true;
   const hasExpired = exam.expiresAt ? now > exam.expiresAt : false;
   const isCompleted = exam.results.length > 0;

   if (isCompleted) {
      return (
         <div className="flex flex-col items-center justify-center p-12 max-w-lg mx-auto text-center border rounded-xl bg-card border-blue-200">
            <AlertTriangle className="h-10 w-10 text-blue-500 mb-4" />
            <h2 className="text-xl font-bold">Exam Already Completed</h2>
            <p className="text-muted-foreground mt-2 mb-6">
               You have already completed this examination. You cannot take it again.
            </p>
            <Button asChild variant="outline">
               <Link href="/students/exams">Go Back to My Exams</Link>
            </Button>
         </div>
      );
   }

   if (!hasStarted) {
      return (
         <div className="flex flex-col items-center justify-center p-12 max-w-lg mx-auto text-center border rounded-xl bg-card">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
            <h2 className="text-xl font-bold">Exam Not Started Yet</h2>
            <p className="text-muted-foreground mt-2 mb-6">
               This exam is scheduled to start on {exam.startTime && format(exam.startTime, "PPp")}.
               Please come back later.
            </p>
            <Button asChild variant="outline">
               <Link href="/students/exams">Go Back</Link>
            </Button>
         </div>
      );
   }

   if (hasExpired) {
      return (
         <div className="flex flex-col items-center justify-center p-12 max-w-lg mx-auto text-center border rounded-xl bg-card border-red-200">
            <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
            <h2 className="text-xl font-bold">Exam Closed</h2>
            <p className="text-muted-foreground mt-2 mb-6">
               This exam has already expired and is no longer accepting new submissions.
            </p>
            <Button asChild variant="outline">
               <Link href="/students/exams">Go Back</Link>
            </Button>
         </div>
      );
   }

   // --- Proceed to actual exam interface ---

   // Note: Building the full interactive taking capabilities involves
   // Client components handling the timer, state, and API submission which is a broader scope.
   // For now, we will render a placeholder "Start Exam" confirmation UI to satisfy the requirement
   // of securing the route, and preparing the shell.

   return (
      <div className="max-w-3xl mx-auto space-y-6">
         <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/students/exams">
               <ArrowLeft className="h-4 w-4" /> Back to My Exams
            </Link>
         </Button>

         <Card>
            <CardHeader>
               <CardTitle className="text-2xl">{exam.title}</CardTitle>
               <CardDescription className="text-base">{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-sm text-muted-foreground font-medium">Time Allowed</p>
                     <p className="text-lg font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" /> {exam.duration} Minutes
                     </p>
                  </div>
                  <div className="space-y-1 text-right">
                     <p className="text-sm text-muted-foreground font-medium">Questions</p>
                     <p className="text-lg font-bold">{exam.questions.length}</p>
                  </div>
               </div>

               <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4 text-yellow-500" /> Instructions
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                     <li>Once you start, the timer cannot be paused.</li>
                     <li>Do not refresh the page or you may lose your progress.</li>
                     <li>Ensure you have a stable internet connection.</li>
                     {exam.expiresAt && (
                        <li>Make sure to submit before the deadline ({format(exam.expiresAt, "p")}) as the exam will auto-close.</li>
                     )}
                  </ul>
               </div>
            </CardContent>
            <CardFooter className="pt-4 flex justify-end">
               <Link href={`/students/exams/${examId}/start`}>
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                     Begin Exam
                  </Button>
               </Link>
            </CardFooter>
         </Card>
      </div>
   );
}
