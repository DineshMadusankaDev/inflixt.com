"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads the INFLIXT AI chat widget on the client side only.
 * Guarantees zero SSR penalty and zero initial LCP/CLS degradation.
 */
const DynamicAiWidget = dynamic(
  () => import("./InflixtAiWidget").then((mod) => mod.InflixtAiWidget),
  {
    ssr: false,
    loading: () => null,
  }
);

export function InflixtAiLoader() {
  return <DynamicAiWidget />;
}
