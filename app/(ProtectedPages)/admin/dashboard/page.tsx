export const dynamic = "force-dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats, getEngagementStats } from "@/lib/actions/admin";
import { Users, FileText, School, GraduationCap, Shield, AlertTriangle, RefreshCcw, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { StatCardsClient } from "@/components/admin/StatCardsClient";
import Link from "next/link";
import { Suspense } from "react";

function DashboardSkeleton() {
  return (
    <div className="flex items-center justify-center h-[300px] w-full bg-card/20 animate-pulse rounded-3xl border border-dashed border-border/60">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin opacity-20" />
        <span className="text-sm font-medium italic opacity-50">Syncing platform metrics...</span>
      </div>
    </div>
  );
}

async function StatCards() {
  const stats = await getAdminStats();
  return <StatCardsClient stats={stats} />;
}

async function EngagementAnalytics() {
  const engagementData = await getEngagementStats();
  return <AnalyticsChart data={engagementData} />;
}

function StatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="h-32 bg-card/40 animate-pulse border-none shadow-none" />
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Overview</h1>
        <p className="text-muted-foreground text-lg italic">
          High-level metrics and system performance at a glance.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatCards />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Suspense fallback={<DashboardSkeleton />}>
            <EngagementAnalytics />
          </Suspense>
        </div>

        <Card className="lg:col-span-3 border-none shadow-md bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-3">
                <Button variant="outline" asChild className="justify-start h-12 border-sidebar-border/50 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                   <Link href="/admin/faculty">
                    <Users className="mr-3 h-4 w-4" /> Faculty Directory
                   </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-12 border-sidebar-border/50 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                   <Link href="/admin/reports">
                    <FileText className="mr-3 h-4 w-4" /> View System Reports
                   </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-12 border-sidebar-border/50 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                   <Link href="/admin/settings">
                    <Shield className="mr-3 h-4 w-4" /> Global Settings
                   </Link>
                </Button>
             </div>
             <Separator className="my-2" />
             <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-1">
                   <AlertTriangle className="h-4 w-4" /> Action Required
                </div>
                <p className="text-xs text-orange-700/80 leading-relaxed italic">
                   The semester rollover is in 14 days. Please verify all department mappings before the freeze.
                </p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
