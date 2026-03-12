"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, ChevronRight, ChevronLeft, Send, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface Exam {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export function ExamInterface({ exam, user }: { exam: any; user: any }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isFinished) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/exams/${exam.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setResult({ score: data.score, total: data.total });
      setIsFinished(true);
      toast.success("Exam submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, exam.id, isFinished, isSubmitting]);

  useEffect(() => {
    if (timeLeft <= 0 && !isFinished) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, handleSubmit]);

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [exam.questions[currentQuestionIndex].id]: optionIndex,
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isFinished) {
    return (
      <Card className="max-w-md mx-auto mt-10 shadow-xl border-primary/20 bg-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Exam Complete!</CardTitle>
          <CardDescription className="text-lg">Thank you for participating.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="py-8 px-4 bg-background rounded-2xl border shadow-inner">
             <p className="text-muted-foreground font-medium mb-1">Your Score</p>
             <h2 className="text-5xl font-black text-primary">
                {result?.score} <span className="text-2xl text-muted-foreground">/ {result?.total}</span>
             </h2>
             <Progress value={(result?.score || 0) / (result?.total || 1) * 100} className="h-3 mt-6" />
          </div>
          
          <div className="flex flex-col gap-3">
             <Button size="lg" className="w-full text-lg font-bold" onClick={() => router.push(`/students/exams/${exam.id}/review`)}>
               Review My Answers
             </Button>
             <Button variant="outline" size="lg" className="w-full" onClick={() => router.push("/students/exams")}>
                Return to Dashboard
             </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header with Timer & Progress */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm p-4 rounded-xl border shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 pr-6">
           <div className="flex-1">
             <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
               <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
               <span>{Math.round(progress)}% Complete</span>
             </div>
             <Progress value={progress} className="h-2" />
           </div>
        </div>
        
        <div className={cn(
          "flex items-center gap-3 px-5 py-2.5 rounded-full border-2 font-black tabular-nums transition-colors shadow-sm",
          timeLeft < 60 
            ? "border-destructive text-destructive bg-destructive/5 animate-pulse" 
            : "border-primary/20 text-primary bg-primary/5"
        )}>
          <Clock className="w-5 h-5" />
          <span className="text-xl">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Area */}
      <Card className="shadow-lg border-primary/10 overflow-hidden min-h-[400px] flex flex-col">
        <CardHeader className="bg-primary/5 border-b">
           <CardTitle className="text-xl md:text-2xl leading-relaxed">
             {currentQuestion.text}
           </CardTitle>
        </CardHeader>
        <CardContent className="py-8 flex-1">
          <div className="grid gap-4">
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={cn(
                  "p-5 text-left rounded-2xl border-2 transition-all flex items-center gap-4 group",
                  answers[currentQuestion.id] === index
                    ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-muted"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                  answers[currentQuestion.id] === index
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/60"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t p-6 flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="gap-2 h-12 px-6 font-bold"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </Button>

          {currentQuestionIndex === totalQuestions - 1 ? (
             <Button
                variant="default"
                size="lg"
                onClick={() => {
                   if (Object.keys(answers).length < totalQuestions) {
                      if (confirm("You haven't answered all questions. Submit anyway?")) {
                          handleSubmit();
                      }
                   } else {
                      handleSubmit();
                   }
                }}
                disabled={isSubmitting}
                className="gap-2 h-12 px-8 font-black shadow-lg shadow-primary/30"
             >
               {isSubmitting ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                 </>
               ) : (
                 <>
                   Submit Exam <Send className="w-5 h-5" />
                 </>
               )}
             </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="gap-2 h-12 px-8 font-bold shadow-md shadow-primary/20"
            >
              Next Question <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Help/Alert Banner */}
      {Object.keys(answers).length < totalQuestions && (
         <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/40 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Progress: {Object.keys(answers).length} of {totalQuestions} questions answered.</span>
         </div>
      )}
    </div>
  );
}
