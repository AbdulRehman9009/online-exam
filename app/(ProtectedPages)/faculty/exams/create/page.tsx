"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, CheckCircle, ArrowLeft, Loader2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const CreateExamSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  startTime: z.string().optional(),
  expiresAt: z.string().optional(),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options are required"),
    correctAnswer: z.coerce.number().min(0, "Select a correct answer"),
  })).min(1, "At least one question is required")
}).superRefine((data, ctx) => {
  if (data.startTime && data.expiresAt) {
    if (new Date(data.expiresAt) <= new Date(data.startTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expiry time must be after the start time",
        path: ["expiresAt"]
      });
    }
  }
});

type ExamFormValues = z.infer<typeof CreateExamSchema>;

export default function CreateExamPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ExamFormValues>({
    resolver: zodResolver(CreateExamSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      startTime: "",
      expiresAt: "",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctAnswer: 0
        }
      ]
    }
  });

  const { fields: questions, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = async (data: ExamFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        startTime: data.startTime || undefined,
        expiresAt: data.expiresAt || undefined
      };

      const response = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create exam");
      }

      toast.success("Exam created successfully!");
      router.push("/faculty/exams");
      router.refresh();

    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/faculty/exams">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Examination</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Design your exam, add MCQs, and configure constraints.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
            <CardDescription>Provide general details and scheduling info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">Exam Title <span className="text-destructive">*</span></Label>
              <Input id="title" placeholder="e.g., Midterm Computer Science 101" className="focus-visible:ring-primary" {...register("title")} />
              {errors.title && <p className="text-xs font-medium text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Instructions or overview of the exam..."
                className="resize-none h-24 focus-visible:ring-primary bg-background"
                {...register("description")}
              />
              {errors.description && <p className="text-xs font-medium text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold">Duration (Minutes) <span className="text-destructive">*</span></Label>
                <Input id="duration" type="number" min="1" className="focus-visible:ring-primary" {...register("duration")} />
                {errors.duration && <p className="text-xs font-medium text-destructive">{errors.duration.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80">
                  <CalendarIcon className="h-4 w-4 text-primary" /> Start Time (Optional)
                </Label>
                <Input id="startTime" type="datetime-local" className="focus-visible:ring-primary" {...register("startTime")} />
                {errors.startTime && <p className="text-xs font-medium text-destructive">{errors.startTime.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiresAt" className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80">
                  <CalendarIcon className="h-4 w-4 text-destructive/70" /> Expiry Time (Optional)
                </Label>
                <Input id="expiresAt" type="datetime-local" className="focus-visible:ring-primary" {...register("expiresAt")} />
                {errors.expiresAt && <p className="text-xs font-medium text-destructive">{errors.expiresAt.message}</p>}
              </div>
            </div>

            <div className="text-[11px] font-medium text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/40 text-center">
              Leaving the Start and Expiry empty means the exam is actively available forever once published.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold tracking-tight">Questions Builder</h2>
            <Button type="button" variant="secondary" size="sm" onClick={() => appendQuestion({ text: "", options: ["", "", "", ""], correctAnswer: 0 })} className="gap-2 font-semibold">
              <PlusCircle className="h-4 w-4" />
              Add Question
            </Button>
          </div>

          {errors.questions?.root && (
            <p className="text-sm font-bold text-destructive text-center p-2 bg-destructive/10 rounded-md">{errors.questions.root.message}</p>
          )}

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <Card key={q.id} className="border-primary/20 bg-primary/2 shadow-sm relative overflow-hidden transition-all duration-300 hover:border-primary/40">
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground font-bold px-4 py-1.5 text-xs rounded-br-xl z-10 shadow-sm">
                  Question {qIndex + 1}
                </div>

                <CardContent className="pt-12 pb-6">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1 space-y-2">
                      <Label className="sr-only">Question {qIndex + 1} Text</Label>
                      <Textarea
                        placeholder="Type your question here..."
                        className="resize-none font-semibold text-base h-24 bg-background border-primary/10 focus-visible:ring-primary"
                        {...register(`questions.${qIndex}.text` as const)}
                      />
                      {errors.questions?.[qIndex]?.text && (
                        <p className="text-xs font-medium text-destructive">{errors.questions[qIndex]?.text?.message}</p>
                      )}
                    </div>
                    {questions.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(qIndex)} className="shrink-0 h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold flex items-center gap-2 text-foreground/80 px-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Define Options & Mark Correct Answer
                    </Label>

                    <Controller
                      control={control}
                      name={`questions.${qIndex}.correctAnswer`}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[0, 1, 2, 3].map((optIndex) => (
                            <div key={optIndex} className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-200 ${field.value === optIndex ? "border-green-500/50 bg-green-500/3 ring-1 ring-green-500/20" : "border-border/60 bg-background"}`}>
                              <input
                                type="radio"
                                checked={field.value === optIndex}
                                onChange={() => field.onChange(optIndex)}
                                className="w-4 h-4 accent-green-600 cursor-pointer"
                              />
                              <div className="flex-1">
                                <Input
                                  placeholder={`Option ${optIndex + 1}`}
                                  className={`h-10 border-none shadow-none focus-visible:ring-0 bg-transparent font-medium ${errors.questions?.[qIndex]?.options?.[optIndex] ? "placeholder:text-destructive/60" : ""}`}
                                  {...register(`questions.${qIndex}.options.${optIndex}` as const)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    
                    {errors.questions?.[qIndex]?.correctAnswer && (
                      <p className="text-xs font-semibold text-destructive mt-1 px-1">{errors.questions[qIndex]?.correctAnswer?.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end pt-6 mb-12">
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto px-12 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Publishing Exam...
              </>
            ) : (
              "Publish Examination"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}