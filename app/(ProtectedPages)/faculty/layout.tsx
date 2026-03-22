import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "FACULTY") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
