import { NextRequest } from "next/server";
import { handleLeadEvent } from "@/lib/meta-lead-route";

// Schedule (standard) — fired once per browser when Calendly reports
// `calendly.event_scheduled` on /book-a-call. The browser attaches the
// applicant's PII (saved by the qualifier in sessionStorage) so the event
// matches at high EMQ.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleLeadEvent(req, "Schedule", "sch");
}
