'use client';

import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Lock, 
  Fingerprint, 
  Eye, 
  FileLock2, 
  ShieldCheck,
  Server,
  ShieldAlert as CloudSecure,
  KeyRound
} from 'lucide-react';

const coreSecurity = [
  {
    title: "End-to-End Encryption",
    description: "Every byte of data, from your questions to student responses, is encrypted using military-grade AES-256 protocols.",
    icon: FileLock2
  },
  {
    title: "AI Face Recognition",
    description: "Verify student identity throughout the exam with intelligent facial mapping and presence detection.",
    icon: Eye
  },
  {
    title: "Browser Lockdown",
    description: "Create a controlled environment that prevents students from switching tabs, taking screenshots, or using shortcuts.",
    icon: ShieldAlert
  }
];

const infrastructureSteps = [
  {
    title: "Data Residency",
    description: "Compliance with global data protection regulations including GDPR, FERPA, and local privacy laws.",
    icon: Server
  },
  {
    title: "Redundant Backups",
    description: "Your exams and data are mirrored across multiple secure regions to ensure 100% data durability.",
    icon: CloudSecure
  },
  {
    title: "Advanced Access Control",
    description: "Granular permissions and multi-factor authentication for both faculty and administrative staff.",
    icon: KeyRound
  }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 mb-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex py-2 px-4 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold border border-emerald-500/20 mb-8"
          >
            Bank-Level Security Standards
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]"
          >
            Your Privacy is Our <span className="text-primary italic">Priority</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Trust is earned through transparency. SmartExam utilizes cutting-edge security architecture 
            to protect every participant and every evaluation.
          </motion.p>
        </div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-24 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {coreSecurity.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold mb-6">Built on Foundation of Trust</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Security isn't an afterthought for us; it's the core of our technical DNA. 
              We constantly audit our systems through internal and external penetration testing.
            </p>
            <div className="space-y-6">
              {infrastructureSteps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 p-6 rounded-2xl bg-secondary/10 border border-transparent hover:border-border hover:bg-background transition-all"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <step.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, rotate: 5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            className="lg:w-1/2 relative bg-primary rounded-[3rem] p-12 overflow-hidden aspect-square flex flex-col items-center justify-center text-primary-foreground text-center"
          >
             <ShieldCheck size={180} className="mb-8 opacity-20" />
             <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-4">ISO 27001 Certified</h3>
               <p className="opacity-80">Our systems meet the highest global standards for information security management.</p>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.2),transparent)]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
