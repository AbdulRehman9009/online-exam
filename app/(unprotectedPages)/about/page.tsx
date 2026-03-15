'use client';

import { motion } from 'motion/react';
import { GraduationCap, Users, Target, Shield, Award, Globe } from 'lucide-react';

const stats = [
  { label: 'Registered Students', value: '50k+', icon: Users },
  { label: 'Exams Conducted', value: '1M+', icon: Award },
  { label: 'Global Universities', value: '200+', icon: Globe },
  { label: 'Security Rating', value: '99.9%', icon: Shield },
];

const values = [
  {
    title: "Academic Integrity",
    description: "We believe in fair, honest, and transparent assessment processes for all students.",
    icon: Target
  },
  {
    title: "Technological Excellence",
    description: "Leveraging cutting-edge AI and secure cloud infrastructure to power the future of exams.",
    icon: GraduationCap
  },
  {
    title: "Global Accessibility",
    description: "Making high-quality examination tools available to institutions worldwide, regardless of scale.",
    icon: Globe
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Our Mission to <span className="text-primary">Transform</span> Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              SmartExam is dedicated to providing secure, reliable, and intelligent online examination 
              solutions that empower educational institutions and simplify the lives of students.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">The SmartExam Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2024, SmartExam emerged from a simple observation: the digital transformation 
                of education was lagging in one critical area—assessments. Paper-based exams were inefficient, 
                and existing digital solutions lacked the security and intelligence required for high-stakes testing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of educators and engineers came together to build a platform that doesn't just digitize 
                exams, but enhances them. Today, SmartExam is used by hundreds of institutions to deliver 
                fair, secure, and insightful evaluations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border bg-secondary"
            >
              <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                <GraduationCap size={120} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
