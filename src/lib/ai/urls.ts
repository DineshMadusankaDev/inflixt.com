/**
 * Centralized URL sanitizer and normalizer for Inflixt AI chat, cards, and navigation.
 * Guarantees that internal navigation NEVER emits or renders localhost, 127.0.0.1, or port 3000 URLs.
 * Always resolves internal routes to clean relative paths (e.g., /contact, /work, /services).
 */
export function toSafeInternalHref(rawHref: unknown): string {
  if (typeof rawHref !== "string" || !rawHref.trim()) {
    return "/contact";
  }

  let href = rawHref.trim();

  // Strip localhost, 127.0.0.1, 0.0.0.0, and any associated ports
  // Handles http://localhost:3000/contact, https://localhost:3000/work, 127.0.0.1:3000/..., etc.
  href = href.replace(/^https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?/i, "");
  href = href.replace(/^(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?/i, "");

  // Strip absolute production origin if present to keep internal navigation purely relative
  href = href.replace(/^https?:\/\/(?:www\.)?inflixt\.com/i, "");

  // If stripped completely down to empty string or trailing slash only
  if (!href || href === "" || href === "/") {
    return "/";
  }

  // If it is a legitimate external URL (e.g. GitHub, client live site, mailto, tel)
  if (/^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    // If it secretly pointed to localhost, block it and redirect safely to /contact
    if (/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(href)) {
      return "/contact";
    }
    return href;
  }

  // Ensure relative paths start with a leading slash
  if (!href.startsWith("/")) {
    href = `/${href}`;
  }

  // Clean duplicate slashes at the start (e.g. //contact -> /contact)
  href = href.replace(/^\/+/, "/");

  return href;
}
