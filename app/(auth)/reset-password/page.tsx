import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter a new password.",
};

const ResetPasswordPage = () => {
  return (
    <ResetPasswordForm />
  );
};

export default ResetPasswordPage;
