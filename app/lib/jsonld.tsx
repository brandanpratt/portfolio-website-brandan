import { SITE_URL, site } from "@/app/data/site";
import { services } from "@/app/data/services";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const personId = `${SITE_URL}/#person`;
export const businessId = `${SITE_URL}/#business`;

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: SITE_URL,
      jobTitle: site.title,
      description: site.description,
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Nassau", addressCountry: "BS" },
      sameAs: Object.values(site.links),
      knowsAbout: [
        "Artificial Intelligence",
        "AI Agents",
        "Business Process Automation",
        "Large Language Models",
        "Full-Stack Web Development",
        "Next.js",
        "React",
        "Laravel",
        "Data Engineering",
        "Snowflake",
        "Digital Transformation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: `${site.name} — AI Consulting & Development`,
      url: SITE_URL,
      founder: { "@id": personId },
      description: site.description,
      image: `${SITE_URL}/opengraph-image`,
      areaServed: [
        { "@type": "Country", name: "The Bahamas" },
        { "@type": "Place", name: "Caribbean" },
        { "@type": "Place", name: "Worldwide" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Nassau", addressCountry: "BS" },
      paymentAccepted: "Bank transfer, Credit card, Cryptocurrency",
      currenciesAccepted: "USD, BSD, USDC, BTC, ETH",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.summary },
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: Number(s.startingAt.replace(/[^0-9.]/g, "")),
            priceCurrency: "USD",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      publisher: { "@id": personId },
    },
  ],
};
