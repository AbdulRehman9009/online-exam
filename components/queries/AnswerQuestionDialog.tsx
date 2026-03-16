"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { answerQuestion } from "@/lib/actions/queries";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AnswerSchema = z.object({
  id: z.string(),
  answer: z.string().min(1, "Answer cannot be empty"),
});

interface AnswerQuestionDialogProps {
  query: any;
}

export function AnswerQuestionDialog({ query }: AnswerQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      id: query.id,
      answer: query.answer || "",
    },
  });

  const onSubmit = (values: z.infer<typeof AnswerSchema>) => {
    startTransition(async () => {
      try {
        const data = await answerQuestion(values);
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.refresh();
        }
      } catch (error) {
        toast.error("Failed to submit answer");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={query.isResolved ? "outline" : "default"}>
          {query.isResolved ? "Edit Answer" : "Answer Now"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Respond to Query</DialogTitle>
            <DialogDescription>
              From: {query.student.user.name || query.student.user.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-muted text-sm italic">
              "{query.question}"
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Your Response</Label>
              <Textarea
                id="answer"
                placeholder="Type your answer here..."
                className="min-h-[120px]"
                disabled={isPending}
                {...form.register("answer")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : (query.isResolved ? "Update Answer" : "Submit Answer")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
