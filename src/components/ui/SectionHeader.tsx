import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: "cyan" | "purple" | "neutral";
  title: string | ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badgeText,
  badgeVariant = "cyan",
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16 md:mb-20",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-2xl",
        className
      )}
    >
      {badgeText && (
        <Badge variant={badgeVariant} className="mb-4">
          {badgeText}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#9290A3] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
