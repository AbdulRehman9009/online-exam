"use client";

import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { AuthFormWrapper } from "./AuthFormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/lib/auth-actions";
import { Suspense } from "react";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Minimum 6 characters required"),
    confirmPassword: z.string().min(6, "Minimum 6 characters required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPasswordFormInner = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing reset token. Please check your email link.");
      return;
    }

    startTransition(() => {
      updatePassword(values.password, token)
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <AuthFormWrapper
      headerLabel="Enter new password"
      backButtonLabel="Back to sign in"
      backButtonHref="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••"
              disabled={isPending}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
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
          {isPending ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export const ResetPasswordForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormInner />
    </Suspense>
  );
};
