import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import z from "zod";

// Validation schema for creating an exam
const CreateExamSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  startTime: z.string().optional().transform(str => str ? new Date(str) : undefined),
  expiresAt: z.string().optional().transform(str => str ? new Date(str) : undefined),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options are required"),
    correctAnswer: z.number().min(0),
  })).min(1, "At least one question is required")
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Check if the user is authenticated and is a faculty member
    if (!session || !session.user || session.user.role !== "FACULTY") {
      return NextResponse.json(
        { message: "Unauthorized: Only faculty members can create exams." },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = CreateExamSchema.parse(body);

    // Validate that if startTime and expiresAt are provided, expiresAt is after startTime
    if (validatedData.startTime && validatedData.expiresAt) {
      if (validatedData.expiresAt <= validatedData.startTime) {
         return NextResponse.json(
          { message: "Expiry time must be after the start time." },
          { status: 400 }
        );
      }
    }

    // Wrap the creation of the Exam and Questions in a Prisma transaction
    const newExam = await prisma.$transaction(async (tx) => {
      // 1. Create the Exam document
      const exam = await tx.exam.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          duration: validatedData.duration,
          startTime: validatedData.startTime,
          expiresAt: validatedData.expiresAt,
          creatorId: session.user.id,
        },
      });

      // 2. Map and create the Questions linked to this Exam
      const questionsData = validatedData.questions.map((q) => ({
        examId: exam.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }));

      await tx.question.createMany({
        data: questionsData,
      });

      return exam;
    });

    return NextResponse.json(
      { message: "Exam created successfully!", examId: newExam.id },
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("[EXAM_CREATE_ERROR]", error);
    return NextResponse.json(
      { message: "Something went wrong creating the exam." },
      { status: 500 }
    );
  }
}
