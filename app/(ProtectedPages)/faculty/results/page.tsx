import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getFacultyResults } from "@/lib/actions/results"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Search } from "lucide-react"

export default async function FacultyResultsPage() {
  const session = await auth()

  if (!session || !session.user || session.user.role !== "FACULTY") {
    redirect("/sign-in")
  }

  const results = await getFacultyResults()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
        <p className="text-muted-foreground mt-1">
          Review the performance of students across all your created exams.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card border-dashed">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Results Found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            It looks like no students have completed any of your exams yet. Check back here once an exam is finished.
          </p>
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Exam Title</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => {
                const percentage = Math.round((result.score / result.total) * 100)
                let scoreColorClass = "text-muted-foreground"
                if (percentage >= 80) scoreColorClass = "text-emerald-500 font-semibold"
                else if (percentage >= 50) scoreColorClass = "text-amber-500 font-semibold"
                else scoreColorClass = "text-red-500 font-semibold"

                return (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.student.name || "Unknown"}</TableCell>
                    <TableCell className="text-muted-foreground">{result.student.email}</TableCell>
                    <TableCell>{result.exam.title}</TableCell>
                    <TableCell className="text-right">
                      <span className={scoreColorClass}>
                        {result.score} / {result.total}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">({percentage}%)</span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {format(new Date(result.createdAt), "PPp")}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
