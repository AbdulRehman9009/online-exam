import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full gap-4 text-muted-foreground animate-in fade-in duration-500">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="font-medium tracking-tight">Loading data...</p>
    </div>
  );
}
