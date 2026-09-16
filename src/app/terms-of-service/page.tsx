import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Service | Inflixt",
  description: "Terms of service and project engagement conditions for Inflixt Global PVT LTD.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24 relative">
      <Container size="narrow">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00F5FF]">
            LEGAL & GOVERNANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-[#9290A3]">
            Last Updated: 2026 · {companyData.legalName}
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#E7E5EE] leading-relaxed border-t border-white/10 pt-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p className="text-[#9290A3]">
              By accessing the website at https://inflixt.com or submitting inquiries for digital services, you agree to be bound by these terms of service, applicable laws, and regulations governing digital services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Intellectual Property Rights</h2>
            <p className="text-[#9290A3]">
              All original visual assets, brand marks, website designs, and custom software code created by Inflixt remain the intellectual property of Inflixt Global PVT LTD until formally transferred or licensed pursuant to a signed Master Services Agreement (MSA) or Statement of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Professional Engagements & Estimates</h2>
            <p className="text-[#9290A3]">
              Initial estimates and project scoping inquiries submitted through this website are non-binding. Binding agreements, milestones, deliverables, and service guarantees are executed under bespoke bilateral project agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p className="text-[#9290A3]">
              In no event shall Inflixt or its representatives be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the informational materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Governing Law</h2>
            <p className="text-[#9290A3]">
              These terms are governed by and construed in accordance with the laws applicable to {companyData.legalName}, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
