import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters required"),
  role: z.enum(["STUDENT", "FACULTY", "ADMIN"]),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters required"),
  role: z.enum(["STUDENT", "FACULTY", "ADMIN"]),
  rollNo: z.string().optional(),
  teacherNo: z.string().optional(),
  departmentId: z.string().optional(),
  courseId: z.string().optional(),
  facultyId: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  rollNo: z.string().optional(),
  teacherNo: z.string().optional(),
  departmentId: z.string().optional(),
  courseId: z.string().optional(),
  facultyId: z.string().optional(),
});
