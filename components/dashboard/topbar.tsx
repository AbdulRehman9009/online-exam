"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Settings, Bell, Search, GraduationCap, CheckCircle2, Clock } from "lucide-react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { searchEverything, markNotificationAsRead } from "@/lib/actions/dashboard";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { formatDistanceToNow } from "date-fns";

interface TopbarProps {
  user: User;
  initialNotifications?: any[];
}

export function Topbar({ user, initialNotifications = [] }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ exams: any[], students: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        const results = await searchEverything(searchQuery);
        setSearchResults(results as any);
        setIsSearching(false);
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-md px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        
        {/* Mobile Logo */}
        <Link href="/" className="md:hidden flex items-center gap-2 group cursor-pointer">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <GraduationCap size={18} strokeWidth={2.5} />
          </div>
        </Link>
 
        {/* Search Bar - Hidden on extra small, shown on sm+ */}
        <div className="relative max-w-sm w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search exams, results..." 
            className="pl-9 h-9 rounded-xl border-border bg-secondary/50 focus:bg-background transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <AnimatePresence>
            {searchResults && (searchQuery.length > 2) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-full mt-2 bg-background border rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  {searchResults.exams.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-2">Exams</p>
                      {searchResults.exams.map(exam => (
                        <Link key={exam.id} href={`/${user.role?.toLowerCase()}/exams/${exam.id}`}>
                          <div className="px-3 py-2 hover:bg-secondary rounded-lg text-sm cursor-pointer flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                             {exam.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchResults.students.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-2">Students</p>
                      {searchResults.students.map(student => (
                        <Link key={student.id} href={`/faculty/students/${student.id}`}>
                          <div className="px-3 py-2 hover:bg-secondary rounded-lg text-sm cursor-pointer flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                             {student.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchResults.exams.length === 0 && searchResults.students.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No results found</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-secondary">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border-2 border-background"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Notifications</h4>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary hover:bg-transparent">
                  Mark all as read
                </Button>
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => handleMarkAsRead(n.id)}
                    className={`p-4 border-b last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer relative ${!n.isRead ? 'bg-primary/2' : ''}`}
                  >
                    {!n.isRead && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />}
                    <div className="flex gap-3">
                      <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.isRead ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                        {n.title.includes('Result') ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      </div>
                      <div className="space-y-1">
                        <p className={`text-sm ${!n.isRead ? 'font-bold' : 'font-medium'}`}>{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground pt-1">{formatDistanceToNow(new Date(n.createdAt))} ago</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No notifications yet.
                </div>
              )}
            </div>
            <DropdownMenuSeparator className="m-0" />
            <Button variant="ghost" className="w-full text-xs font-semibold h-10 rounded-none">
              View all notifications
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 rounded-full flex items-center gap-2 pl-1 pr-3 hover:bg-secondary">
              <Avatar className="h-7 w-7 border-2 border-background shadow-sm">
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
                <span className="text-xs font-bold">{user?.name || "User"}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.role?.toLowerCase()}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/${user.role?.toLowerCase()}/dashboard`}>
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/${user.role?.toLowerCase()}/settings`}>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
