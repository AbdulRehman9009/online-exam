import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getFacultyQueries } from "@/lib/actions/queries";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { AnswerQuestionDialog } from "@/components/queries/AnswerQuestionDialog";

export default async function FacultyQuestionsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "FACULTY") {
    redirect("/sign-in/faculty");
  }

  const queries = await getFacultyQueries();

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Student Questions
        </h1>
        <p className="text-muted-foreground">
          Manage and respond to queries from your linked students.
        </p>
      </div>

      <div className="grid gap-6">
        {queries.length === 0 ? (
          <div className="text-center py-20 border rounded-2xl border-dashed bg-card/50">
            <h3 className="text-lg font-semibold">No Pending Questions</h3>
            <p className="text-muted-foreground">You don't have any queries from students at the moment.</p>
          </div>
        ) : (
          queries.map((query) => (
            <Card key={query.id} className={`border-primary/5 ${!query.isResolved ? 'border-l-4 border-l-primary shadow-md' : 'opacity-80'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      {query.student.user.name || "Anonymous Student"}
                    </CardTitle>
                    <CardDescription>
                      Roll No: {query.student.rollNo || "N/A"} • {formatDistanceToNow(new Date(query.createdAt))} ago
                    </CardDescription>
                  </div>
                  <Badge variant={query.isResolved ? "secondary" : "default"} className={query.isResolved ? "" : "animate-pulse"}>
                    {query.isResolved ? "Resolved" : "New Question"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-muted text-sm">
                  {query.question}
                </div>
                
                {query.isResolved && query.answer && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm">
                    <span className="text-[10px] font-bold text-primary block mb-1 uppercase tracking-wider">Your Answer</span>
                    {query.answer}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <AnswerQuestionDialog query={query} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
