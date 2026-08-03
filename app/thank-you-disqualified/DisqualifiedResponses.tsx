"use client";

// Reads the answers the visitor just gave (sessionStorage, written by
// QualifierForm) and quotes each one back under the criterion it maps to.
//
// Arriving here is a client-side router.push from the form, so the answers are
// in place on mount and there is no visible delay. On a hard reload or a direct
// visit there is nothing stored — that renders an honest "not recorded" state
// plus a way back to the form, never a blank row.

import { useEffect, useState } from "react";
import { CRITERIA, loadAnswers, QUALIFIER_PATH, type Answers } from "@/lib/qualifier";

type Phase = { status: "loading" } | { status: "ready"; answers: Answers | null };

export default function DisqualifiedResponses() {
  const [phase, setPhase] = useState<Phase>({ status: "loading" });

  useEffect(() => {
    setPhase({ status: "ready", answers: loadAnswers() });
  }, []);

  const answers = phase.status === "ready" ? phase.answers : null;
  const name = answers?.name?.trim();

  return (
    <div className="pk-dq-criteria">
      <div className="pk-dq-criteria-head">
        <span className="pk-dq-criteria-lbl">
          {name ? <>{name}&rsquo;s application</> : <>Your application</>}
        </span>
        <p className="pk-dq-criteria-sub">
          To make sure every clarity call is genuinely useful, we only book calls for women who
          meet all 3 of these:
        </p>
      </div>

      <ol className="pk-dq-list">
        {CRITERIA.map((c) => {
          const response = answers?.[c.from]?.trim();
          const met = answers ? c.met(answers) : null;
          return (
            <li
              className="pk-dq-item"
              key={c.n}
              data-met={met === null ? undefined : met ? "1" : "0"}
            >
              <div className="pk-dq-item-head">
                <span className="pk-dq-num" aria-hidden="true">{c.n}</span>
                <p className="pk-dq-crit">{c.text}</p>
                {met !== null && (
                  <span
                    className="pk-dq-flag"
                    aria-label={met ? "You met this criterion" : "You did not meet this criterion"}
                  >
                    {met ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4 4 10-10.5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 7l10 10M17 7L7 17" />
                      </svg>
                    )}
                  </span>
                )}
              </div>

              <div className="pk-dq-resp">
                <span className="pk-dq-resp-lbl">
                  {name ? <>{name} answered</> : <>Your response</>}
                </span>

                {phase.status === "loading" ? (
                  <span className="pk-dq-resp-skel" aria-hidden="true" />
                ) : response ? (
                  <span className="pk-dq-resp-val">
                    <svg className="quo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9.6 5.5C6.5 6.9 4.6 9.6 4.6 12.8c0 3.2 1.9 5.4 4.4 5.4 2.1 0 3.7-1.5 3.7-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.8.1-1 .2.3-1.6 1.7-3.2 3.5-4.1zm9.3 0c-3.1 1.4-5 4.1-5 7.3 0 3.2 1.9 5.4 4.4 5.4 2.1 0 3.7-1.5 3.7-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.8.1-1 .2.3-1.6 1.7-3.2 3.5-4.1z" />
                    </svg>
                    {response}
                  </span>
                ) : (
                  <span className="pk-dq-resp-val pk-dq-resp-val--none">Not recorded</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="pk-dq-verdict">You didn&rsquo;t meet one or more of these criteria.</p>

      {phase.status === "ready" && !answers && (
        <p className="pk-dq-lost">
          We could not load your answers on this device.{" "}
          <a href={QUALIFIER_PATH}>Fill the form again</a> to see exactly which criterion you
          missed.
        </p>
      )}
    </div>
  );
}
