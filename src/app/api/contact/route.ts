import { NextRequest, NextResponse } from "next/server";
import {
  validateInquiryPayload,
  dispatchInquiry,
} from "@/lib/contact/inquiry-service";

// Basic in-memory rate limiting / throttling (sliding window)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up expired IP entries every 15 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000).unref?.();

export async function POST(req: NextRequest) {
  try {
    // 1. Basic IP throttling
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";

    const now = Date.now();
    const clientLimit = rateLimitMap.get(ip);

    if (clientLimit && now < clientLimit.resetAt) {
      if (clientLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error:
              "Too many inquiries submitted from this connection. Please wait a few minutes or reach out directly to dinesh@inflixtglobal.com.",
          },
          { status: 429 }
        );
      }
      clientLimit.count += 1;
    } else {
      rateLimitMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse payload safely
    let rawBody: Record<string, unknown>;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check (anti-bot)
    if (rawBody._hp && typeof rawBody._hp === "string" && rawBody._hp.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // 4. Sanitize and validate inputs via shared service
    const validation = validateInquiryPayload({
      ...rawBody,
      source: "contact_form",
    });

    if (!validation.isValid || !validation.sanitized) {
      return NextResponse.json(
        {
          error: "Validation failed. Please check the required fields.",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // 5. Dispatch inquiry
    const result = await dispatchInquiry(validation.sanitized, ip);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to dispatch inquiry." },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      simulated: result.simulated,
      message: result.message,
    });
  } catch (error) {
    console.error("[CONTACT API UNEXPECTED ERROR]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your inquiry. Please contact dinesh@inflixtglobal.com directly.",
      },
      { status: 500 }
    );
  }
}
