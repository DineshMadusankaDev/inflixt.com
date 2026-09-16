import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";
import { Building2, Calendar, CheckCircle2, FileText, Globe2, Scale, ShieldCheck } from "lucide-react";

export function CompanyCredentials() {
  const reg = companyData.registration;

  const credentials = [
    {
      label: "Legal Entity Name",
      value: reg.companyName,
      icon: Building2,
      highlight: true,
    },
    {
      label: "Company Registration Number",
      value: reg.registrationNumber,
      icon: FileText,
      highlight: true,
      isMono: true,
    },
    {
      label: "Corporate Classification",
      value: reg.entityType,
      icon: ShieldCheck,
      highlight: false,
    },
    {
      label: "Statutory Framework",
      value: reg.statutoryBasis,
      icon: Scale,
      highlight: false,
    },
    {
      label: "Date of Incorporation",
      value: reg.incorporationDate,
      icon: Calendar,
      highlight: false,
      isMono: true,
    },
    {
      label: "Statutory Jurisdiction",
      value: reg.jurisdiction,
      icon: Globe2,
      highlight: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#080512] border-y border-white/10 overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal>
            <Badge variant="cyan" hasBeacon={true} className="mb-4">
              VERIFIED LEGAL STANDING
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Institutional Governance &amp; Credentials
            </h2>
            <p className="text-base sm:text-lg text-[#9290A3] leading-relaxed">
              Inflixt Global operates with institutional seriousness, full corporate compliance, and verified statutory standing.
            </p>
          </ScrollReveal>
        </div>

        {/* Credentials Terminal Card */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl bg-[#0B0717] border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Top ambient laser accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/60 to-transparent" />

              {/* Header Bar inside Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#9290A3] mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-beacon" />
                    <span>CORPORATE RECORD // PUBLIC REGISTRY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {reg.companyName}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-xs font-mono text-[#00F5FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Duly Registered &amp; Active</span>
                </div>
              </div>

              {/* Structured Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {credentials.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.label}
                      className="p-5 rounded-xl bg-[#080512] border border-white/5 hover:border-white/15 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5 mb-2 text-xs font-mono text-[#9290A3]">
                        <Icon className="w-3.5 h-3.5 text-[#00F5FF]" />
                        <span>{c.label}</span>
                      </div>
                      <div
                        className={`text-sm sm:text-base font-semibold text-white ${
                          c.isMono ? "font-mono" : ""
                        } ${c.highlight ? "text-[#00F5FF]" : ""}`}
                      >
                        {c.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Compliance & Verification Footnote */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#9290A3]">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#8B2CFF]" />
                  <span>Statutory Authority: Department of the Registrar of Companies</span>
                </div>
                <div>
                  Verification Status: <span className="text-white font-medium">Verified Legal Entity</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
