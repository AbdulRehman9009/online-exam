'use client';

import { motion } from 'motion/react';
import { 
  Library, 
  Lightbulb, 
  Search, 
  BookMarked, 
  Clock, 
  Star, 
  ChevronRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const guideCategories = [
  {
    title: "Exam Strategies",
    icon: Lightbulb,
    color: "bg-orange-500/10 text-orange-600",
    guides: [
       { title: "Managing Exam Anxiety", time: "8 min read" },
       { title: "Time Management Techniques", time: "12 min read" },
       { title: "Effective Note Taking", time: "10 min read" }
    ]
  },
  {
    title: "Subject Guides",
    icon: BookMarked,
    color: "bg-blue-500/10 text-blue-600",
    guides: [
       { title: "Math & Statistics Fundamentals", time: "25 min read" },
       { title: "Logic & Critical Thinking", time: "18 min read" },
       { title: "Scientific Writing Basics", time: "15 min read" }
    ]
  },
  {
    title: "Technical Prep",
    icon: Library,
    color: "bg-emerald-500/10 text-emerald-500",
    guides: [
       { title: "Optimizing Your Study Environment", time: "5 min read" },
       { title: "Mastering the SmartExam Interface", time: "10 min read" },
       { title: "Proctoring Best Practices", time: "7 min read" }
    ]
  }
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-primary/5 text-center overflow-hidden relative">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Star size={14} className="fill-primary" />
              <span>Student Success Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Study <span className="text-primary underline decoration-primary/20 transition-all hover:decoration-primary">Smarter</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Empower your learning journey with expert guides, study tips, and resources 
              designed to help you excel in every assessment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Button size="lg" className="rounded-2xl px-8 h-14 text-lg font-bold gap-2">
               Explore All Guides
               <ChevronRight size={20} />
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-lg font-bold bg-background">
               Watch Tutorials
            </Button>
          </motion.div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
           <Library size={300} className="text-primary rotate-12" />
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {guideCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-8"
            >
               <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center`}>
                    <cat.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">{cat.title}</h3>
               </div>
               <div className="space-y-4">
                  {cat.guides.map((guide, gIdx) => (
                    <motion.div
                      key={gIdx}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-secondary/20 border border-transparent hover:border-border hover:bg-background transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5"
                    >
                      <div className="flex items-start justify-between">
                         <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors pr-8">
                           {guide.title}
                         </h4>
                         <Star size={16} className="text-primary/20 group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                         <div className="flex items-center gap-1.5">
                           <Clock size={14} />
                           <span>{guide.time}</span>
                         </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
               <button className="text-primary font-bold text-sm flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                  Browse all {cat.title} <ChevronRight size={16} />
               </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resource Download */}
      <section className="py-24 px-4 border-t border-border">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="md:w-1/2 aspect-square bg-primary/10 rounded-[3rem] flex items-center justify-center p-20"
            >
               <div className="relative">
                 <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                 <Download size={180} className="text-primary" />
               </div>
            </motion.div>
            <div className="md:w-1/2 space-y-8">
               <h2 className="text-4xl font-bold leading-tight">Download Our Survival Kit for Finals Room</h2>
               <p className="text-xl text-muted-foreground leading-relaxed">
                  Our comprehensive 20-page PDF guide covers everything from scientific memory tricks 
                  to physical wellness during exam periods.
               </p>
               <div className="space-y-4">
                  {[
                    "Proven memory palace techniques",
                    "A student-friendly nutrition plan",
                    "Scientific sleep optimization for exams",
                    "SmartExam interface cheat sheet"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-lg font-medium">
                       <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                         <ChevronRight size={14} />
                       </div>
                       <span>{item}</span>
                    </div>
                  ))}
               </div>
               <Button size="lg" className="rounded-2xl px-10 h-14 text-lg font-bold gap-3 shadow-xl shadow-primary/20 group mt-4">
                  <Download size={22} className="group-hover:translate-y-1 transition-transform" />
                  Download Survival Kit
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
