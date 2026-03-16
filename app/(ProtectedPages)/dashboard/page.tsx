import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const role = session.user.role?.toUpperCase();

  if (role === "ADMIN") {
    redirect("/admin/dashboard");
  } else if (role === "FACULTY") {
    redirect("/faculty/dashboard");
  } else {
    redirect("/students/dashboard");
  }
}
