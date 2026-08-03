"use client";

// Fire a Meta CAPI event exactly once per browser. Mirrors the GA4
// once-per-browser pattern (lib/ga4.ts): stamp the localStorage flag BEFORE the
// network call so a navigation right after (a CTA click, a form submit) cannot
// double-fire, then POST to our own server route which hashes any PII and
// forwards to the Conversions API. sendBeacon is preferred so the request
// survives the imminent navigation. Never throws into a handler.

export function fireMetaEventOnce(
  flagKey: string,
  endpoint: string,
  body: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(flagKey) === "1") return;
    window.localStorage.setItem(flagKey, "1"); // optimistic — survives navigation
  } catch {
    /* private mode — best-effort, continue */
  }

  const payload = JSON.stringify({
    eventSourceUrl: window.location.href,
    ...body,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
      return;
    }
  } catch {
    /* fall through to fetch */
  }

  try {
    fetch(endpoint, {
      method: "POST",
      body: payload,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  } catch {
    /* tracking must never break the funnel */
  }
}
