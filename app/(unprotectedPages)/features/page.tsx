'use client';

import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Lock, 
  Zap, 
  BarChart3, 
  Database, 
  Cloud,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    title: "AI-Powered Proctoring",
    description: "Real-time monitoring using advanced computer vision to ensure exam integrity and detect suspicious activities.",
    icon: Cpu,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Secure Browser Isolation",
    description: "Prevents students from accessing unauthorized websites, applications, or external resources during the exam.",
    icon: Lock,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "Instant Analytics",
    description: "Comprehensive reporting and insights into student performance, question difficulty, and overall score distributions.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Global Scalability",
    description: "Built on lightning-fast cloud infrastructure that handles thousands of concurrent users with zero latency.",
    icon: Cloud,
    color: "bg-sky-500/10 text-sky-500"
  },
  {
    title: "Question Bank Management",
    description: "Easily create, organize, and randomize vast libraries of questions with multiple types and difficulty levels.",
    icon: Database,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Dynamic Evaluation",
    description: "Automated grading for objective questions and AI-assisted marking for descriptive and open-ended answers.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-background text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap size={14} />
              <span>Cutting-Edge Technology</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Powerful Features for <span className="text-primary">Modern</span> Learning
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              SmartExam provides everything you need to conduct high-stakes assessments with 
              confidence, security, and ease.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </section>

      {/* Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-border bg-background hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Enterprise-grade security</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Seamless User Experience</span>
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-primary text-primary-foreground text-center mx-4 md:mx-8 rounded-[3rem] mb-24 overflow-hidden relative">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to see it in action?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Join thousands of institutions that trust SmartExam for their examination needs. 
            Experience the future of assessment today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-xl">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-primary-foreground/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-all">
              Request Demo
            </button>
          </div>
        </div>
        
        {/* Animated background highlights */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-full h-[200%] bg-white/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-full h-[200%] bg-white/5 rounded-full blur-[100px]" 
        />
      </section>
    </div>
  );
}
