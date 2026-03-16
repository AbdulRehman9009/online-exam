import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getNotifications } from "@/lib/actions/dashboard";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const notifications = await getNotifications();

  const role = session.user.role?.toLowerCase() as "faculty" | "student" | "admin";

  return (
    <SidebarProvider>
      <AppSidebar role={role || "student"} user={session.user} />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden bg-background">
          <Topbar user={session.user} initialNotifications={notifications} />
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
