import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, TrendingUp, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "View your exams and grades.",
};

export default function StudentDashboardPage() {
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs opacity-80 mt-1">Next exam in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">All passed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-1">Top 10% of class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124h</div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Next Up</CardTitle>
            <CardDescription>
              Your upcoming scheduled exams.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Dummy Upcoming Exam */}
            <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Advanced Networking Final</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> Due in 3 days • 2 Hrs Duration
                  </p>
                </div>
              </div>
              <Button size="sm">Start Exam</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary text-secondary-foreground rounded-xl">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Software Engineering Midterm</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> Due in 7 days • 1.5 Hrs Duration
                  </p>
                </div>
              </div>
              <Button size="sm" variant="secondary">Review Material</Button>
            </div>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Data Structures Quiz 3</p>
                  <p className="text-xs text-muted-foreground">Completed 2 days ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-500">92%</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase">Pass</span>
                </div>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Database Management</p>
                  <p className="text-xs text-muted-foreground">Completed 1 week ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-500">88%</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase">Pass</span>
                </div>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Calculus I Final</p>
                  <p className="text-xs text-muted-foreground">Completed 2 weeks ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-destructive">65%</span>
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-full uppercase">Review</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
