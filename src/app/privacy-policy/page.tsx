import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Inflixt",
  description: "Privacy policy and data governance practices for Inflixt Global PVT LTD.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 relative">
      <Container size="narrow">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00F5FF]">
            LEGAL & GOVERNANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#9290A3]">
            Last Updated: 2026 · {companyData.legalName}
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#E7E5EE] leading-relaxed border-t border-white/10 pt-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
            <p className="text-[#9290A3]">
              When you submit an inquiry through our contact channels or request a project quotation, we collect standard business contact details including your name, email address, company name, and project requirements. We do not sell, rent, or trade personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. How We Use Information</h2>
            <p className="text-[#9290A3]">
              Information collected is used strictly to evaluate your project scope, prepare engineering proposals, communicate technical updates, and manage our business relationship with your organization.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Data Security & Storage</h2>
            <p className="text-[#9290A3]">
              We implement industry-standard encryption, strict access controls, and secure communication channels to protect all client materials, project scopes, and correspondence from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Cookies & Analytics</h2>
            <p className="text-[#9290A3]">
              This website uses standard, non-invasive session cookies strictly to ensure reliable edge delivery and anonymous performance monitoring. We do not use intrusive cross-site tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Contact Regarding Privacy</h2>
            <p className="text-[#9290A3]">
              If you have any questions regarding this Privacy Policy or wish to request data removal, please contact our legal operations team directly at{" "}
              <a href={`mailto:${companyData.contactEmail}`} className="text-[#00F5FF] underline">
                {companyData.contactEmail}
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
