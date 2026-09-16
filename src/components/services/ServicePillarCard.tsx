"use client";

import { useState, MouseEvent, ReactNode } from "react";
import { ServiceItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Globe,
  ShoppingBag,
  Smartphone,
  Layers,
  Cpu,
  TrendingUp,
} from "lucide-react";

interface ServicePillarCardProps {
  service: ServiceItem;
  index: number;
  layout?: "featured" | "standard";
  visualMetaphor?: ReactNode;
  badgeVariant?: "cyan" | "purple";
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  ShoppingBag,
  Smartphone,
  Layers,
  Cpu,
  TrendingUp,
};

export function ServicePillarCard({
  service,
  index,
  layout = "standard",
  visualMetaphor,
  badgeVariant = "cyan",
}: ServicePillarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[service.iconName] || Globe;
  const isFeatured = layout === "featured";
  const pillarNumber = `0${index + 1}`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      id={service.id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "rounded-3xl bg-[#0B0717] border border-white/10 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-[#00F5FF]/30 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_4px_30px_rgba(0,245,255,0.06)] relative overflow-hidden group flex flex-col justify-between scroll-mt-28",
        isFeatured && "lg:p-12"
      )}
    >
      {/* Subtle cursor spotlight */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 255, 0.08), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main card body */}
      <div className="relative z-10">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/40 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] motion-safe:group-hover:scale-105 transition-all duration-200">
              <IconComponent className="w-5 h-5" />
            </div>
            <Badge variant={badgeVariant} size="sm">
              PILLAR {pillarNumber}
            </Badge>
          </div>
          <span className="text-xs font-mono text-[#9290A3] tracking-wider">
            /{service.slug}
          </span>
        </div>

        {/* Content split for featured vs standard */}
        <div className={cn(isFeatured ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8" : "flex flex-col gap-6 mb-8")}>
          {/* Narrative description */}
          <div className={cn(isFeatured ? "lg:col-span-7 flex flex-col justify-between" : "")}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors">
              {service.title}
            </h2>
            <p className="text-sm sm:text-base text-[#E7E5EE] leading-relaxed mb-6">
              {service.fullDescription}
            </p>

            {/* Quick capability tags preview */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md transition-colors group-hover:border-white/20 group-hover:text-[#E7E5EE]"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Conceptual visual metaphor */}
          {visualMetaphor && (
            <div className={cn(isFeatured ? "lg:col-span-5" : "w-full")}>
              {visualMetaphor}
            </div>
          )}
        </div>

        {/* Action bar and disclosure toggle */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Button
            href="/contact"
            size="sm"
            variant="primary"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Discuss a {service.title} Project
          </Button>

          {/* Accessible disclosure trigger button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`specs-${service.id}`}
            className="inline-flex items-center justify-center gap-2 text-xs font-mono text-[#9290A3] hover:text-[#00F5FF] py-2 px-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F5FF]/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] cursor-pointer"
          >
            <span>{isExpanded ? "Hide Specifications" : "View Detailed Capabilities & Deliverables"}</span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-[#00F5FF] transition-transform duration-300 motion-reduce:transition-none",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Expandable specification drawer (CSS Grid 0fr -> 1fr transition) */}
        <div
          id={`specs-${service.id}`}
          role="region"
          aria-label={`${service.title} Specifications`}
          className={cn(
            "grid transition-all duration-300 ease-out motion-reduce:transition-none",
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-white/10" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#080512]/60 rounded-2xl p-6 border border-white/5">
              {/* Column 1: Core Technical Capabilities */}
              <div>
                <h3 className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                  Core Technical Capabilities
                </h3>
                <ul className="space-y-3">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-sm text-[#9290A3]">
                      <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                      <span className="text-[#E7E5EE] leading-normal">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Key Project Deliverables */}
              <div>
                <h3 className="text-xs font-mono text-[#8B2CFF] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2CFF]" />
                  Key Project Deliverables
                </h3>
                <ul className="space-y-3">
                  {service.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5 text-sm text-[#9290A3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B2CFF] shrink-0 mt-2" />
                      <span className="text-[#E7E5EE] leading-normal">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
