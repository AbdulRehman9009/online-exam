"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

import { Users, FileText, School, GraduationCap } from "lucide-react";

interface StatCardsClientProps {
  stats: {
    studentCount: number | string;
    facultyCount: number | string;
    examCount: number | string;
    departmentCount: number | string;
  };
}

export function StatCardsClient({ stats }: StatCardsClientProps) {
  const statCards = [
    {
      title: "Total Students",
      value: stats.studentCount,
      icon: GraduationCap,
      description: "Registered learners",
      trend: "+12% this month",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Active Faculty",
      value: stats.facultyCount,
      icon: Users,
      description: "Teaching staff",
      trend: "Stable",
      color: "bg-indigo-500/10 text-indigo-600",
    },
    {
      title: "Published Exams",
      value: stats.examCount,
      icon: FileText,
      description: "Live or upcoming",
      trend: "+5 new",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Institutional Units",
      value: stats.departmentCount,
      icon: School,
      description: "Departments",
      trend: "No change",
      color: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div key={stat.title}>
          <Card className="border-none shadow-md shadow-black/5 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{stat.trend}</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight mb-0.5">{stat.value}</div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</CardTitle>
              <p className="text-[11px] text-muted-foreground italic">{stat.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
