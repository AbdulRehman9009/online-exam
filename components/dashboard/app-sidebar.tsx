"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { User } from "next-auth";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: "faculty" | "student";
  user: User;
}

const facultyNav = [
  { title: "Dashboard", url: "/faculty/dashboard", icon: LayoutDashboard },
  { title: "Manage Exams", url: "/faculty/exams", icon: FileText },
  { title: "Results", url: "/faculty/results", icon: Users },
  { title: "Settings", url: "/faculty/settings", icon: Settings },
];

const studentNav = [
  { title: "Dashboard", url: "/students/dashboard", icon: LayoutDashboard },
  { title: "My Exams", url: "/students/exams", icon: BookOpen },
  { title: "My Grades", url: "/students/grades", icon: FileText },
  { title: "Settings", url: "/students/settings", icon: Settings },
];

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = role === "faculty" ? facultyNav : studentNav;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap size={18} />
          </div>
          <span>SmartExam</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t border-border flex flex-col gap-1 items-center justify-center">
          <div className="text-sm font-semibold truncate max-w-full">
            {user?.name || "User"}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-full">
            {user?.email}
          </div>
        </div>
        <div className="pb-4 text-[10px] text-muted-foreground text-center">
          v1.0.0
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
