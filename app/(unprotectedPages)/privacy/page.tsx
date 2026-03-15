'use client';

import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We collect only the information necessary to provide a secure and efficient examination experience. This includes student identification, proctoring data, and academic records.",
      icon: Eye
    },
    {
      title: "How We Use Data",
      content: "Your data is used solely for identity verification, exam integrity monitoring, and providing performance analytics to authorized educational institutions.",
      icon: FileText
    },
    {
      title: "Data Security",
      content: "We employ industry-leading encryption and security protocols to protect your personal information from unauthorized access, disclosure, or alteration.",
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4">
             <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last Updated: March 15, 2026</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <section.icon size={24} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-border mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Contact Us About Privacy</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you have any questions or concerns about our privacy practices, please contact our
              Data Protection Officer at:
            </p>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border inline-block">
               <p className="font-bold text-foreground">privacy@smartexam.com</p>
               <p className="text-sm text-muted-foreground">123 Tech Campus, Silicon Valley, CA</p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
