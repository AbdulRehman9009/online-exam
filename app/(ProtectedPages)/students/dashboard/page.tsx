export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  BookOpen, 
  PlayCircle,
  Calendar,
  AlertCircle
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/actions/dashboard";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "View your exams and grades.",
};

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentStatsClient } from "@/components/students/StudentStatsClient";
import { StudentActivityClient } from "@/components/students/StudentActivityClient";

async function StudentStats() {
  const data = await getStudentDashboardData();
  if (!data) return null;

  return <StudentStatsClient data={data} />;
}

async function StudentActivity() {
  const data = await getStudentDashboardData();
  if (!data) return null;

  return <StudentActivityClient data={data} />;
}

function StudentSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-card/40 rounded-3xl" />)}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, i) => <div key={i} className="h-64 bg-card/40 rounded-3xl" />)}
            </div>
        </div>
    );
}

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Student Dashboard</h1>
        <p className="text-muted-foreground text-lg italic">
          Welcome back! Get ready for your upcoming exams.
        </p>
      </div>
      
      <Suspense fallback={<StudentSkeleton />}>
        <StudentStats />
        <StudentActivity />
      </Suspense>
    </div>
  );
}
