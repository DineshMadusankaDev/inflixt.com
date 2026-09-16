"use client";

import { useState } from "react";
import { ProjectItem } from "@/types";
import { ExternalLink, Lock, ShieldCheck, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LiveWebsitePreviewProps {
  project: ProjectItem;
}

export function LiveWebsitePreview({ project }: LiveWebsitePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet">("desktop");

  // If the project explicitly disallows embedding or iframe errored, show the polished fallback
  const showFallback = !project.embedAllowed || hasError;

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#080512] overflow-hidden shadow-2xl relative">
      {/* Browser Chrome Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#0B0717] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
        {/* Left: Window Controls + Domain */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>

          {/* URL Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#05030D] border border-white/10 text-xs font-mono text-[#9290A3] max-w-[200px] sm:max-w-[320px] truncate">
            <Lock className="w-3 h-3 text-[#00F5FF] shrink-0" aria-label="Secure Connection" />
            <span className="text-white/90 truncate">{project.displayUrl}</span>
          </div>
        </div>

        {/* Center/Right: Controls and Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
          {/* Responsive Viewport Toggle for embeddable desktop */}
          {!showFallback && (
            <div className="hidden md:flex items-center p-0.5 rounded-lg bg-[#05030D] border border-white/10">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-colors ${
                  deviceMode === "desktop"
                    ? "bg-white/10 text-[#00F5FF]"
                    : "text-[#9290A3] hover:text-white"
                }`}
                title="Desktop Presentation"
              >
                <Monitor className="w-3 h-3" />
                <span>Full</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-colors ${
                  deviceMode === "tablet"
                    ? "bg-white/10 text-[#00F5FF]"
                    : "text-[#9290A3] hover:text-white"
                }`}
                title="Constrained Width"
              >
                <Smartphone className="w-3 h-3" />
                <span>Compact</span>
              </button>
            </div>
          )}

          {/* Verified Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[11px] font-mono text-[#00F5FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            <span>Verified Live</span>
          </div>

          {/* Direct Launch Button */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-white hover:text-[#00F5FF] transition-colors group"
          >
            <span>Open Live Website</span>
            <ExternalLink className="w-3 h-3 text-[#00F5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main Viewport Body */}
      <div className="relative w-full bg-[#05030D] flex justify-center items-center overflow-hidden">
        {showFallback ? (
          /* Polished Branded Fallback Preview */
          <div className="w-full min-h-[460px] sm:min-h-[540px] p-6 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Subtle background effects */}
            <div className="absolute inset-0 digital-grid-bg opacity-35 pointer-events-none" />
            <div className="absolute w-72 h-72 rounded-full bg-[#8B2CFF]/10 blur-[100px] pointer-events-none" />
            <div className="absolute w-72 h-72 rounded-full bg-[#00F5FF]/5 blur-[100px] -bottom-10 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              {/* Domain & Security Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#9290A3] mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F5FF]" />
                <span>Direct Production Environment</span>
              </div>

              {/* Title & Classification */}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-[#00F5FF] mb-4">
                {project.classification}
              </p>
              <p className="text-sm text-[#9290A3] leading-relaxed mb-8 max-w-md">
                {project.summary}
              </p>

              {/* Confirmed Technologies */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-md">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-white/90 bg-[#0B0717] border border-white/10 px-3 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  href={project.liveUrl}
                  size="md"
                  variant="primary"
                  icon={<ExternalLink className="w-4 h-4" />}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Live Website
                </Button>
              </div>

              {/* Direct access explanation */}
              <p className="text-[11px] font-mono text-[#9290A3]/80 mt-6 max-w-sm">
                Direct browsing is enforced by origin host security policies. Launch the live website to experience the full interactive platform.
              </p>
            </div>
          </div>
        ) : (
          /* Live Embed Mode */
          <div
            className={`w-full transition-all duration-300 relative ${
              deviceMode === "tablet" ? "max-w-3xl my-6 border border-white/10 rounded-xl overflow-hidden shadow-2xl" : "max-w-full"
            }`}
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-[#080512] flex flex-col items-center justify-center z-10 p-6">
                <div className="w-8 h-8 rounded-full border-2 border-[#00F5FF]/30 border-t-[#00F5FF] animate-spin mb-4" />
                <p className="text-xs font-mono text-[#9290A3]">
                  Connecting to live production environment...
                </p>
              </div>
            )}

            {/* Live iframe */}
            <iframe
              src={project.liveUrl}
              title={`${project.title} Live Website Experience`}
              className="w-full h-[540px] sm:h-[640px] lg:h-[720px] bg-white border-0 transition-opacity duration-300"
              style={{ opacity: isLoading ? 0 : 1 }}
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
            />
          </div>
        )}
      </div>

      {/* Frame Bottom Notice Bar */}
      <div className="px-4 py-2.5 sm:px-6 bg-[#0B0717] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9290A3]">
        <div className="flex items-center gap-2">
          <span className="text-[#00F5FF]">●</span>
          <span>
            {showFallback
              ? "Verified production platform available on external domain"
              : "Live responsive presentation stream"}
          </span>
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Explore full {project.displayUrl} in dedicated window</span>
          <ExternalLink className="w-3 h-3 text-[#00F5FF]" />
        </a>
      </div>
    </div>
  );
}
