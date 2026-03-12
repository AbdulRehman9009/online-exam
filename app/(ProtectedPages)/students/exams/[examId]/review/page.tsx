import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function ExamReviewPage({ 
  params 
}: { 
  params: Promise<{ examId: string }> 
}) {
  const session = await auth();
  const { examId } = await params;

  if (!session || !session.user || session.user.role !== "STUDENT") {
    redirect("/sign-in");
  }

  const result = await prisma.result.findFirst({
    where: {
      examId: examId,
      studentId: session.user.id,
    },
    include: {
        exam: {
            include: {
                questions: true
            }
        }
    }
  });

  if (!result) {
    redirect(`/students/exams/${examId}`);
  }

  const { exam } = result;
  const percentage = Math.round((result.score / result.total) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Summary Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card p-6 md:p-8 rounded-3xl border shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <CheckCircle2 size={120} />
         </div>
         
         <div className="space-y-2 relative z-10 text-center md:text-left">
            <Link href="/students/exams" className="text-sm font-bold text-primary flex items-center gap-1.5 hover:underline mb-2 justify-center md:justify-start">
               <ArrowLeft size={14} /> Back to My Exams
            </Link>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{exam.title}</h1>
            <CardDescription className="text-lg">Review your performance and correct answers.</CardDescription>
         </div>

         <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-2xl border-2 border-primary/20 min-w-[180px] relative z-10">
            <p className="text-xs font-black uppercase tracking-widest text-primary/60 mb-1">Total Score</p>
            <div className="text-5xl font-black text-primary tabular-nums">
               {result.score}<span className="text-xl text-primary/40 font-bold ml-1">/ {result.total}</span>
            </div>
            <div className="mt-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold leading-none">
                {percentage}% Score
            </div>
         </div>
      </div>

      <div className="space-y-6">
         <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
            <Info className="w-6 h-6 text-primary" /> Questions Review
         </h2>

         {exam.questions.map((question, qIndex) => {
            const studentAnswers = result.answers as Record<string, number> | null;
            const selectedOption = studentAnswers ? studentAnswers[question.id] : null;
            
            return (
              <Card key={question.id} className="overflow-hidden border-border/50 shadow-sm transition-all duration-300 hover:shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                   <div className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                         {qIndex + 1}
                      </div>
                      <CardTitle className="text-xl leading-snug">{question.text}</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="pt-6 pb-2">
                   <div className="grid gap-3">
                      {question.options.map((option, optIndex) => {
                         const isCorrect = optIndex === question.correctAnswer;
                         const isSelected = optIndex === selectedOption;
                         
                         return (
                            <div 
                              key={optIndex} 
                              className={cn(
                                "p-4 rounded-xl border-2 flex items-center justify-between transition-all group",
                                isCorrect 
                                  ? "border-green-500 bg-green-500/5 shadow-sm" 
                                  : isSelected && !isCorrect
                                    ? "border-destructive/50 bg-destructive/5"
                                    : "border-border/60 bg-background/50"
                              )}
                            >
                               <div className="flex items-center gap-4">
                                  <div className={cn(
                                     "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                                     isCorrect 
                                       ? "bg-green-500 border-green-500 text-white" 
                                       : isSelected
                                         ? "bg-destructive border-destructive text-white"
                                         : "border-muted-foreground/30 text-muted-foreground"
                                  )}>
                                     {String.fromCharCode(65 + optIndex)}
                                  </div>
                                  <span className={cn(
                                     "font-medium",
                                     isCorrect ? "text-green-700 dark:text-green-400" : isSelected ? "text-destructive" : ""
                                  )}>{option}</span>
                               </div>

                               {isCorrect ? (
                                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-wider">
                                     <CheckCircle2 size={16} /> Correct Answer
                                  </div>
                               ) : isSelected ? (
                                  <div className="flex items-center gap-1.5 text-destructive font-bold text-xs uppercase tracking-wider">
                                     <XCircle size={16} /> Your Choice
                                  </div>
                               ) : null}
                            </div>
                         );
                      })}
                   </div>
                </CardContent>
                <CardFooter className="pt-4 pb-6 px-6">
                   <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg w-full">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>
                         {selectedOption === question.correctAnswer 
                           ? "Correct! You got 1 point for this question." 
                           : selectedOption !== null 
                             ? "Incorrect. You selected a different option." 
                             : "You didn't answer this question."
                         }
                      </p>
                   </div>
                </CardFooter>
              </Card>
            );
         })}
      </div>

      <div className="flex justify-center pt-4">
         <Button asChild size="lg" className="px-8 rounded-2xl h-14 text-lg font-bold shadow-xl shadow-primary/20">
            <Link href="/students/exams">Finish Review</Link>
         </Button>
      </div>
    </div>
  );
}
