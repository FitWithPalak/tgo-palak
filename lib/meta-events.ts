import crypto from "crypto";
import { sha256 } from "./meta-capi";

// ============================================================================
// Meta CAPI — two upper-funnel intent events fired from their own API routes
// (independent of the Razorpay webhook that fires the "sales" conversion):
//   - AddToCart       -> landing CTA click   (fbc/fbp/IP/UA only; no PII yet)
//   - InitiateCheckout -> checkout pay click  (full hashed PII, EMQ 9+)
//
// Standard Meta event names are used because this dataset is NOT (yet) in a
// Meta restricted category. We still mirror the existing "sales" event's
// privacy posture: PHI-free custom_data (value + currency only, no product
// name that could hint at a health condition) and a host-only event_source_url.
// ============================================================================

const GRAPH_VERSION = "v25.0";
const URL_FALLBACK = "https://vsl.palaksachdeva.com";

/** Reduce any URL to its origin so no path/query reaches Meta. */
function toOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return URL_FALLBACK;
  }
}

async function postEvent(
  pixelId: string,
  accessToken: string,
  event: Record<string, unknown>
): Promise<void> {
  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
}

/** AddToCart — intent signal at CTA click. No PII available at this point, and
 *  no value/currency: this is a FREE funnel, so there is nothing to report. */
export async function sendAddToCartEvent(params: {
  pixelId: string;
  accessToken: string;
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
  eventSourceUrl: string;
}): Promise<void> {
  const eventId = params.fbp
    ? sha256(`${params.fbp}|atc`)
    : `${crypto.randomBytes(16).toString("hex")}_atc`;

  const event = {
    event_name: "AddToCart",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website" as const,
    event_source_url: toOrigin(params.eventSourceUrl),
    user_data: {
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
  };

  await postEvent(params.pixelId, params.accessToken, event);
}

// ----------------------------------------------------------------------------
// Free-funnel lead events (all via CAPI, on the free dataset):
//   CompleteRegistration (standard) · QualifiedLead (custom) · Schedule (standard)
// Each carries full hashed PII (em/ph/fn/country/external_id) for high EMQ, plus
// fbc/fbp/IP/UA. event_id is derived from the hashed email so Meta de-dupes the
// same user across browsers; the browser also guards once-per-browser before it
// ever calls the route. custom_data is omitted (PHI-free posture, and the lead
// funnel is free so there is no value to report).
// ----------------------------------------------------------------------------

/** Map a dial code to a 2-letter ISO country for the Meta `country` match key. */
const COUNTRY_BY_DIAL: Record<string, string> = {
  "+91": "IN", "+971": "AE", "+65": "SG", "+44": "GB", "+1": "US",
  "+61": "AU", "+60": "MY", "+64": "NZ", "+27": "ZA", "+966": "SA",
};
export function countryFromDial(dial: string): string {
  return COUNTRY_BY_DIAL[(dial ?? "").trim()] ?? "";
}

/** Reconstruct an fbc from a raw fbclid when the _fbc cookie is absent (EMQ). */
export function fbcFromFbclid(fbclid: string): string | undefined {
  const id = (fbclid ?? "").trim();
  return id ? `fb.1.${Date.now()}.${id}` : undefined;
}

export async function sendLeadEvent(params: {
  pixelId: string;
  accessToken: string;
  eventName: string; // "CompleteRegistration" | "Schedule" | "QualifiedLead"
  eventIdSalt: string; // "cr" | "sch" | "ql" — keeps the three event_ids distinct
  email: string;
  phone: string; // dial code + number, raw
  firstName: string;
  countryCode: string; // 2-letter ISO, may be ""
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
  eventSourceUrl: string;
}): Promise<void> {
  const normalisedEmail = params.email.trim().toLowerCase();
  const hashedEmail = normalisedEmail ? sha256(normalisedEmail) : undefined;
  const externalId = hashedEmail;

  const rawPhone = params.phone.replace(/\D/g, "");
  const hashedPhone = rawPhone ? sha256(rawPhone) : undefined;

  const fn = params.firstName.trim().toLowerCase();
  const country = params.countryCode.trim().toLowerCase();

  const event = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: hashedEmail
      ? sha256(`${normalisedEmail}|${params.eventIdSalt}`)
      : `${crypto.randomBytes(16).toString("hex")}_${params.eventIdSalt}`,
    action_source: "website" as const,
    event_source_url: toOrigin(params.eventSourceUrl),
    user_data: {
      ...(hashedEmail && { em: [hashedEmail] }),
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(fn && { fn: [sha256(fn)] }),
      ...(country && { country: [sha256(country)] }),
      ...(externalId && { external_id: [externalId] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
  };

  await postEvent(params.pixelId, params.accessToken, event);
}

/** InitiateCheckout — full hashed PII (same derivation as the sales event). */
export async function sendInitiateCheckoutEvent(params: {
  pixelId: string;
  accessToken: string;
  email: string;
  phone: string; // dial code + number, raw
  firstName: string;
  lastName: string;
  city: string;
  countryCode: string; // 2-letter ISO
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
  eventSourceUrl: string;
  value: number;
  currency: string;
}): Promise<void> {
  const normalisedEmail = params.email.trim().toLowerCase();
  const hashedEmail = normalisedEmail ? sha256(normalisedEmail) : undefined;
  const externalId = hashedEmail;

  const rawPhone = params.phone.replace(/\D/g, "");
  const hashedPhone = rawPhone ? sha256(rawPhone) : undefined;

  const fn = params.firstName.trim().toLowerCase();
  const ln = params.lastName.trim().toLowerCase();
  const ct = params.city.trim().toLowerCase().replace(/[^a-z]/g, "");
  const country = params.countryCode.trim().toLowerCase();

  const event = {
    event_name: "InitiateCheckout",
    event_time: Math.floor(Date.now() / 1000),
    event_id: hashedEmail
      ? sha256(`${normalisedEmail}|ic`)
      : `${crypto.randomBytes(16).toString("hex")}_ic`,
    action_source: "website" as const,
    event_source_url: toOrigin(params.eventSourceUrl),
    user_data: {
      ...(hashedEmail && { em: [hashedEmail] }),
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(fn && { fn: [sha256(fn)] }),
      ...(ln && { ln: [sha256(ln)] }),
      ...(ct && { ct: [sha256(ct)] }),
      ...(country && { country: [sha256(country)] }),
      ...(externalId && { external_id: [externalId] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
    custom_data: { currency: params.currency, value: params.value },
  };

  await postEvent(params.pixelId, params.accessToken, event);
}

// ----------------------------------------------------------------------------
// Schedule — fired from the Calendly `invitee.created` webhook (the source of
// truth for a booking). event_id is the Calendly invitee uuid, the same id the
// browser Pixel sends as eventID, so Meta de-dupes the two. user_data carries
// everything the invitee typed into Calendly plus the fbp/fbc/IP/UA the
// book-a-call page handed to Calendly through its utm params.
// ----------------------------------------------------------------------------
export async function sendScheduleEvent(params: {
  pixelId: string;
  accessToken: string;
  eventId: string; // Calendly invitee uuid
  eventTime: number; // unix seconds (booking time)
  email: string;
  phone: string; // digits incl. country code, may be ""
  firstName: string;
  lastName: string;
  countryCode: string; // 2-letter ISO, may be ""
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
  eventSourceUrl: string;
}): Promise<void> {
  const normalisedEmail = params.email.trim().toLowerCase();
  const hashedEmail = normalisedEmail ? sha256(normalisedEmail) : undefined;
  const rawPhone = params.phone.replace(/\D/g, "");
  const fn = params.firstName.trim().toLowerCase();
  const ln = params.lastName.trim().toLowerCase();
  const country = params.countryCode.trim().toLowerCase();

  const event = {
    event_name: "Schedule",
    event_time: params.eventTime,
    event_id: params.eventId,
    action_source: "website" as const,
    event_source_url: toOrigin(params.eventSourceUrl),
    user_data: {
      ...(hashedEmail && { em: [hashedEmail] }),
      ...(rawPhone && { ph: [sha256(rawPhone)] }),
      ...(fn && { fn: [sha256(fn)] }),
      ...(ln && { ln: [sha256(ln)] }),
      ...(country && { country: [sha256(country)] }),
      ...(hashedEmail && { external_id: [hashedEmail] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
  };

  await postEvent(params.pixelId, params.accessToken, event);
}
