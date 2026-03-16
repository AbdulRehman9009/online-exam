import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AskQuestionForm } from "@/components/queries/AskQuestionForm";
import { getStudentQueries } from "@/lib/actions/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default async function AskQuestionPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    redirect("/sign-in/student");
  }

  const studentProfile = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { facultyId: true }
  });

  const queries = await getStudentQueries();

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Ask a Question
        </h1>
        <p className="text-muted-foreground">
          Submit your queries directly to your assigned faculty member.
        </p>
      </div>

      <Card className="border-primary/10 shadow-lg">
        <CardHeader>
          <CardTitle>Submit New Query</CardTitle>
          <CardDescription>Your question will be sent to your linked faculty head.</CardDescription>
        </CardHeader>
        <CardContent>
          <AskQuestionForm facultyId={studentProfile?.facultyId || undefined} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Recent Queries</h2>
        <div className="grid gap-4">
          {queries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8 border rounded-xl border-dashed">
              No questions asked yet.
            </p>
          ) : (
            queries.map((query) => (
              <Card key={query.id} className="border-primary/5">
                <CardHeader className="py-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Question</p>
                      <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(query.createdAt))} ago</p>
                    </div>
                    <Badge variant={query.isResolved ? "default" : "secondary"}>
                      {query.isResolved ? "Resolved" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm">{query.question}</p>
                  {query.answer && (
                    <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs font-bold text-primary mb-1">Faculty Answer:</p>
                      <p className="text-sm italic">{query.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
