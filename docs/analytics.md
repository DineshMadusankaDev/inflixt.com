# Analytics & Conversion Tracking Architecture — Phase 14: GA4

## Overview

Inflixt Global uses a vendor-neutral, privacy-first event tracking architecture connected to Google Analytics 4 (GA4). All application components dispatch high-level events through a single abstraction (`trackAiEvent`), keeping user interactions decoupled from specific analytics providers.

## GA4 Property Configuration

| Property Attribute | Configuration Details |
| :--- | :--- |
| **Provider** | Google Analytics 4 (gtag.js) |
| **GA4 Property Name** | Inflixt |
| **GA4 Measurement ID** | `G-1R6MHT5778` |
| **Web Data Stream** | Inflixt Global Website |
| **Website URL** | `https://inflixt.com` |
| **Enhanced Measurement** | ON (Page views, Scrolls, Outbound clicks, Site search, Form interactions) |
| **Environment Variable** | `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-1R6MHT5778` |

## Architecture & Data Flow

```
User Interaction / Form / AI Flow
              ↓
  Inflixt Application Component
              ↓
      trackAiEvent(event, params)
              ↓
      Privacy Whitelist Sanitizer
       (Drops all non-whitelisted keys)
              ↓
      GA4 window.gtag("event", ...)
              ↓
      Google Analytics 4
```

1. **Vendor-Neutral Dispatcher**: Components interact exclusively with `trackAiEvent(...)` located in `src/lib/analytics/events.ts`.
2. **Provider Behind Abstraction**: GA4 receives events through `window.gtag("event", ...)`. No direct `gtag()` calls exist inside UI components.
3. **Non-Blocking Resilience**: Analytics failures, blocked network requests, adblockers, or missing `window.gtag` instances are caught silently. Analytics operations can never disrupt Gemini AI streaming, form submissions, page navigation, or user experience.

## Strict Privacy Boundary

No Personally Identifiable Information (PII) or conversation content is ever collected or dispatched to Google Analytics.

### Explicitly Excluded (Blocked by Filter):
- User chat messages and prompt inputs
- AI responses and streamed outputs
- Visitor names, email addresses, phone numbers, and company names
- Lead form text inputs, custom descriptions, and budget entries
- Conversation transcripts and session IDs

### Whitelisted Event Parameters:
Only four categorical, enumerated parameters are permitted through the whitelist filter:
- `service`: Categorical service taxonomy (`web_development`, `mobile_app_development`, `custom_software`, `ai_automation`, `ecommerce`, `seo`)
- `project`: Categorical project identifier (`fair_comment`, `studio_2020`, `inflixt_global`)
- `intent`: Categorical intent classification (`website`, `mobile_app`, `custom_software`, `ai_automation`, `ecommerce`, `seo`, `general_project`)
- `status`: Lead confirmation state (`shown`, `confirmed`, `declined`)

## Event Taxonomy

All custom event names follow GA4 naming rules (alphanumeric with underscores, starting with a letter, $\le$ 40 characters):

| Event Name | Description | Controlled Parameters |
| :--- | :--- | :--- |
| `ai_chat_opened` | Visitor opened the AI chat widget drawer | None |
| `ai_first_message` | Visitor sent their first message in the session | None |
| `ai_conversation_started` | AI generated its first response to the user | None |
| `ai_project_intent` | User project intent detected from inquiry | `{ intent: AiIntent }` |
| `ai_service_identified` | Target service detected from inquiry/context | `{ service: AiService }` |
| `ai_portfolio_viewed` | Visitor clicked a portfolio case study card in chat | `{ project: AiProject }` |
| `ai_lead_confirmation` | Interactive lead inquiry card state change | `{ status: LeadConfirmationStatus }` |
| `ai_lead_submitted` | Lead submission successfully finalized in AI chat | None |
| `ai_chat_closed` | Visitor closed the AI chat widget | None |
| `ai_contact_cta_clicked` | Visitor clicked a contact/get started CTA in chat | None |
| `contact_form_submitted` | Visitor submitted the main contact page inquiry form | None |

## Recommended GA4 Key Events (Conversions)

To track conversions in GA4 reports and attribution funnels, configure the following events as **Key Events** in the Google Analytics Admin UI:

### Primary Conversions (Mark as Key Events in GA4 Admin):
1. `ai_lead_submitted` — Lead completed through the AI assistant funnel
2. `contact_form_submitted` — Lead completed through the primary contact form

### Supporting Funnel Steps:
- `ai_chat_opened`
- `ai_first_message`
- `ai_project_intent`
- `ai_service_identified`
- `ai_portfolio_viewed`
- `ai_lead_confirmation`
- `ai_contact_cta_clicked`

### GA4 UI Setup Instructions for Key Events:
1. Navigate to **Google Analytics** > **Admin** (gear icon)
2. Under **Data display**, select **Key events**
3. Click **New key event**
4. Enter `ai_lead_submitted` and click **Save**
5. Click **New key event** again, enter `contact_form_submitted` and click **Save**

## Pageview Measurement Strategy

- **Implementation**: The Google tag (`gtag.js`) is injected once at the root layout (`src/app/layout.tsx`) using Next.js `next/script` with `strategy="afterInteractive"`.
- **Automatic SPA Tracking**: GA4 Enhanced Measurement is configured with "Page views → Page changes based on browser history events" set to ON.
- **Zero Duplication**: The application does **not** emit manual `page_view` events, preventing duplicate hits during client-side App Router navigations.
