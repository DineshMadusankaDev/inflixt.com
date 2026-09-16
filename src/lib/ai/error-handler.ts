/**
 * Server-side error classification and diagnostics for Gemini API calls.
 * Sanitizes all output to guarantee ZERO exposure of API keys, Google JSON internals,
 * stack traces, quota numbers, or localhost URLs to visitors.
 */

export type GeminiErrorCategory =
  | "AUTH_ERROR"        // 401, 403: Invalid API key or permission denied
  | "RATE_LIMIT"         // 429: Free tier quota exceeded or rate limit hit
  | "MODEL_UNAVAILABLE"  // 503: High demand or temporary model unavailability
  | "NETWORK_TIMEOUT"    // Connectivity failure, network timeout, socket error
  | "INVALID_MODEL"      // 404: Model not found or configuration mismatch
  | "UNKNOWN";

export interface ClassifiedGeminiError {
  category: GeminiErrorCategory;
  statusCode?: number;
  technicalDetails: string;
  isRetryable: boolean;
  publicMessage: string;
}

/**
 * Sanitizes any string to remove API keys, localhost URLs, and file paths.
 */
export function sanitizeDiagnostics(text: string): string {
  if (!text) return "";
  return text
    // Redact Gemini API keys (standard AIza... and AQ.... keys)
    .replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED_API_KEY]")
    .replace(/AQ\.[0-9A-Za-z-_]{20,}/g, "[REDACTED_API_KEY]")
    // Eradicate any localhost / IP references
    .replace(/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/gi, "[LOCAL_ORIGIN]")
    // Redact absolute local filesystem paths
    .replace(/[A-Za-z]:\\[^"'\n\r]+/g, "[SERVER_PATH]");
}

/**
 * Classifies a raw error caught from Google GenAI SDK.
 */
export function classifyGeminiError(err: unknown): ClassifiedGeminiError {
  let statusCode: number | undefined;
  let rawMessage = "";

  if (err && typeof err === "object") {
    if ("status" in err && typeof (err as { status: unknown }).status === "number") {
      statusCode = (err as { status: number }).status;
    } else if ("statusCode" in err && typeof (err as { statusCode: unknown }).statusCode === "number") {
      statusCode = (err as { statusCode: number }).statusCode;
    }

    if ("message" in err && typeof (err as { message: unknown }).message === "string") {
      rawMessage = (err as { message: string }).message;
    }
  } else if (typeof err === "string") {
    rawMessage = err;
  }

  const cleanMessage = sanitizeDiagnostics(rawMessage);
  const lower = cleanMessage.toLowerCase();

  // 1. Authentication or Permission Problem (401, 403)
  if (
    statusCode === 401 ||
    statusCode === 403 ||
    lower.includes("permission_denied") ||
    lower.includes("unauthenticated") ||
    lower.includes("api_key_invalid") ||
    lower.includes("api key not valid")
  ) {
    return {
      category: "AUTH_ERROR",
      statusCode: statusCode || 403,
      technicalDetails: cleanMessage || "Authentication failed with Gemini API.",
      isRetryable: false,
      publicMessage:
        "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
    };
  }

  // 2. Quota or Rate-Limit Problem (429)
  if (
    statusCode === 429 ||
    lower.includes("resource_exhausted") ||
    lower.includes("quota exceeded") ||
    lower.includes("rate limit") ||
    lower.includes("generaterequestsperday") ||
    lower.includes("generaterequestsperminute")
  ) {
    return {
      category: "RATE_LIMIT",
      statusCode: statusCode || 429,
      technicalDetails: cleanMessage || "Gemini Free-Tier quota or rate limit exceeded.",
      isRetryable: true,
      publicMessage:
        "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
    };
  }

  // 3. Model High Demand or Temporary Availability Problem (503)
  if (
    statusCode === 503 ||
    lower.includes("unavailable") ||
    lower.includes("high demand") ||
    lower.includes("overloaded") ||
    lower.includes("no capacity") ||
    lower.includes("capacity available") ||
    lower.includes("service temporarily unavailable")
  ) {
    return {
      category: "MODEL_UNAVAILABLE",
      statusCode: statusCode || 503,
      technicalDetails: cleanMessage || "Gemini model is temporarily experiencing high demand.",
      isRetryable: true,
      publicMessage:
        "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
    };
  }

  // 4. Invalid Model Configuration Problem (404)
  if (
    statusCode === 404 ||
    lower.includes("not found") ||
    lower.includes("is not supported") ||
    lower.includes("invalid model")
  ) {
    return {
      category: "INVALID_MODEL",
      statusCode: statusCode || 404,
      technicalDetails: cleanMessage || "Configured Gemini model not found or unsupported.",
      isRetryable: false,
      publicMessage:
        "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
    };
  }

  // 5. Connectivity or Network Timeout Problem
  if (
    lower.includes("timeout") ||
    lower.includes("etimedout") ||
    lower.includes("econnrefused") ||
    lower.includes("econnreset") ||
    lower.includes("fetch failed") ||
    lower.includes("network error") ||
    lower.includes("aborterror")
  ) {
    return {
      category: "NETWORK_TIMEOUT",
      statusCode: statusCode || 504,
      technicalDetails: cleanMessage || "Network connection to Google Gemini timed out.",
      isRetryable: true,
      publicMessage:
        "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
    };
  }

  // 6. Unknown / Unclassified Error
  return {
    category: "UNKNOWN",
    statusCode: statusCode || 500,
    technicalDetails: cleanMessage || "Unexpected runtime error during Gemini execution.",
    isRetryable: false,
    publicMessage:
      "I'm unable to connect to Inflixt AI at the moment. You can still explore our services and case studies, or send us your project details directly.",
  };
}
