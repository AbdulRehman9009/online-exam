"use client";

import { useTransition, useState, useEffect } from "react";
import { getFacultyQueries, answerQuestion } from "@/lib/actions/queries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare, Send, User, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacultyQueriesPage() {
  const [isPending, startTransition] = useTransition();
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const fetchQueries = async () => {
    try {
      const data = await getFacultyQueries();
      setQueries(data);
    } catch (error) {
      toast.error("Failed to load student queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleAnswer = (id: string) => {
    if (!answerText.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    startTransition(() => {
      answerQuestion({ id, answer: answerText }).then((data) => {
        if (data.success) {
          toast.success(data.success);
          setAnsweringId(null);
          setAnswerText("");
          fetchQueries();
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground underline decoration-primary/30 underline-offset-8">Student Resolution Center</h1>
        <p className="text-muted-foreground italic">Provide guidance and answers to assigned or public student queries.</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full shadow-lg" />
          </div>
        ) : queries.length === 0 ? (
          <Card className="bg-secondary/10 border-dashed border-2">
            <CardContent className="p-20 text-center space-y-4">
                <AlertCircle size={40} className="mx-auto text-muted-foreground opacity-50" />
              <p className="text-lg font-medium text-muted-foreground">No pending student queries at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          queries.map((query, index) => (
            <motion.div
              key={query.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`group transition-all hover:shadow-xl ${query.isResolved ? 'opacity-80' : 'border-primary/30 ring-1 ring-primary/5 shadow-lg'}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                    </div>
                    <div>
                        <CardTitle className="text-base font-bold">{query.student?.user?.name}</CardTitle>
                        <CardDescription className="text-xs uppercase tracking-widest font-bold text-primary/60">
                            Roll: {query.student?.rollNo || "N/A"}
                        </CardDescription>
                    </div>
                  </div>
                  {query.isResolved ? (
                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase tracking-wider">
                      <CheckCircle2 size={14} /> Resolved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black uppercase tracking-wider animate-pulse">
                      <Clock size={14} /> Urgent
                    </span>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative p-5 bg-background rounded-3xl border border-border/40 shadow-inner">
                    <p className="text-lg font-medium leading-relaxed text-foreground/90">
                        {query.question}
                    </p>
                    <div className="absolute -top-3 -left-3 h-8 w-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg rotate-12">
                        <MessageSquare size={16} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {query.answer ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200/50 dark:border-emerald-800/50"
                      >
                         <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Resolution</span>
                         </div>
                         <p className="text-foreground/80 italic font-medium leading-relaxed">{query.answer}</p>
                      </motion.div>
                    ) : answeringId === query.id ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 space-y-4"
                      >
                        <Textarea
                          placeholder="Provide a detailed response to the student..."
                          className="min-h-[120px] rounded-3xl border-primary/20 focus:ring-2 ring-primary/10 transition-all p-5 text-base"
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                          <Button variant="ghost" onClick={() => setAnsweringId(null)} className="rounded-full">Cancel</Button>
                          <Button 
                            disabled={isPending} 
                            onClick={() => handleAnswer(query.id)}
                            className="rounded-full px-8 bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 font-bold"
                          >
                            {isPending ? "Sending..." : "Post Official Answer"}
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 flex justify-end"
                      >
                        <Button 
                            onClick={() => {
                                setAnsweringId(query.id);
                                setAnswerText("");
                            }}
                            className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-md transition-all font-bold"
                        >
                            Draft Response
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="bg-secondary/5 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex justify-between">
                  <span>Received: {new Date(query.createdAt).toLocaleString()}</span>
                  <span>Category: General Academic</span>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
