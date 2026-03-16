"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const QuerySchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  facultyId: z.string().optional(),
});

const AnswerSchema = z.object({
  id: z.string(),
  answer: z.string().min(1, "Answer cannot be empty"),
});

export async function askQuestion(values: z.infer<typeof QuerySchema>) {
  const session = await auth();
  if (!session || session.user.role !== "STUDENT") {
    throw new Error("Unauthorized");
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id }
  });

  if (!student) throw new Error("Student profile not found");

  await prisma.studentQuery.create({
    data: {
      studentId: student.id,
      facultyId: values.facultyId,
      question: values.question,
    }
  });

  revalidatePath("/students/dashboard");
  return { success: "Question submitted successfully" };
}

export async function answerQuestion(values: z.infer<typeof AnswerSchema>) {
  const session = await auth();
  if (!session || session.user.role !== "FACULTY") {
    throw new Error("Unauthorized");
  }

  const faculty = await prisma.faculty.findUnique({
    where: { userId: session.user.id }
  });

  if (!faculty) throw new Error("Faculty profile not found");

  await prisma.studentQuery.update({
    where: { id: values.id },
    data: {
      answer: values.answer,
      facultyId: faculty.id,
      isResolved: true,
    }
  });

  revalidatePath("/faculty/queries");
  return { success: "Answer submitted successfully" };
}

export async function getStudentQueries() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id }
  });

  if (!student) return [];

  return await prisma.studentQuery.findMany({
    where: { studentId: student.id },
    include: {
      faculty: {
        include: {
          user: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getFacultyQueries() {
  const session = await auth();
  if (!session || session.user.role !== "FACULTY") {
    throw new Error("Unauthorized");
  }

  const faculty = await prisma.faculty.findUnique({
    where: { userId: session.user.id }
  });

  if (!faculty) throw new Error("Faculty profile not found");

  return await prisma.studentQuery.findMany({
    where: {
      OR: [
        { facultyId: faculty.id },
        { facultyId: null }
      ]
    },
    include: {
      student: {
        include: {
          user: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}
