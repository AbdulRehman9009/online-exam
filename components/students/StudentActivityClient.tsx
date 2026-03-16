"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface StudentActivityClientProps {
  data: {
    upcomingExamsCount: number;
    recentResults: any[];
  };
}

export function StudentActivityClient({ data }: StudentActivityClientProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2"
    >
        <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm h-full">
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
        </motion.div>

        <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription className="italic">
                  Scores from your most recently completed exams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentResults.length > 0 ? (
                    data.recentResults.map((result: any, index: number) => (
                      <motion.div 
                        key={result.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                        className="group transition-all"
                      >
                        <div className="flex items-center justify-between p-2 rounded-xl group-hover:bg-accent/30 cursor-default">
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
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground p-4 text-center italic">No results available yet.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-6 flex justify-center mt-auto">
                 <Link href="/students/grades">
                    <Button variant="ghost" size="sm" className="text-xs text-primary font-bold hover:bg-primary/5 rounded-full px-6">
                        View Full Transcript
                    </Button>
                 </Link>
              </CardFooter>
            </Card>
        </motion.div>
      </motion.div>
  );
}
