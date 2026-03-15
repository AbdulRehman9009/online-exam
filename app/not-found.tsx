'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="text-[12rem] font-bold text-primary/10 select-none leading-none"
        >
          404
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-background p-6 rounded-full shadow-2xl border border-border"
          >
            <Search className="w-16 h-16 text-primary animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold tracking-tight mb-4"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground max-w-md mb-10 text-lg"
      >
        Oops! The page you are looking for seems to have wandered off into the digital void. 
        Don't worry, even the best students get lost sometimes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button asChild variant="default" size="lg" className="gap-2 px-8">
          <Link href="/">
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2 px-8"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />
    </div>
  );
}
