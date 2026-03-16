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
  MessageCircle,
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
  role: "faculty" | "student" | "admin";
  user: User;
}

const facultyNav = [
  { title: "Dashboard", url: "/faculty/dashboard", icon: LayoutDashboard },
  { title: "Manage Exams", url: "/faculty/exams", icon: FileText },
  { title: "Student Queries", url: "/faculty/queries", icon: MessageCircle },
  { title: "Results", url: "/faculty/results", icon: Users },
  { title: "Settings", url: "/faculty/settings", icon: Settings },
];

const studentNav = [
  { title: "Dashboard", url: "/students/dashboard", icon: LayoutDashboard },
  { title: "My Exams", url: "/students/exams", icon: BookOpen },
  { title: "My Grades", url: "/students/grades", icon: FileText },
  { title: "Ask Question", url: "/students/ask", icon: MessageCircle },
  { title: "Settings", url: "/students/settings", icon: Settings },
];

const adminNav = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manage Faculty", url: "/admin/faculty", icon: Users },
  { title: "Manage Students", url: "/admin/students", icon: Users },
  { title: "Reports", url: "/admin/reports", icon: BookOpen },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

import { motion, AnimatePresence } from "motion/react";

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = role === "admin" ? adminNav : (role === "faculty" ? facultyNav : studentNav);

  return (
    <Sidebar className="border-r border-sidebar-border/50 bg-background/50 backdrop-blur-xl" {...props}>
      <SidebarHeader className="h-20 flex items-center px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground transform"
          >
            <GraduationCap size={22} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-none text-foreground">SmartExam</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mt-0.5">Management</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Main Menu
        </div>
        <SidebarMenu className="gap-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`relative flex items-center gap-3 px-3 py-6 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-primary/10 hover:text-primary text-muted-foreground"
                    }`}
                  >
                    <Link href={item.url} className="relative z-10 w-full flex items-center gap-3">
                      <item.icon size={20} className={isActive ? "text-primary-foreground" : ""} />
                      <span className={`font-bold ${isActive ? "text-primary-foreground" : ""}`}>{item.title}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute inset-0 bg-primary rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-accent/30 border border-border/50 transition-all hover:bg-accent/50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold truncate text-foreground">
              {user?.name || "User"}
            </span>
            <span className="text-[11px] text-muted-foreground truncate italic">
              {role.charAt(0).toUpperCase() + role.slice(1)} Portal
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between px-2 text-[10px] font-medium text-muted-foreground/60">
          <span>Version 1.2.0</span>
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" title="System Online" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
