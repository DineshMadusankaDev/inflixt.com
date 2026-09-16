"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/types";
import { ArrowRight, ExternalLink, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  reverse?: boolean;
}

export function ProjectCard({ project, index, reverse = false }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isFairComment = project.id === "fair-comment";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-3xl bg-[#0B0717] border border-white/10 overflow-hidden hover:border-[#00F5FF]/40 focus-within:border-[#00F5FF]/50 focus-within:ring-1 focus-within:ring-[#00F5FF]/30 hover:shadow-[0_8px_40px_rgba(0,245,255,0.12)] transition-all duration-500 group relative p-6 sm:p-8 lg:p-10"
    >
      {/* Interactive cursor spotlight glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 255, 0.12), transparent 70%)`,
        }}
      />

      {/* Internal subtle technical grid */}
      <div className="pointer-events-none absolute inset-0 tech-grid-pattern opacity-15" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Dominant Visual Hero Preview Frame (7 Columns on Desktop: 60%+ Visual Dominance) */}
        <div
          className={cn(
            "lg:col-span-7 flex flex-col",
            reverse && "lg:order-2"
          )}
        >
          <div className="relative rounded-2xl bg-[#080512] border border-white/15 overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-[#00F5FF]/40 group-hover:shadow-[0_0_35px_rgba(0,245,255,0.15)]">
            {/* Top Laser Line on hover */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Browser Chrome Bar */}
            <div className="px-4 py-3 bg-[#0B0717] border-b border-white/10 flex items-center justify-between gap-2 relative z-20">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              </div>

              {/* URL Address Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05030D] border border-white/10 text-[11px] font-mono text-[#9290A3] max-w-[200px] sm:max-w-xs truncate">
                <Lock className="w-3 h-3 text-[#00F5FF] shrink-0" />
                <span className="truncate text-[#E7E5EE]/90">{project.displayUrl}</span>
              </div>

              {/* Verified Live Beacon */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[10px] font-mono text-[#00F5FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
                <span>LIVE PROJECT</span>
              </div>
            </div>

            {/* High-Fidelity Authentic Live Project Showcase */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#05030D] group/preview">
              <Image
                src={
                  isFairComment
                    ? "/images/projects/fair-comment-preview.png"
                    : "/images/projects/studio-2020-preview.png"
                }
                alt={`${project.title} verified live production platform interface`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority={index === 0}
              />
              {/* Subtle edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05030D] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Real Platform Architecture Tags Bar */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-2.5 sm:p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                  <span className="text-white font-medium">
                    {isFairComment ? "Sanity Headless CMS" : "Tailwind Spatial UX"}
                  </span>
                </div>
                <span className="text-[#00F5FF]">
                  {isFairComment ? "Cloudflare Edge · Next.js" : "Next.js · Responsive Grid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Project Information Column */}
        <div
          className={cn(
            "lg:col-span-5 flex flex-col justify-between",
            reverse && "lg:order-1"
          )}
        >
          <div>
            {/* Header: Badge & Domain */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3 py-1 rounded-full">
                CASE STUDY // 0{index + 1}
              </span>
              <span className="text-xs font-mono text-[#9290A3]">
                {project.clientDomain}
              </span>
            </div>

            {/* Title & Classification */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-[#00F5FF] transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#8B2CFF] uppercase tracking-wider mb-4">
              {project.classification}
            </p>

            {/* Summary */}
            <p className="text-sm text-[#9290A3] leading-relaxed mb-6">
              {project.summary}
            </p>

            {/* What We Built Highlights */}
            {project.whatWeBuilt && project.whatWeBuilt.length > 0 && (
              <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#E7E5EE]/90 mb-2">
                  Key Deliverables
                </div>
                {project.whatWeBuilt.slice(0, 3).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#9290A3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Confirmed Technologies */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-white/90 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md group-hover:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/work/${project.slug}`}
              className="text-sm font-semibold text-white hover:text-[#00F5FF] inline-flex items-center gap-2 transition-colors group/link focus-visible:outline-none focus-visible:underline"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1.5 text-[#00F5FF]" />
            </Link>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9290A3] hover:text-white inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:underline px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3 h-3 text-[#00F5FF]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
