"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Clock, Trash2, MailOpen } from "lucide-react";
import { getNotifications, markNotificationAsRead } from "@/lib/actions/dashboard";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await getNotifications();
      setNotifications(data);
      setIsLoading(false);
    };
    fetchNotifs();
  }, []);

  const handleToggleRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with your latest exam scores and institutional announcements.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-secondary/50 animate-pulse rounded-2xl" />)}
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`overflow-hidden transition-all border-l-4 ${!n.isRead ? 'border-l-primary bg-primary/2' : 'border-l-transparent'}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${!n.isRead ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary text-muted-foreground'}`}>
                        {n.title.includes('Result') ? <CheckCircle2 size={22} /> : <Bell size={22} />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-bold ${!n.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</h3>
                          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 uppercase tracking-tight">
                            <Clock size={10} />
                            {formatDistanceToNow(new Date(n.createdAt))} ago
                          </span>
                        </div>
                        <p className="text-sm text-balance leading-relaxed text-muted-foreground">
                          {n.message}
                        </p>
                        {!n.isRead && (
                          <div className="pt-3 flex gap-2">
                             <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-xs rounded-lg"
                                onClick={() => handleToggleRead(n.id)}
                             >
                               <MailOpen className="w-3.5 h-3.5 mr-2" />
                               Mark as read
                             </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border/50">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border shadow-sm">
            <Bell className="text-muted-foreground w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">All caught up!</h2>
          <p className="text-muted-foreground max-w-xs mx-auto mt-2">
            You don't have any notifications at the moment. We'll let you know when something new arrives.
          </p>
        </div>
      )}
    </div>
  );
}
