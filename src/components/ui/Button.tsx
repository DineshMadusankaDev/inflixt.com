import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  className,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] disabled:opacity-50 disabled:pointer-events-none group cursor-pointer motion-safe:hover:scale-[1.015] motion-safe:active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-xl gap-2",
    lg: "text-base px-7 py-3.5 rounded-xl gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#00F5FF] via-[#38E1FF] to-[#8B2CFF] text-[#05030D] font-semibold hover:shadow-[0_0_25px_rgba(0,245,255,0.45)] hover:brightness-105 active:scale-[0.98]",
    secondary:
      "bg-[#0B0717] border border-white/15 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] active:scale-[0.98]",
    outline:
      "bg-transparent border border-[#00F5FF]/40 text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:border-[#00F5FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#E7E5EE] hover:text-[#00F5FF] hover:bg-white/5",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://") || target === "_blank";
    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={combinedClasses}
        >
          {children}
          {icon && (
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none inline-flex items-center">
              {icon}
            </span>
          )}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && (
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none inline-flex items-center">
            {icon}
          </span>
        )}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && (
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none inline-flex items-center">
          {icon}
        </span>
      )}
    </button>
  );
}
