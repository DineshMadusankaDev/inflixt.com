"use client";

import { useState, MouseEvent } from "react";
import Link from "next/link";
import { 
  Globe, 
  ShoppingBag, 
  Smartphone, 
  Layers, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";
import { ServiceVisual } from "./ServiceVisuals";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  variant?: "hero" | "standard";
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  ShoppingBag,
  Smartphone,
  Layers,
  Cpu,
  TrendingUp,
};

export function ServiceCard({
  service,
  index,
  variant = "standard",
  className,
}: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Globe;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isHero = variant === "hero";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl bg-[#0B0717] border border-white/10 transition-all duration-300 hover:border-[#00F5FF]/40 focus-within:border-[#00F5FF]/50 focus-within:ring-1 focus-within:ring-[#00F5FF]/30 motion-safe:hover:-translate-y-1.5 hover:shadow-[0_4px_32px_rgba(0,245,255,0.12)] group flex flex-col justify-between overflow-hidden",
        isHero
          ? "p-8 sm:p-10 lg:p-12 border-white/15 bg-gradient-to-br from-[#0B0717] via-[#080512] to-[#0B0717]"
          : "p-6 sm:p-8",
        className
      )}
    >
      {/* Faint internal technical grid overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 tech-grid-pattern transition-opacity duration-300",
          isHovered ? "opacity-35" : "opacity-0"
        )}
      />

      {/* Interactive cursor spotlight glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(${isHero ? 550 : 350}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 255, 0.14), transparent 70%)`,
        }}
      />

      {isHero ? (
        /* Dominant Hero Service Panel Layout (2 Columns on Desktop) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
          {/* Left Column: Core Capability Content */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Header: Badge & Index */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-xs font-mono text-[#00F5FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                  <span>CORE ARCHITECTURAL PILLAR</span>
                </div>
                <span className="text-xs font-mono text-[#9290A3] group-hover:text-white transition-colors duration-200">
                  0{index + 1}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.35)] motion-safe:group-hover:scale-[1.05] transition-all duration-200">
                  <IconComponent className="w-7 h-7 transition-transform duration-200" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#00F5FF] transition-colors duration-200">
                  {service.title}
                </h3>
              </div>

              <p className="text-base text-[#9290A3] leading-relaxed mb-8 max-w-xl">
                {service.shortDescription}
              </p>

              {/* Capabilities preview */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-xs font-mono text-[#E7E5EE]/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors group-hover:border-[#00F5FF]/30"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer CTA Link */}
            <div className="pt-4 border-t border-white/10">
              <Link
                href={`/services#${service.id}`}
                className="text-sm font-semibold text-white hover:text-[#00F5FF] inline-flex items-center gap-2 group/link transition-colors focus-visible:outline-none focus-visible:underline"
              >
                <span>Explore Capabilities</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1.5 group-hover/link:-translate-y-1.5 text-[#00F5FF]" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Fidelity Interface & Wireframe Architecture Metaphor */}
          <div className="lg:col-span-5 h-full flex items-center">
            <ServiceVisual serviceId={service.id} isHovered={isHovered} />
          </div>
        </div>
      ) : (
        /* Supporting Service Cards */
        <div className="flex flex-col justify-between h-full relative z-10">
          <div>
            {/* Top bar: Icon and index */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_16px_rgba(0,245,255,0.3)] motion-safe:group-hover:scale-[1.04] transition-all duration-200">
                <IconComponent className="w-6 h-6 transition-transform duration-200" />
              </div>
              <span className="text-xs font-mono text-[#9290A3] group-hover:text-white transition-colors duration-200">
                0{index + 1}
              </span>
            </div>

            {/* Service-Specific High-Fidelity Mini Product Interface */}
            <ServiceVisual serviceId={service.id} isHovered={isHovered} />

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F5FF] transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-sm text-[#9290A3] leading-relaxed mb-6">
              {service.shortDescription}
            </p>

            {/* Capabilities preview */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {service.capabilities.slice(0, 3).map((cap) => (
                <span
                  key={cap}
                  className="text-[11px] font-mono text-[#E7E5EE]/80 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md transition-colors group-hover:border-white/10"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Link */}
          <div className="pt-4 border-t border-white/5">
            <Link
              href={`/services#${service.id}`}
              className="text-xs font-medium text-white/80 hover:text-[#00F5FF] inline-flex items-center gap-1.5 group/link transition-colors focus-visible:outline-none focus-visible:underline"
            >
              <span>Explore Capabilities</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-1 text-[#00F5FF]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
