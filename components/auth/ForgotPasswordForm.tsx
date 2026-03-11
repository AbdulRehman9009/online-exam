"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { AuthFormWrapper } from "./AuthFormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/auth-actions";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(values.email)
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <AuthFormWrapper
      headerLabel="Forgot your password?"
      headerDescription="Enter your email to receive a reset link"
      backButtonLabel="Back to sign in"
      backButtonHref="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@example.com"
            disabled={isPending}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive">{error}</div>
        )}
        {success && (
          <div className="bg-emerald-500/15 p-3 rounded-md text-sm text-emerald-500">{success}</div>
        )}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};
