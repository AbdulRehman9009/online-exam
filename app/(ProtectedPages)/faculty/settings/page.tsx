import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings/SettingsForm";

export default async function FacultySettingsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "FACULTY") {
    redirect("/sign-in/faculty");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Faculty Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile and teacher credentials.
        </p>
      </div>

      <div className="mt-8">
        <SettingsForm user={session.user} />
      </div>
    </div>
  );
}
