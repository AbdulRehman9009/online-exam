import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ExamInterface } from "@/components/exams/exam-interface";

export default async function ExamStartPage({ 
  params 
}: { 
  params: Promise<{ examId: string }> 
}) {
  const session = await auth();
  const { examId } = await params;

  if (!session || !session.user || session.user.role !== "STUDENT") {
    redirect("/sign-in");
  }

  // Check if student already has results for this exam
  const existingResult = await prisma.result.findFirst({
    where: {
      examId: examId,
      studentId: session.user.id,
    },
  });

  if (existingResult) {
    redirect(`/students/exams/${examId}/review`);
  }

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      questions: {
          select: {
              id: true,
              text: true,
              options: true,
              // We do NOT select correctAnswer to prevent cheating via inspecting client-side logs
          }
      },
    },
  });

  if (!exam) {
    notFound();
  }

  // Re-verify timing bounds
  const now = new Date();
  if (exam.startTime && now < exam.startTime) {
    redirect(`/students/exams/${examId}`);
  }
  if (exam.expiresAt && now > exam.expiresAt) {
    redirect(`/students/exams/${examId}`);
  }

  return (
    <div className="container max-w-5xl py-6 mx-auto">
      <ExamInterface exam={exam} user={session.user} />
    </div>
  );
}
