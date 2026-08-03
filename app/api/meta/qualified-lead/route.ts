import { NextRequest } from "next/server";
import { handleLeadEvent } from "@/lib/meta-lead-route";

// QualifiedLead (custom event) — fired once per browser ONLY when the answer to
// Q7 is "Yes, I am ready to invest and take action." (in addition to
// CompleteRegistration). Register a custom conversion on this to optimise ads.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleLeadEvent(req, "QualifiedLead", "ql");
}
