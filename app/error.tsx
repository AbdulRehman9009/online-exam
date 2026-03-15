'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="bg-destructive/10 p-8 rounded-full border border-destructive/20"
          >
            <AlertCircle className="w-20 h-20 text-destructive" />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute -top-2 -right-2 bg-destructive text-white p-2 rounded-full shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold tracking-tight mb-4"
      >
        Something went wrong!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground max-w-md mb-2 text-lg"
      >
        An unexpected error occurred. Our team has been notified and we're working to fix it.
      </motion.p>
      
      {error.digest && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-mono text-muted-foreground/60 mb-10"
        >
          Error ID: {error.digest}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-6"
      >
        <Button 
          onClick={() => reset()} 
          variant="default" 
          size="lg" 
          className="gap-2 px-8"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2 px-8">
          <Link href="/">
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </Button>
      </motion.div>

      {/* Background Decorative blobs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-destructive/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}
