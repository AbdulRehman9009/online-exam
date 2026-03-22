"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/lib/schemas";
import { login } from "@/lib/auth-actions";
import Link from "next/link";
import {  useRouter } from "next/navigation";

import { AuthFormWrapper } from "./AuthFormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  role: "student" | "faculty" | "admin";
}

export const SignInForm = ({ role }: SignInFormProps) => {
  console.log("SignInForm role prop:", role);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { 
      email: "", 
      password: "", 
      role: role === "admin" ? "ADMIN" : (role === "faculty" ? "FACULTY" : "STUDENT") 
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error){
             setError(data.error);
          } else {
            setSuccess("Login successful");
            const redirectPath = role === "admin" ? "/admin/dashboard" : (role === "student" ? "/students/dashboard" : "/faculty/dashboard");
            router.push(redirectPath);
          }
        })
        .catch((error) => {
          if (error?.message === "NEXT_REDIRECT" || error?.message?.includes("NEXT_REDIRECT")) {
            setSuccess("Login successful");
            const redirectPath = role === "admin" ? "/admin/dashboard" : (role === "student" ? "/students/dashboard" : "/faculty/dashboard");
            router.push(redirectPath);
            return;
          }
          setError(error.message || "Something went wrong");
        });
    });
  };


  const isStudent = role === "student";
  const isAdmin = role === "admin";
  const isFaculty = role === "faculty";

  return (
    <AuthFormWrapper
      headerLabel={
        isAdmin ? "Admin Sign In" : (isFaculty ? "Faculty Sign In" : "Student Sign In")
      }
      headerDescription={
        isAdmin
          ? "Login to manage your institution"
          : (isFaculty ? "Login to manage your exams" : "Login to access your exams")
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={
                isAdmin ? "admin@institution.com" : (isFaculty ? "faculty@institution.com" : "student@example.com")
              }
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                disabled={isPending}
                className="pr-10"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
            <Button size="sm" variant="link" asChild className="px-0 font-normal text-xs">
              <Link href="/forgot-password">Forgot password?</Link>
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive">{error}</div>
        )}
        {success && (
            <div className="bg-green-500/15 p-3 rounded-md text-sm text-green-500">{success}</div>
        )}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

      </form>
    </AuthFormWrapper>
  );
};
