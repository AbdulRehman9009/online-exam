import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, TrendingUp, PlayCircle } from "lucide-react";
import { getStudentDashboardData } from "@/lib/actions/dashboard";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "View your exams and grades.",
};

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function StudentStats() {
  const data = await getStudentDashboardData();
  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
  );
}

async function StudentActivity() {
  const data = await getStudentDashboardData();
  if (!data) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription className="italic">
              Your upcoming scheduled exams.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {data.upcomingExamsCount > 0 ? (
               <div className="flex items-center justify-between p-4 border border-border/50 rounded-2xl bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">New Exam Available</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Check exams page for details
                    </p>
                  </div>
                </div>
                <Link href="/students/exams">
                  <Button size="sm" className="rounded-xl">Go to Exams</Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 text-center italic">No upcoming exams assigned.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription className="italic">
              Scores from your most recently completed exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentResults.length > 0 ? (
                data.recentResults.map((result: any) => (
                  <div key={result.id} className="group transition-all">
                    <div className="flex items-center justify-between p-2 rounded-xl group-hover:bg-accent/30">
                      <div>
                        <p className="text-sm font-bold">{result.exam.title}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          Completed {formatDistanceToNow(new Date(result.createdAt))} ago
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-black text-emerald-500">{Math.round(result.score / result.total * 100)}%</span>
                            <span className="text-[8px] font-bold uppercase text-muted-foreground tracking-tighter">Verified Result</span>
                        </div>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded-full uppercase border border-emerald-500/20">Pass</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-4 text-center italic">No results available yet.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-6 flex justify-center">
             <Link href="/students/grades">
                <Button variant="ghost" size="sm" className="text-xs text-primary font-bold hover:bg-primary/5 rounded-full px-6">
                    View Full Transcript
                </Button>
             </Link>
          </CardFooter>
        </Card>
      </div>
  );
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
