import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "cyan" | "purple" | "neutral";
  size?: "sm" | "md";
  className?: string;
  hasBeacon?: boolean;
}

export function Badge({
  children,
  variant = "cyan",
  size = "md",
  className,
  hasBeacon = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-mono uppercase tracking-wider transition-all",
        size === "sm" && "text-[11px] px-2.5 py-0.5",
        size === "md" && "text-xs px-3.5 py-1",
        variant === "cyan" && "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30",
        variant === "purple" && "bg-[#8B2CFF]/15 text-[#B026FF] border border-[#8B2CFF]/30",
        variant === "neutral" && "bg-white/5 text-[#E7E5EE] border border-white/10",
        className
      )}
    >
      {hasBeacon && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            "animate-beacon absolute inline-flex h-full w-full rounded-full opacity-75",
            variant === "cyan" ? "bg-[#00F5FF]" : "bg-[#8B2CFF]"
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variant === "cyan" ? "bg-[#00F5FF]" : "bg-[#8B2CFF]"
          )} />
        </span>
      )}
      {children}
    </span>
  );
}
