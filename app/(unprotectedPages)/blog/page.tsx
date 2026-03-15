'use client';

import { motion } from 'motion/react';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  Sparkles,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const posts = [
  {
    title: "The Future of AI in Modern Education",
    excerpt: "Exploring how generative AI is reshaping the way instructors create and evaluate student assessments...",
    author: "Dr. Sarah Chen",
    date: "Mar 12, 2024",
    category: "AI & Education",
    image: "bg-blue-500/10"
  },
  {
    title: "10 Tips for a Stress-Free Exam Season",
    excerpt: "Help your students succeed with these proven strategies for planning and executing digital examinations...",
    author: "Prof. Michael Ross",
    date: "Mar 10, 2024",
    category: "Student Success",
    image: "bg-emerald-500/10"
  },
  {
    title: "Securing the Virtual Classroom",
    excerpt: "A comprehensive guide on maintaining privacy and security in the era of remote learning and proctoring...",
    author: "Alex Rivera",
    date: "Mar 08, 2024",
    category: "Security",
    image: "bg-purple-500/10"
  },
  {
    title: "SmartExam's 2024 Product Roadmap",
    excerpt: "Sneak peek at upcoming features including voice-based responses and real-time collaborative assessments...",
    author: "Product Team",
    date: "Mar 05, 2024",
    category: "Updates",
    image: "bg-orange-500/10"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
              <Sparkles size={14} />
              <span>News & Insights</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our <span className="text-primary italic">Blog</span></h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stay updated with the latest trends in ed-tech, platform updates, and expert tips.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-80"
          >
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search articles..." className="pl-10 rounded-xl border-border" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="px-4 max-w-7xl mx-auto pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-video ${post.image} rounded-[2rem] border border-border mb-6 overflow-hidden relative transition-all group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transform group-hover:scale-110 transition-transform">
                    <Sparkles size={120} className="text-primary" />
                </div>
                <div className="absolute top-6 left-6">
                   <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 text-foreground text-xs font-bold border border-border">
                     {post.category}
                   </div>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                   <div className="flex items-center gap-1.5 lowercase">
                     <Calendar size={14} />
                     <span>{post.date}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <User size={14} />
                     <span>{post.author}</span>
                   </div>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all pt-2">
                  <span>Read Full Article</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-32 px-4 max-w-5xl mx-auto">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-primary/5 border border-primary/10 rounded-[3rem] p-12 text-center"
         >
            <h2 className="text-3xl font-bold mb-4">Never miss an update</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Get the latest insights and product updates delivered straight to your inbox every two weeks.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
               <Input placeholder="Enter your email" className="h-12 rounded-xl bg-background" />
               <Button className="h-12 rounded-xl font-bold px-8">Subscribe</Button>
            </form>
         </motion.div>
      </section>
    </div>
  );
}
