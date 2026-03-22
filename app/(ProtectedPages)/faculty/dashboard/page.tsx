export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Users, Activity, ChevronRight } from "lucide-react";
import { getFacultyDashboardData } from "@/lib/actions/dashboard";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const metadata: Metadata = {
  title: "Faculty Dashboard",
  description: "Manage your institution and exams.",
};

export default async function FacultyDashboardPage() {
  const data = await getFacultyDashboardData();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here is an overview of your institution's performance.
          </p>
        </div>
        <Link href="/faculty/exams/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Exam
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalExams}</div>
            <p className="text-xs text-muted-foreground mt-1">Managed exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique student attempts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Notification Center</CardTitle>
            <Link href="/faculty/notifications">
               <Button variant="ghost" size="icon" className="h-6 w-6">
                 <PlusCircle className="h-4 w-4" />
               </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Link href="/faculty/notifications">
              <Button variant="outline" size="sm" className="w-full text-xs mt-1">Send Broadcast</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Pass Rate</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{data.avgPassRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Students scoring &gt;= 50%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the latest events in your hosted exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {data.recentActivity.length > 0 ? (
                data.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-4 shrink-0 items-center justify-center rounded-full bg-primary" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.studentName} completed "{activity.examTitle}"
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scored {activity.score}% • {formatDistanceToNow(new Date(activity.createdAt))} ago
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-4 text-center">No recent activity detected.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>
              Frequently accessed management tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/faculty/exams">
              <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Manage Question Banks</p>
                    <p className="text-xs text-muted-foreground">Add or edit questions</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
            <Link href="/faculty/results">
              <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Student Directory</p>
                    <p className="text-xs text-muted-foreground">View students result</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
