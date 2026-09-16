import { NextRequest, NextResponse } from "next/server";
import {
  validateInquiryPayload,
  dispatchInquiry,
} from "@/lib/contact/inquiry-service";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up expired entries every 15 minutes
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

    let rawBody: Record<string, unknown>;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const validation = validateInquiryPayload({
      ...rawBody,
      source: "ai_chat",
    });

    if (!validation.isValid || !validation.sanitized) {
      return NextResponse.json(
        {
          error: "Validation failed. Please verify the inquiry details.",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

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
      message:
        result.message ||
        "Your project inquiry has been received. The Inflixt team will review your requirements and reach out within 24 hours.",
    });
  } catch (error) {
    console.error("[AI LEAD API ERROR]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while submitting your inquiry. Please reach out to dinesh@inflixtglobal.com.",
      },
      { status: 500 }
    );
  }
}
