import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Trophy, Percent, Calendar } from "lucide-react";
import { format } from "date-fns";

export default async function GradesPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "STUDENT") {
    redirect("/sign-in");
  }

  const results = await prisma.result.findMany({
    where: { studentId: session.user.id },
    include: {
      exam: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const totalExams = results.length;
  const avgScored = totalExams > 0 
    ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total * 100), 0) / totalExams) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Grades</h1>
        <p className="text-muted-foreground italic">Track your academic progress and exam history.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Exams Attempted</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Percent className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScored}%</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Best Performance</CardTitle>
            <Trophy className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExams > 0 ? Math.max(...results.map(r => Math.round(r.score / r.total * 100))) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detailed History</h2>
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-2xl bg-muted/20 border-dashed">
            <Trophy className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">You haven't completed any exams yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {results.map((result) => (
              <Card key={result.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={(result.score / result.total) >= 0.5 ? "default" : "destructive"}>
                        {(result.score / result.total) >= 0.5 ? "Passed" : "Failed"}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(result.createdAt, "PPP")}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{result.exam.title}</CardTitle>
                    <CardDescription className="line-clamp-1 mt-1">
                      {result.exam.description || "Final examination result."}
                    </CardDescription>
                  </div>
                  <div className="bg-muted/30 p-6 flex flex-col items-center justify-center min-w-[140px] border-l border-border/50">
                    <div className="text-2xl font-black text-primary">
                      {result.score} / {result.total}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                      Final Score
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
