import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  hasPerspective?: boolean;
}

export function GridPattern({ className, hasPerspective = true }: GridPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      {/* Ambient neon radial lights */}
      <div className="absolute -top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#00F5FF]/10 blur-[120px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#8B2CFF]/12 blur-[140px] pointer-events-none animate-ambient-purple" />
      
      {/* Digital Grid Canvas */}
      <div
        className={cn(
          "absolute inset-0 digital-grid-bg opacity-70",
          hasPerspective && "perspective-grid h-[140%] w-[120%] -left-[10%]"
        )}
      />
    </div>
  );
}
