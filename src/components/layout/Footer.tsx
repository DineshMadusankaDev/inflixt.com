import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { companyData } from "@/data/company";
import { footerServices, footerCompany, footerLegal } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#05030D] text-[#9290A3] relative overflow-hidden">
      {/* Subtle bottom atmospheric purple glow */}
      <div className="absolute bottom-0 right-[15%] w-[450px] h-[250px] rounded-full bg-[#8B2CFF]/10 blur-[120px] pointer-events-none animate-ambient-purple" />

      <Container className="pt-16 pb-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="mb-4 inline-block" aria-label="Inflixt Global">
              <Image
                src="/brand/inflixt-logo.png"
                alt="Inflixt Global"
                width={776}
                height={311}
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#E7E5EE] font-medium mb-2">
              {companyData.tagline}
            </p>
            <p className="text-sm text-[#9290A3] leading-relaxed mb-6 max-w-sm">
              {companyData.supportingPositioning}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9290A3] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
              Location: {companyData.location}
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerCompany.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels / Coordinates */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-xs text-[#9290A3]">
                Direct project inquiries and global partner engagements:
              </p>
              <a
                href={`mailto:${companyData.contactEmail}`}
                className="text-white hover:text-[#00F5FF] transition-colors font-mono text-sm block"
              >
                {companyData.contactEmail}
              </a>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs text-[#00F5FF] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Start a Project Inquiry →
                </Link>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9290A3]">
          <div>
            © {currentYear} {companyData.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {footerLegal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
