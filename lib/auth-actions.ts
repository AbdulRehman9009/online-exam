"use server";

import * as z from "zod";
import { signIn, auth } from "@/lib/auth";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, role } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "This email is not registered!" };
  }

  if (!existingUser.password) {
    return { error: "This account uses Google Sign-In. Please use the appropriate option." };
  }

  if (String(existingUser.role).toUpperCase() !== String(role).toUpperCase()) {
    return { error: "Incorrect portal for your account role. Please use the correct sign-in page." };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  
  if (!passwordsMatch) {
    return { error: "Incorrect password!" };
  }

  const redirectTo = role === "ADMIN" ? "/admin/dashboard" : (role === "FACULTY" ? "/faculty/dashboard" : "/students/dashboard");

  try {
    await signIn("credentials", {
      email,
      password,
      role, 
      redirectTo,
    });
    return { success: "Success!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, role } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return { success: "Account created! Please sign in." };
};

export const resetPassword = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.password) {
    return { error: "Email not found!" };
  }

  if (existingUser.role !== "ADMIN") {
    return { error: "Password resets for students and faculty must be requested through the Admin Panel. Please contact an administrator." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};

export const updatePassword = async (password: string, token: string) => {
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};

export const updateUserSettings = async (values: any) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const { name, currentPassword, newPassword } = values;

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!dbUser) {
    return { error: "User not found" };
  }
  const passwordsMatch = await bcrypt.compare(currentPassword, dbUser.password!);

  if (!passwordsMatch) {
    return { error: "Incorrect current password" };
  }

  const updateData: any = { name };

  if (newPassword && newPassword.length >= 6) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: updateData,
  });

  return { success: "Settings updated successfully!" };
};
