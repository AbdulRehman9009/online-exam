"use client"

import { ShieldCheck, BookOpen, GraduationCap, LayoutDashboard, BrainCircuit, Activity, BarChart3, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const features = [
    {
      title: "Secure Role-Based Access",
      description: "Dedicated portals for Faculty and Students ensure data privacy and exam integrity through strict authentication.",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Dynamic Question Management",
      description: "A robust repository for examiners to create, categorize, and update complex question sets with ease.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      title: "Live Automated Proctoring",
      description: "Built-in session monitoring and countdown timers to maintain the highest standards of exam discipline.",
      icon: <Activity className="h-6 w-6 text-primary" />,
    },
    {
      title: "Instant Result Logic",
      description: "An advanced evaluation engine that processes submissions the moment they are completed, providing immediate performance metrics.",
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    },
  ]

  const advantages = [
    {
      title: "Zero Manual Grading",
      description: "Eliminate the possibility of human error and save hundreds of hours with our server-side automatic marking system."
    },
    {
      title: "Enhanced Integrity",
      description: "Minimize cheating through randomized question delivery and controlled testing environments as outlined in our SRS security protocols."
    },
    {
      title: "Scalable Efficiency",
      description: "Handle multiple concurrent exam sessions without the administrative overhead of physical classrooms or paper distribution."
    },
    {
      title: "Centralized Analytics",
      description: "Access a history of student performance and exam statistics from a single, integrated PostgreSQL database."
    }
  ]

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-background selection:bg-primary/20 overflow-x-hidden">

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative pt-24 pb-32 overflow-hidden bg-background text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-md"
              >
                <ShieldCheck className="h-4 w-4 animate-pulse" />
                <span>Secure and Automated Examination Portal</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-8xl lg:text-8xl font-black tracking-tight text-foreground mb-8 max-w-5xl mx-auto leading-[1.05]"
              >
                Secure, Automated, and{" "}
                <span className="text-primary inline-block relative">
                  Effortless
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1 }}
                    className="absolute w-full h-3 -bottom-2 left-0 text-primary/40"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" />
                  </motion.svg>
                </span>
                <br /> Online Exams.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
              >
                Empowering faculty with automated grading while providing students with instant, accurate feedback in a tamper-proof digital environment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/sign-in">
                  <Button size="lg" className="h-16 px-10 text-lg rounded-2xl group shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
                    Student Portal
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-in/faculty">
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-border rounded-2xl hover:bg-secondary bg-background/50 backdrop-blur-sm gap-2 hover:scale-105 transition-transform duration-300">
                    <GraduationCap className="h-5 w-5" />
                    Faculty Dashboard
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-semibold text-sm tracking-wider uppercase">Instant Evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-semibold text-sm tracking-wider uppercase">Anti-Cheating Measures</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-semibold text-sm tracking-wider uppercase">Centralized Database</span>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Section 1: Core Features */}
          <section className="py-32 bg-secondary/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={itemVariants}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Core Product Features</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Everything you need to run high-stakes exams securely.</p>
              </motion.div>
              
              <motion.div 
                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {features.map((feature, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Section 2: Key Advantages */}
          <section className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                  className="lg:col-span-5"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Key Advantages</h2>
                  <p className="text-xl text-muted-foreground mb-10 font-light">
                    Discover why institutions are switching to SmartExam to handle their academic logistics.
                  </p>
                  <ul className="space-y-8">
                    {advantages.map((adv, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                        className="flex gap-5"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">{adv.title}</h4>
                          <p className="text-muted-foreground text-base leading-relaxed">{adv.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Visual Representation of Analytics */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}
                  className="lg:col-span-7 bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">Global Performance</h4>
                      <p className="text-muted-foreground">Class Statistics Overview</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[85, 92, 64, 78, 95].map((width, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-muted-foreground w-12 text-right">Unit {i + 1}</span>
                        <div className="flex-grow h-6 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} whileInView={{ width: `${width}%` }} transition={{ duration: 1.2, delay: 0.2 + (i * 0.1), ease: "easeOut" }} viewport={{ once: true }}
                            className="h-full bg-primary rounded-full"
                          ></motion.div>
                        </div>
                        <span className="text-sm font-semibold text-foreground w-10 text-right">{width}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Section 3: User-Specific Workflows */}
          <section className="py-32 bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Tailored Workflows</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Purpose-built interfaces designed for the distinct needs of educators and learners.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Faculty Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                  className="group rounded-[2.5rem] border border-border bg-background p-10 md:p-12 shadow-lg hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <LayoutDashboard strokeWidth={2} size={32} />
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-bold tracking-widest uppercase text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">For Faculty</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Comprehensive Dashboard</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Full control over the examination lifecycle—from initial scheduling to the final review of class-wide performance reports.
                  </p>
                </motion.div>

                {/* Student Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                  className="group rounded-[2.5rem] border border-border bg-background p-10 md:p-12 shadow-lg hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Clock strokeWidth={2} size={32} />
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-bold tracking-widest uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">For Students</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Focused Testing Interface</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A clean, distraction-free UI with real-time time tracking, ensuring students can focus solely on their performance.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-8 tracking-tight">Ready to transform your exams?</h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
                Join thousands of institutions utilizing SmartExam for airtight academic integrity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full bg-background mt-4 sm:mt-0 w-full sm:w-auto group">
                  Contact Sales <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </section>

        </main>

      </div>
    </>
  )
}
