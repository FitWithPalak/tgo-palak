import { NextRequest, NextResponse } from "next/server";
import { brand } from "@/lib/config";
import {
  READY_YES,
  READY_NO,
  CONCERN_THYROID,
  CONCERN_OTHER,
  QUESTIONS,
  EMAIL_RE,
} from "@/lib/qualifier";

// Priority Call Qualifier -> Pabbly.
//
// Fires once per completed form, for BOTH branches (qualified and disqualified),
// so no name/number is ever lost — a disqualified lead is still a lead worth
// owning. Set PABBLY_LEAD_WEBHOOK_URL to the Pabbly Connect webhook URL; without
// it the route logs a warning and no-ops rather than failing the funnel.

export const runtime = "nodejs";

/** Answers arrive from the browser — never trust the strings, never trust the
 *  length. Choices are snapped back to the canonical option list. */
function pickChoice(raw: unknown, allowed: string[]): string {
  const v = typeof raw === "string" ? raw.trim() : "";
  return allowed.includes(v) ? v : "";
}

function clean(raw: unknown, max = 120): string {
  return typeof raw === "string" ? raw.trim().slice(0, max) : "";
}

const LOCATIONS = QUESTIONS.find((q) => q.id === "location")!.choices!;
const PROFESSIONS = QUESTIONS.find((q) => q.id === "profession")!.choices!;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = clean(body.name, 60);
  // Re-validated server-side: the client check is UX, not a guarantee.
  const emailRaw = clean(body.email, 254).toLowerCase();
  const email = EMAIL_RE.test(emailRaw) ? emailRaw : "";
  const dialCode = /^\+\d{1,4}$/.test(clean(body.dialCode, 5)) ? clean(body.dialCode, 5) : "";
  const phoneDigits = clean(body.whatsapp, 15).replace(/[^\d]/g, "");
  const location = pickChoice(body.location, LOCATIONS);
  const profession = pickChoice(body.profession, PROFESSIONS);
  const concern = pickChoice(body.concern, [CONCERN_THYROID, CONCERN_OTHER]);
  const readiness = pickChoice(body.readiness, [READY_YES, READY_NO]);

  // The server decides qualification from the answer, not from the client's claim.
  const qualified = readiness === READY_YES;

  if (!name || !email || !phoneDigits || !readiness) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 });
  }

  const utm = (body.utm ?? {}) as Record<string, string | undefined>;
  const now = new Date();

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "";
  const clientUserAgent = req.headers.get("user-agent") ?? "";

  const payload = {
    lead_type: "priority_call_qualifier",
    first_name: name,
    full_name: name,
    email,
    phone: `${dialCode}${phoneDigits}`,
    phone_digits: phoneDigits,
    dial_code: dialCode,
    whatsapp: `${dialCode}${phoneDigits}`,
    location,
    profession,
    health_concern: concern,
    readiness,
    qualified: qualified ? "true" : "false",
    status: qualified ? "qualified" : "disqualified",
    destination: qualified ? "/book-a-call" : "/thank-you-disqualified",
    submitted_date: now.toLocaleDateString("en-IN", { timeZone: brand.paymentTimezone }),
    submitted_time: now.toLocaleTimeString("en-IN", { timeZone: brand.paymentTimezone }),
    submitted_timestamp: now.toISOString(),
    utm_source: clean(utm.source, 120),
    utm_medium: clean(utm.medium, 120),
    utm_campaign: clean(utm.campaign, 120),
    utm_content: clean(utm.content, 120),
    utm_term: clean(utm.term, 120),
    fbclid: clean(body.fbclid, 255),
    fbc: req.cookies.get("_fbc")?.value ?? "",
    fbp: req.cookies.get("_fbp")?.value ?? "",
    client_ip_address: clientIp,
    client_user_agent: clientUserAgent,
    event_source_url: clean(body.eventSourceUrl, 500) || `${brand.siteUrl}/apply`,
  };

  const webhookUrl = process.env.PABBLY_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[lead] PABBLY_LEAD_WEBHOOK_URL not set — Pabbly skipped");
    return NextResponse.json({ ok: true, pabbly: "skipped", qualified });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`[lead] ${payload.status} Pabbly ${res.ok ? "sent" : "error"} (${res.status})`);
    return NextResponse.json({ ok: true, pabbly: res.ok ? "sent" : "error", qualified });
  } catch (err) {
    console.error("[lead] Pabbly error:", err);
    // The browser is already navigating — never surface this as a funnel failure.
    return NextResponse.json({ ok: true, pabbly: "error", qualified });
  }
}
