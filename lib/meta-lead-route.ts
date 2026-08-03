import { NextRequest, NextResponse } from "next/server";
import { pricing, brand } from "@/lib/config";
import { sendLeadEvent, countryFromDial, fbcFromFbclid } from "@/lib/meta-events";

// Shared handler behind the three free-funnel lead routes:
//   /api/meta/complete-registration -> CompleteRegistration (standard)
//   /api/meta/qualified-lead        -> QualifiedLead        (custom)
//   /api/meta/schedule              -> Schedule             (standard)
//
// The browser has already de-duped (once per browser) before it reaches here;
// this route hashes the PII the browser posted and forwards to the CAPI. Cookies
// (_fbc/_fbp), IP and UA are read server-side; fbc is reconstructed from fbclid
// when the cookie is missing, all to lift EMQ. Never throws into the funnel.

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export async function handleLeadEvent(
  req: NextRequest,
  eventName: string,
  salt: string
): Promise<NextResponse> {
  try {
    // Same test-mode gate as the other CAPI routes (PRICE_INR=1 on preview).
    if (!pricing.trackingEnabled) {
      return NextResponse.json({ ok: true, skipped: "test_mode" });
    }
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (!pixelId || !accessToken) {
      return NextResponse.json({ ok: true, skipped: "env_missing" });
    }

    const body = await req.json().catch(() => ({}));
    const name = str(body?.name);
    const email = str(body?.email);
    const dialCode = /^\+\d{1,4}$/.test(str(body?.dialCode)) ? str(body?.dialCode) : "+91";
    // `whatsapp` already carries the dial code; `phone` is a bare-digits fallback.
    const phone = str(body?.whatsapp) || `${dialCode}${str(body?.phone)}`;
    const fbclid = str(body?.fbclid);
    const eventSourceUrl = str(body?.eventSourceUrl) || brand.siteUrl;

    const fbc = req.cookies.get("_fbc")?.value || fbcFromFbclid(fbclid);
    const fbp = req.cookies.get("_fbp")?.value || undefined;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = req.headers.get("user-agent") || undefined;

    await sendLeadEvent({
      pixelId,
      accessToken,
      eventName,
      eventIdSalt: salt,
      email,
      phone,
      firstName: name,
      countryCode: countryFromDial(dialCode),
      fbc,
      fbp,
      clientIp,
      clientUserAgent,
      eventSourceUrl,
    });
    console.log(`[meta ${eventName}] sent`);
    return NextResponse.json({ ok: true, capi: "sent" });
  } catch (err) {
    console.error(`[meta ${eventName}] error:`, err);
    return NextResponse.json({ ok: true, capi: "error" });
  }
}
