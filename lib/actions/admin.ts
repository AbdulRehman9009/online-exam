"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Role } from "../generated/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema, UpdateUserSchema } from "@/lib/schemas";

export async function getAdminStats() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const [studentCount, facultyCount, examCount, departmentCount] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "FACULTY" } }),
      prisma.exam.count(),
      prisma.department.count(),
    ]);

    return {
      studentCount,
      facultyCount,
      examCount,
      departmentCount,
    };
  } catch (error) {
    console.error("GET_ADMIN_STATS_ERROR", error);
    return {
      studentCount: 0,
      facultyCount: 0,
      examCount: 0,
      departmentCount: 0,
      error: "Failed to fetch stats"
    };
  }
}

export async function getEngagementStats() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [examResults, studentQueries] = await Promise.all([
      prisma.result.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true }
      }),
      prisma.studentQuery.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true }
      })
    ]);

    // Initialize grouping map
    const engagementMap = new Map();
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayStr = date.toISOString().split('T')[0];
      const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
      engagementMap.set(dayStr, { day: weekday, exams: 0, queries: 0 });
      return dayStr;
    });

    // Count exams
    examResults.forEach(r => {
      const dayStr = r.createdAt.toISOString().split('T')[0];
      if (engagementMap.has(dayStr)) {
        engagementMap.get(dayStr).exams++;
      }
    });

    // Count queries
    studentQueries.forEach(q => {
      const dayStr = q.createdAt.toISOString().split('T')[0];
      if (engagementMap.has(dayStr)) {
        engagementMap.get(dayStr).queries++;
      }
    });

    return Array.from(engagementMap.values());
  } catch (error) {
    console.error("GET_ENGAGEMENT_STATS_ERROR", error);
    return [];
  }
}

export async function getFacultyList() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.user.findMany({
    where: { role: "FACULTY" },
    include: {
      faculty: {
        include: {
          department: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStudentList() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: {
      student: {
        include: {
          course: {
            include: {
              department: true
            }
          }
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(values: z.infer<typeof RegisterSchema>) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized access" };
    }

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid form data provided" };
    }

    const { email, password, name, role, rollNo, teacherNo, departmentId, courseId, facultyId } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already registered in the system" };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        // Initialize specific profiles
        ...(role === "FACULTY" && { 
          faculty: { 
            create: { 
              teacherNo,
              departmentId
            } 
          } 
        }),
        ...(role === "STUDENT" && { 
          student: { 
            create: { 
              rollNo,
              courseId,
              facultyId
            } 
          } 
        }),
        ...(role === "ADMIN" && { admin: { create: {} } }),
      },
    });

    return { success: "Account created successfully" };
  } catch (error: any) {
    console.error("CREATE_USER_ERROR", error);
    if (error.code === 'P2002') {
      return { error: "A user with this unique ID (Roll No / Teacher ID) already exists" };
    }
    return { error: "Something went wrong while creating the user" };
  }
}

export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized access" };
    }

    const validatedFields = UpdateUserSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid form data provided" };
    }

    const { id, email, password, name, rollNo, teacherNo, departmentId, courseId, facultyId } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: { student: true, faculty: true }
    });

    if (!existingUser) {
      return { error: "User account not found" };
    }

    const updateData: any = {
      name,
      email,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        ...(existingUser.role === "STUDENT" && {
          student: {
            upsert: {
              create: { rollNo, courseId, facultyId },
              update: { rollNo, courseId, facultyId }
            }
          }
        }),
        ...(existingUser.role === "FACULTY" && {
          faculty: {
            upsert: {
              create: { teacherNo, departmentId },
              update: { teacherNo, departmentId }
            }
          }
        })
      }
    });

    return { success: "User updated successfully" };
  } catch (error: any) {
    console.error("UPDATE_USER_ERROR", error);
    if (error.code === 'P2002') {
      return { error: "This Roll No or Teacher ID is already assigned to another user" };
    }
    return { error: "Failed to update user profile" };
  }
}

export async function deleteUser(id: string) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized access" };
    }

    await prisma.user.delete({
      where: { id },
    });

    return { success: "Account removed successfully" };
  } catch (error) {
    console.error("DELETE_USER_ERROR", error);
    return { error: "Failed to delete the user account" };
  }
}

export async function getDepartments() {
  return await prisma.department.findMany({
    orderBy: { name: "asc" }
  });
}

export async function getCourses() {
  return await prisma.course.findMany({
    orderBy: { name: "asc" }
  });
}

export async function getFaculties() {
  return await prisma.user.findMany({
    where: { role: "FACULTY" },
    select: {
      id: true,
      name: true,
      faculty: {
        select: {
          id: true,
          teacherNo: true
        }
      }
    },
    orderBy: { name: "asc" }
  });
}
