'use client';

import { motion } from 'motion/react';
import { 
  MonitorPlay, 
  Calendar, 
  ChevronRight, 
  Layout, 
  FileText, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const agendaItems = [
  {
    title: "Platform Overview",
    description: "A quick walkthrough of student and faculty dashboards.",
    icon: Layout
  },
  {
    title: "Exam Creation Workflow",
    description: "See how easy it is to set up a secure assessment.",
    icon: FileText
  },
  {
    title: "Secure Proctoring Tools",
    description: "Experience our AI-powered monitoring features in action.",
    icon: ShieldCheck
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
                <MonitorPlay size={18} />
                <span>Experience the Future</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Book a Live <span className="text-primary italic">Demonstration</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover how SmartExam can solve your specific assessment challenges. 
                Our experts will walk you through the platform and answer all your questions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold">What to expect:</h3>
              <div className="space-y-4">
                {agendaItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors border border-transparent hover:border-border group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center group-hover:text-primary transition-colors">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="bg-background border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] -z-10" />

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Schedule Your Call</h2>
              <p className="text-muted-foreground">Choose a time that works for you.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium px-1">Organization Name</label>
                <Input placeholder="University of Future" className="h-12 rounded-xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium px-1">First Name</label>
                  <Input placeholder="Jane" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium px-1">Last Name</label>
                  <Input placeholder="Doe" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium px-1">Work Email</label>
                <Input type="email" placeholder="jane@university.edu" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium px-1">Roles of Interest</label>
                <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                  <option>Select an option</option>
                  <option>Faculty / Professor</option>
                  <option>IT Administrator</option>
                  <option>Dean / Provost</option>
                  <option>Other</option>
                </select>
              </div>
              
              <Button className="w-full h-14 rounded-2xl text-lg font-bold gap-2 shadow-lg shadow-primary/20 group">
                Continue to Scheduling
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>No credit card required</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
