"use client";

import { useState } from "react";
import { Mail, Globe2, ShieldCheck, Copy, Check } from "lucide-react";
import { companyData } from "@/data/company";

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(companyData.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const steps = [
    {
      num: "01",
      title: "Tell us about it",
      desc: "Share your business challenge, product ambition, or engineering scope.",
    },
    {
      num: "02",
      title: "We review the opportunity",
      desc: "We analyze technical feasibility, system architecture, and delivery paths.",
    },
    {
      num: "03",
      title: "We discuss the next step",
      desc: "Clear direct alignment on scope, roadmap, and collaboration model.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 justify-between h-full">
      {/* Top Box: Direct Channels & Verified Positioning */}
      <div className="p-8 rounded-2xl bg-[#0B0717] border border-white/10 flex flex-col gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F5FF]/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00F5FF] mb-1">
            START A CONVERSATION
          </div>
          <h3 className="text-xl font-bold text-white leading-snug">
            Direct Engineering Channels
          </h3>
          <p className="text-xs text-[#9290A3] mt-2 leading-relaxed">
            Tell us about your idea, business challenge, or digital product. We review every project inquiry with its business goals and technical requirements in mind.
          </p>
        </div>

        {/* Email Direct Channel with Copy Button */}
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#05030D] border border-white/10 hover:border-[#00F5FF]/30 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] shrink-0 mt-0.5">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#9290A3]">
              Direct Inquiry Mailbox
            </div>
            <a
              href={`mailto:${companyData.contactEmail}`}
              className="text-sm font-mono text-white hover:text-[#00F5FF] truncate block transition-colors mt-0.5"
            >
              {companyData.contactEmail}
            </a>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy direct email address"
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#9290A3] hover:text-white transition-all flex items-center gap-1 shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#00F5FF]" />
                <span className="text-[11px] text-[#00F5FF] font-mono">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[11px] font-mono">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Geographic Base Card */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#8B2CFF]/15 border border-[#8B2CFF]/30 flex items-center justify-center text-[#B026FF] shrink-0">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#9290A3]">
              Delivery Model
            </div>
            <div className="text-sm font-medium text-white mt-0.5">
              {companyData.locationDisplay}
            </div>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="flex items-start gap-3.5 pt-2 border-t border-white/10">
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#00F5FF]" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#9290A3]">
              Strict Confidentiality
            </div>
            <div className="text-xs text-[#9290A3] leading-relaxed mt-0.5">
              Direct engineering discussion under strict non-disclosure standards. Your proprietary idea and business logic are respected.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Box: 3-Step Process Flow */}
      <div className="p-8 rounded-2xl bg-[#080512] border border-white/10 relative overflow-hidden shadow-xl">
        <div className="text-xs font-mono uppercase tracking-widest text-[#00F5FF] mb-4">
          HOW WE ENGAGE
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-3.5">
              <div className="text-xs font-mono font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 text-[#00F5FF] shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-[#9290A3] leading-relaxed mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
