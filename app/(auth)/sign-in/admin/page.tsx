import { SignInForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Sign in to your admin / faculty account.",
};

const AdminSignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <SignInForm role="admin" />
    </div>
  );
};

export default AdminSignInPage;
