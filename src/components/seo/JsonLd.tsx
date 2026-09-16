import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyData.registration.companyName,
    alternateName: companyData.brandName,
    url: companyData.url,
    logo: `${companyData.url}/brand/inflixt-logo.png`,
    description: companyData.corePositioning,
    slogan: companyData.tagline,
    email: companyData.contactEmail,
    foundingDate: "2025-11-25",
    identifier: companyData.registration.registrationNumber,
    founder: {
      "@type": "Person",
      name: companyData.founder.name,
      jobTitle: companyData.founder.title,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyData.brandName,
    url: companyData.url,
    description: companyData.corePositioning,
  };

  const serviceSchemas = servicesData.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: companyData.legalName,
    },
    description: service.shortDescription,
    url: `${companyData.url}/services#${service.id}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {serviceSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
