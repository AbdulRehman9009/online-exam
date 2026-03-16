import { SignInForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty Sign In",
  description: "Sign in to your faculty account.",
};

const FacultySignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <SignInForm role="faculty" />
    </div>
  );
};

export default FacultySignInPage;
