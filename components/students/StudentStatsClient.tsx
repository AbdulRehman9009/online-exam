"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";

interface StudentStatsClientProps {
  data: {
    upcomingExamsCount: number;
    completedExamsCount: number;
    avgScore: number;
    notifications: any[];
  };
}

export function StudentStatsClient({ data }: StudentStatsClientProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
            <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                <Clock className="h-4 w-4 opacity-80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.upcomingExamsCount}</div>
                <p className="text-xs opacity-80 mt-1 italic">Check your schedule</p>
              </CardContent>
            </Card>
        </div>
        <div>
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.completedExamsCount}</div>
                <p className="text-xs text-muted-foreground mt-1 italic">Keep it up!</p>
              </CardContent>
            </Card>
        </div>
        <div>
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.avgScore}%</div>
                <p className="text-xs text-muted-foreground mt-1 italic">Based on {data.completedExamsCount} exams</p>
              </CardContent>
            </Card>
        </div>
        <div>
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.notifications.length}</div>
                <Link href="/students/notifications">
                  <p className="text-xs text-primary font-medium hover:underline mt-1 cursor-pointer">View notification center</p>
                </Link>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
