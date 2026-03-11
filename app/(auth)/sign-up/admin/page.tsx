import { SignUpForm } from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Sign Up",
  description: "Create an admin / faculty account.",
};

const AdminSignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      {/* Role Toggle */}
      <div className="flex w-full rounded-lg bg-muted p-1 text-sm font-medium">
        <Link
          href="/sign-up"
          className="flex-1 text-center rounded-md py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          Student
        </Link>
        <Link
          href="/sign-up/admin"
          className="flex-1 text-center rounded-md py-2 bg-background shadow text-foreground transition-colors"
        >
          Admin / Faculty
        </Link>
      </div>
      <SignUpForm role="admin" />
    </div>
  );
};

export default AdminSignUpPage;
