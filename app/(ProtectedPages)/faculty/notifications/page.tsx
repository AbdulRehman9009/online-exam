"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send, Users, History, CheckCircle2 } from "lucide-react";
import { broadcastNotification } from "@/lib/actions/dashboard";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function FacultyNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return toast.error("Please fill in all fields");

    setIsSending(true);
    try {
      const res = await broadcastNotification({ title, message, target: "ALL" });
      if (res.success) {
        toast.success("Notification broadcasted successfully!");
        setTitle("");
        setMessage("");
      } else {
        toast.error("Failed to send notification");
      }
    } catch (error) {
       toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
        <p className="text-muted-foreground mt-2">
          Broadcast alerts, reminders, and updates to all registered students.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Compose Broadcast
            </CardTitle>
            <CardDescription>
              Write a message that will appear instantly on student dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  placeholder="e.g., Final Exam Schedule Update" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Body</label>
                <Textarea 
                  placeholder="Enter the details of your announcement..." 
                  className="min-h-[150px] rounded-xl"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full rounded-xl h-11" disabled={isSending}>
                {isSending ? "Sending..." : "Broadcast to All Students"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Target Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 text-primary border border-primary/10">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm font-bold">All Students</p>
                  <p className="text-[10px] opacity-80 uppercase tracking-tighter">Global Broadcast</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 text-sm">
                  <div className="p-2 bg-secondary rounded-lg h-fit">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">Last Exam Prep tips</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Sent 2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <div className="p-2 bg-secondary rounded-lg h-fit">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">Welcome to Term 2</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Sent 1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
