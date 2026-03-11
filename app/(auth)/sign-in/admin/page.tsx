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
      {/* Role Toggle */}
      <div className="flex w-full rounded-lg bg-muted p-1 text-sm font-medium">
        <Link
          href="/sign-in"
          className="flex-1 text-center rounded-md py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          Student
        </Link>
        <Link
          href="/sign-in/admin"
          className="flex-1 text-center rounded-md py-2 bg-background shadow text-foreground transition-colors"
        >
          Admin / Faculty
        </Link>
      </div>
      <SignInForm role="admin" />
    </div>
  );
};

export default AdminSignInPage;
