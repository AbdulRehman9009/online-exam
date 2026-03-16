import { SignInForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Sign In",
  description: "Sign in to your student account.",
};

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <SignInForm role="student" />
    </div>
  );
};

export default SignInPage;
