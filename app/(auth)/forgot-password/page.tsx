import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password.",
};

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordForm />
  );
};

export default ForgotPasswordPage;
