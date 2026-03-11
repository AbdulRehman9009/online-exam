"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/lib/schemas";
import { register as registerUser } from "@/lib/auth-actions";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { AuthFormWrapper } from "./AuthFormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  role: "student" | "admin";
}

export const SignUpForm = ({ role }: SignUpFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", role: role === "student" ? "STUDENT" : "FACULTY" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerUser(values)
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) {
            setSuccess(data.success);
            setTimeout(() => {
              router.push(role === "student" ? "/sign-in" : "/sign-in/admin");
            }, 500);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const onGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const isStudent = role === "student";

  return (
    <AuthFormWrapper
      headerLabel={isStudent ? "Student Sign Up" : "Admin Sign Up"}
      headerDescription={
        isStudent
          ? "Create your student account"
          : "Register your institution account"
      }
      backButtonLabel={
        isStudent
          ? "Already have an account? Sign in"
          : "Already have an account? Sign in"
      }
      backButtonHref={isStudent ? "/sign-in" : "/sign-in/admin"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{isStudent ? "Full Name" : "Institution Name"}</Label>
            <Input
              id="name"
              placeholder={isStudent ? "John Doe" : "ABC University"}
              disabled={isPending}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={isStudent ? "student@example.com" : "admin@institution.com"}
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive">{error}</div>
        )}
        {success && (
          <div className="bg-emerald-500/15 p-3 rounded-md text-sm text-emerald-500">{success}</div>
        )}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Creating account..." : "Register"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button type="button" className="w-full" variant="outline" onClick={onGoogleSignIn} disabled={isPending}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Sign up with Google
        </Button>
      </form>
    </AuthFormWrapper>
  );
};
