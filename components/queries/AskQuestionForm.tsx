"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { askQuestion } from "@/lib/actions/queries";
import { useRouter } from "next/navigation";

const QuerySchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  facultyId: z.string().optional(),
});

interface AskQuestionFormProps {
  facultyId?: string;
}

export function AskQuestionForm({ facultyId }: AskQuestionFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof QuerySchema>>({
    resolver: zodResolver(QuerySchema),
    defaultValues: {
      question: "",
      facultyId: facultyId || "",
    },
  });

  const onSubmit = (values: z.infer<typeof QuerySchema>) => {
    startTransition(async () => {
      try {
        const data = await askQuestion(values);
        if (data.success) {
          toast.success(data.success);
          form.reset();
          router.refresh();
        }
      } catch (error) {
        toast.error("Failed to submit question");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question">Your Question</Label>
        <Textarea
          id="question"
          placeholder="Ask anything about your courses or exams..."
          className="min-h-[150px] resize-none border-primary/20 bg-background/50 backdrop-blur-sm"
          disabled={isPending}
          {...form.register("question")}
        />
        {form.formState.errors.question && (
          <p className="text-xs text-destructive">{form.formState.errors.question.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Question"}
      </Button>
    </form>
  );
}
