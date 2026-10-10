import { NextRequest, NextResponse } from "next/server";
import { pricing, brand } from "@/lib/config";
import { sendScheduleEvent, countryFromDial, fbcFromFbclid } from "@/lib/meta-events";

// Schedule CAPI. The browser posts only the Calendly invitee URI it received in
// the `calendly.event_scheduled` message. We never trust anything else from the
// browser: the invitee's name / email / phone are read from Calendly's API with
// our own token (so a fake or replayed request cannot invent a booking), then
// hashed and sent with the visitor's fbc / fbp / IP / UA from this same request.
// event_id = invitee uuid, matching the browser Pixel's eventID for de-dupe.
export const runtime = "nodejs";

const INVITEE_URI = /^https:\/\/api\.calendly\.com\/scheduled_events\/[\w-]+\/invitees\/[\w-]+$/;
const MAX_AGE_MS = 15 * 60 * 1000;
const TZ_COUNTRY: Record<string, string> = { "Asia/Kolkata": "IN", "Asia/Calcutta": "IN" };

/* eslint-disable @typescript-eslint/no-explicit-any */
function resolvePhone(p: any): { phone: string; country: string } {
  let raw: string = p.text_reminder_number || "";
  if (!raw && Array.isArray(p.questions_and_answers)) {
    const qa = p.questions_and_answers.find((x: any) =>
      /phone|whatsapp|mobile|number/i.test(String(x?.question ?? ""))
    );
    raw = qa?.answer ?? "";
  }
  let digits = raw.replace(/\D/g, "");
  const tzCountry = TZ_COUNTRY[p.timezone ?? ""] ?? "";
  let country = "";
  if (raw.trim().startsWith("+")) {
    for (const n of [4, 3, 2, 1]) {
      country = countryFromDial(`+${digits.slice(0, n)}`);
      if (country) break;
    }
  } else if (digits.length === 10 && tzCountry === "IN") {
    digits = `91${digits}`;
    country = "IN";
  }
  return { phone: digits, country: country || tzCountry };
}

export async function POST(req: NextRequest) {
  try {
    if (!pricing.trackingEnabled) return NextResponse.json({ ok: true, skipped: "test_mode" });
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const calendlyToken = process.env.CALENDLY_API_TOKEN;
    if (!pixelId || !accessToken || !calendlyToken) {
      console.error("[schedule] env missing (META_PIXEL_ID / META_CAPI_ACCESS_TOKEN / CALENDLY_API_TOKEN)");
      return NextResponse.json({ ok: true, skipped: "env_missing" });
    }

    const body = await req.json().catch(() => ({}));
    const inviteeUri = typeof body?.inviteeUri === "string" ? body.inviteeUri : "";
    if (!INVITEE_URI.test(inviteeUri)) {
      return NextResponse.json({ ok: false, error: "bad_invitee" }, { status: 400 });
    }

    const res = await fetch(inviteeUri, {
      headers: { Authorization: `Bearer ${calendlyToken}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[schedule] Calendly lookup failed (${res.status})`);
      return NextResponse.json({ ok: true, capi: "lookup_failed" });
    }
    const p: any = (await res.json())?.resource ?? {};
    const created = Date.parse(p.created_at ?? "");
    if (p.status !== "active" || !p.email || !Number.isFinite(created) || Date.now() - created > MAX_AGE_MS) {
      return NextResponse.json({ ok: true, skipped: "not_fresh_active_booking" });
    }

    const full = String(p.name ?? "").trim();
    const firstName = p.first_name || full.split(/\s+/)[0] || "";
    const lastName = p.last_name || full.split(/\s+/).slice(1).join(" ");
    const { phone, country } = resolvePhone(p);

    const fbc = req.cookies.get("_fbc")?.value || fbcFromFbclid(String(body?.fbclid ?? ""));
    const fbp = req.cookies.get("_fbp")?.value || undefined;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || undefined;
    const clientUserAgent = req.headers.get("user-agent") || undefined;

    await sendScheduleEvent({
      pixelId,
      accessToken,
      eventId: inviteeUri.split("/").pop() as string,
      eventTime: Math.floor(created / 1000),
      email: String(p.email),
      phone,
      firstName,
      lastName,
      countryCode: country,
      fbc,
      fbp,
      clientIp,
      clientUserAgent,
      eventSourceUrl: `${brand.siteUrl}/book-a-call`,
    });
    console.log(`[schedule] sent ph=${phone ? "y" : "n"} fbp=${fbp ? "y" : "n"} fbc=${fbc ? "y" : "n"}`);
    return NextResponse.json({ ok: true, capi: "sent" });
  } catch (err) {
    console.error("[schedule] error:", err);
    return NextResponse.json({ ok: true, capi: "error" });
  }
}
