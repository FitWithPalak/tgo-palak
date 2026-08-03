import { NextRequest, NextResponse } from "next/server";
import { pricing, brand } from "@/lib/config";
import { sendAddToCartEvent } from "@/lib/meta-events";

// Note: `pricing` is still imported only for its test-mode gate (trackingEnabled);
// no value/currency is sent — this is a free funnel.

// AddToCart CAPI — fired by a landing CTA click (browser beacon). Independent
// of the Razorpay webhook. Gated by the same test-mode flag as the webhook.
export async function POST(req: NextRequest) {
  try {
    // Test-mode gate (PRICE_INR=1) — no side effects on staging/preview.
    if (!pricing.trackingEnabled) {
      return NextResponse.json({ ok: true, skipped: "test_mode" });
    }
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (!pixelId || !accessToken) {
      return NextResponse.json({ ok: true, skipped: "env_missing" });
    }

    const body = await req.json().catch(() => ({}));
    const eventSourceUrl =
      typeof body?.eventSourceUrl === "string" ? body.eventSourceUrl : brand.checkoutUrl;

    const fbc = req.cookies.get("_fbc")?.value || undefined;
    const fbp = req.cookies.get("_fbp")?.value || undefined;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = req.headers.get("user-agent") || undefined;

    try {
      await sendAddToCartEvent({
        pixelId,
        accessToken,
        fbc,
        fbp,
        clientIp,
        clientUserAgent,
        eventSourceUrl,
      });
      console.log("[atc] sent");
      return NextResponse.json({ ok: true, capi: "sent" });
    } catch (err) {
      console.error("[atc] Meta error:", err);
      return NextResponse.json({ ok: true, capi: "error" });
    }
  } catch (err) {
    console.error("[atc] fatal:", err);
    return NextResponse.json({ ok: true, capi: "error" });
  }
}
