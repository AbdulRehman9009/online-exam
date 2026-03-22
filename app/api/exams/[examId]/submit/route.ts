import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import z from "zod";

export const dynamic = "force-dynamic";

const SubmitExamSchema = z.object({
  answers: z.record(z.string(), z.number()) 
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const session = await auth();
    const { examId } = await params;

    if (!session || !session.user || session.user.role !== "STUDENT") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if the student has already submitted results for this exam
    const existingResult = await prisma.result.findFirst({
      where: {
        examId: examId,
        studentId: session.user.id,
      },
    });

    if (existingResult) {
      return NextResponse.json(
        { message: "You have already submitted this exam." },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found." },
        { status: 404 }
      );
    }

    // Verify timing bounds again
    const now = new Date();
    if (exam.expiresAt && now > exam.expiresAt) {
        return NextResponse.json(
            { message: "The exam has already closed." },
            { status: 400 }
        );
    }

    const body = await req.json();
    const validatedData = SubmitExamSchema.parse(body);
    const { answers } = validatedData;

    let score = 0;
    const total = exam.questions.length;

    // Calculate score
    exam.questions.forEach((question) => {
      const selectedOption = answers[question.id];
      if (selectedOption === question.correctAnswer) {
        score++;
      }
    });

    // Create the result record
    const result = await prisma.result.create({
      data: {
        examId: examId,
        studentId: session.user.id,
        score: score,
        total: total,
        answers: answers, // Save the student's choices
      },
    });

    return NextResponse.json(
      { message: "Exam submitted successfully!", score, total, resultId: result.id },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("[EXAM_SUBMIT_ERROR]", error);
    return NextResponse.json(
      { message: "Something went wrong submitting the exam." },
      { status: 500 }
    );
  }
}
