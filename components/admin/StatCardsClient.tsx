"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  trend: string;
  color: string;
}

interface StatCardsClientProps {
  statCards: StatCard[];
}

export function StatCardsClient({ statCards }: StatCardsClientProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {statCards.map((stat) => (
        <motion.div variants={item} key={stat.title}>
          <Card className="border-none shadow-md shadow-black/5 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{stat.trend}</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight mb-0.5">{stat.value}</div>
              <CardTitle className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</CardTitle>
              <p className="text-[11px] text-muted-foreground italic">{stat.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
