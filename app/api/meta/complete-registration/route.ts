import { NextRequest } from "next/server";
import { handleLeadEvent } from "@/lib/meta-lead-route";

// CompleteRegistration (standard) — fired once per browser when a lead finishes
// the qualifier form, for BOTH branches (qualified and disqualified).
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleLeadEvent(req, "CompleteRegistration", "cr");
}
