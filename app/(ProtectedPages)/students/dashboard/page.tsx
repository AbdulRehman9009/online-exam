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

export default async function StudentDashboardPage() {
  const data = await getStudentDashboardData();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Get ready for your upcoming exams.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <Clock className="h-4 w-4 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.upcomingExamsCount}</div>
            <p className="text-xs opacity-80 mt-1">Check your schedule</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.completedExamsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {data.completedExamsCount} exams</p>
          </CardContent>
        </Card>
        <Card>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>
              Your upcoming scheduled exams.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {data.upcomingExamsCount > 0 ? (
               <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
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
                  <Button size="sm">Go to Exams</Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-4 text-center">No upcoming exams assigned.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>
              Scores from your most recently completed exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentResults.length > 0 ? (
                data.recentResults.map((result: any) => (
                  <div key={result.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{result.exam.title}</p>
                        <p className="text-xs text-muted-foreground">Completed {formatDistanceToNow(new Date(result.createdAt))} ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-emerald-500">{Math.round(result.score / result.total * 100)}%</span>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase">Pass</span>
                      </div>
                    </div>
                    {/* Add divider if not last */}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-4 text-center">No results available yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
