'use client';

import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  GraduationCap, 
  Laptop, 
  ShieldCheck, 
  FileText,
  UserPlus
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
  {
    title: "Getting Started",
    icon: UserPlus,
    links: ["Creating an Account", "Platform Overview", "System Requirements", "First Login Guide"]
  },
  {
    title: "For Faculty",
    icon: GraduationCap,
    links: ["Creating Your First Exam", "Question Bank Management", "Reviewing Student Submissions", "Automated Grading"]
  },
  {
    title: "For Students",
    icon: Laptop,
    links: ["Exam Day Checklist", "Understanding Proctoring", "How to Take an Exam", "Viewing Your Results"]
  },
  {
    title: "Security & Privacy",
    icon: ShieldCheck,
    links: ["Data Protection Policy", "Compliance Standards", "Proctoring Integrity", "Report a Security Vulnerability"]
  }
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 pb-12 px-4 bg-primary/5 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help?</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Search our documentation for guides, tutorials, and technical specifications.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
              <Search size={20} />
            </div>
            <Input 
              placeholder="Search documentation..." 
              className="h-14 pl-12 rounded-2xl border-border bg-background shadow-xl focus:ring-primary"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <cat.icon size={20} />
                </div>
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button className="flex items-center justify-between w-full group text-muted-foreground hover:text-primary transition-colors text-sm py-1">
                      <span>{link}</span>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 px-4 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
              View all articles <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-background border border-border shadow-sm group cursor-pointer"
              >
                <div className="mb-4 text-primary">
                  <FileText size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Integrity and Security Audit {2024 + i}</h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  A deep dive into how SmartExam maintains 100% integrity across global jurisdictions...
                </p>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
