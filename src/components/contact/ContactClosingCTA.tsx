"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUp } from "lucide-react";

export function ContactClosingCTA() {
  const scrollToForm = () => {
    const formElement = document.getElementById("inquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      // Focus the first input field for accessibility
      const nameInput = document.getElementById("name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Dual ambient glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-gradient-to-r from-[#00F5FF]/10 via-[#8B2CFF]/12 to-[#00F5FF]/10 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />

      <Container>
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0B0717] via-[#080512] to-[#05030D] border border-white/15 p-8 sm:p-14 md:p-18 text-center overflow-hidden shadow-2xl">
          {/* Subtle top laser glow line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-60 animate-laser-sweep" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B2CFF] to-transparent opacity-60" />

          <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 px-3.5 py-1 rounded-full mb-6">
              LET&apos;S TALK
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              HAVE SOMETHING{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00F5FF] to-[#8B2CFF]">
                BIGGER IN MIND?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#9290A3] mb-8 leading-relaxed">
              Let&apos;s talk about what you&apos;re building.
            </p>

            <Button
              type="button"
              onClick={scrollToForm}
              size="lg"
              variant="primary"
              icon={<ArrowUp className="w-4 h-4" />}
            >
              Start a Project
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
