import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { InflixtAiLoader } from "@/components/ai/InflixtAiLoader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inflixt.com"),
  title: {
    default: "Inflixt | AI-Powered Software Development & Digital Solutions",
    template: "%s | Inflixt",
  },
  description:
    "Inflixt builds AI-powered websites, mobile apps, custom software and digital solutions for growing businesses.",
  keywords: [
    "AI software development",
    "Next.js web development",
    "Mobile app development Flutter",
    "Custom software company",
    "AI automation solutions",
    "Digital solutions Sri Lanka",
    "Inflixt",
  ],
  authors: [{ name: "Inflixt Global PVT LTD" }],
  creator: "Inflixt Global PVT LTD",
  publisher: "Inflixt Global PVT LTD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inflixt.com",
    siteName: "Inflixt",
    title: "Inflixt | AI-Powered Software Development & Digital Solutions",
    description:
      "Inflixt builds AI-powered websites, mobile apps, custom software and digital solutions for growing businesses.",
    images: [
      {
        url: "/brand/inflixt-logo.png",
        width: 776,
        height: 311,
        alt: "Inflixt - Design. Develop. Dominate.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inflixt | AI-Powered Software Development & Digital Solutions",
    description:
      "Inflixt builds AI-powered websites, mobile apps, custom software and digital solutions for growing businesses.",
    images: ["/brand/inflixt-logo.png"],
  },
  alternates: {
    canonical: "https://inflixt.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05030D] text-[#E7E5EE] font-body selection:bg-[#00F5FF]/25 selection:text-white">
        {/* Google Analytics 4 (gtag.js) */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        <JsonLd />
        {/* 01. Fixed Header Navigation */}
        <Header />

        {/* Main Page Content */}
        <main className="flex-1">{children}</main>

        {/* 11. Master Footer */}
        <Footer />

        {/* 12. Floating INFLIXT AI Chat Experience */}
        <InflixtAiLoader />
      </body>
    </html>
  );
}
