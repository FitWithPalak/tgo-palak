import type { Metadata } from "next";
import QualifierForm from "../QualifierForm";
import { TOTAL_STEPS } from "@/lib/qualifier";

export const metadata: Metadata = {
  title: "Priority Call Qualifier | FitWithPalak",
  description:
    "Answer a few short questions and we will show you the exact root cause behind your symptoms, and your path to feeling like yourself again.",
  robots: { index: false, follow: false },
};

/** Standalone home for the qualifier. On the landing page the CTAs open this
 *  same form as an overlay; this route is what a middle-click, a shared link,
 *  or a JS-off browser lands on, so the funnel never dead-ends. */
export default function ApplyPage() {
  return (
    <main className="pk-q-page">
      <div className="pk-q-page-inner">
        <div className="pk-q-shell-kicker">
          <span className="dot" aria-hidden="true" />
          Priority Call Qualifier &middot; {TOTAL_STEPS} short questions
        </div>
        <div className="pk-q-shell pk-q-shell--static">
          <QualifierForm />
        </div>
      </div>
    </main>
  );
}
