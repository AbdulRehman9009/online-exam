import { ShieldCheck, CheckCircle } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-100px)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle rich background */}
      <div className="absolute top-0 w-full h-full -z-10 pointer-events-none opacity-50 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {children}
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" />
          <span>Automated</span>
        </div>
      </div>
    </div>
  );
}
