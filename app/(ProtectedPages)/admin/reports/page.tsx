import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { School, GraduationCap, FileCheck, AlertTriangle } from "lucide-react";

export default async function AdminReportsPage() {
  const reportCards = [
    {
      title: "Avg. Pass Rate",
      value: "78.5%",
      description: "Across all active courses",
      trend: "+2.1%",
      trendUp: true,
      icon: FileCheck,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Active Sessions",
      value: "124",
      description: "Real-time participation",
      trend: "+15",
      trendUp: true,
      icon: GraduationCap,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      description: "24h health monitoring",
      trend: "Peak",
      trendUp: true,
      icon: School,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Flagged Results",
      value: "12",
      description: "Integrity alerts",
      trend: "-3",
      trendUp: false,
      icon: AlertTriangle,
      color: "bg-rose-500/10 text-rose-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Performance Analytics</h1>
        <p className="text-muted-foreground text-lg italic">
          Deep dive into institutional performance and system integrity metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reportCards.map((report) => (
          <Card key={report.title} className="border-none shadow-md bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className={`p-2 rounded-xl ${report.color}`}>
                <report.icon className="h-5 w-5" />
              </div>
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                report.trendUp ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
              }`}>
                {report.trend}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight mb-0.5">{report.value}</div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">{report.title}</CardTitle>
              <p className="text-[11px] text-muted-foreground italic">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-md bg-card/50">
        <CardHeader>
          <CardTitle className="text-xl">Examination Distribution</CardTitle>
          <CardDescription>Visualizing student performance ranges across departments.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col items-center justify-center border-t border-dashed border-border/60">
             <div className="flex gap-4 items-end h-64 w-full max-w-2xl px-8">
                {[20, 35, 60, 85, 95, 75, 50, 30].map((h, i) => (
                   <div key={i} className="flex-1 space-y-2">
                      <div 
                        className="w-full bg-gradient-to-t from-primary/40 to-primary/10 rounded-t-lg transition-all hover:from-primary/60"
                        style={{ height: `${h}%` }}
                      />
                      <div className="text-[10px] text-center font-medium text-muted-foreground uppercase opacity-60">
                        {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'][i]}
                      </div>
                   </div>
                ))}
             </div>
             <p className="mt-10 text-sm text-muted-foreground italic font-medium px-4 text-center">
               Trend Analysis: Grading consistency has improved by 14% since the last reporting cycle.
             </p>
        </CardContent>
      </Card>
    </div>
  );
}
