"use client";

// The step-wise Priority Call Qualifier. One question per screen, progress rail,
// keyboard-first. Rendered both inside the modal overlay (landing-page CTAs) and
// as a standalone page at /apply, so the two can never drift apart.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  QUESTIONS,
  TOTAL_STEPS,
  DIAL_CODES,
  validate,
  saveAnswers,
  destinationFor,
  isQualified,
  type Answers,
  type QuestionId,
} from "@/lib/qualifier";
import { restoreUtm, restoreFbclid } from "@/lib/tracking";
import { trackGa4EventOnce } from "@/lib/ga4";
import { fireMetaEventOnce } from "@/lib/meta-client";

/** Send the completed lead to Pabbly (server-side). Never blocks the redirect,
 *  never throws into the submit handler. */
function postLead(answers: Answers, qualified: boolean): void {
  const body = JSON.stringify({
    ...answers,
    qualified,
    utm: restoreUtm(),
    fbclid: restoreFbclid(),
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : "",
  });
  try {
    fetch("/api/lead", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  } catch {
    /* lead capture must never break the funnel */
  }
}

export default function QualifierForm({
  onClose,
  autoFocus = true,
}: {
  /** Rendered inside the modal — shows a close affordance. Omitted on /apply. */
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ dialCode: "+91" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [leaving, setLeaving] = useState<"fwd" | "back" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = QUESTIONS[index];
  const value = answers[q.id] ?? "";
  const progress = useMemo(
    () => Math.round(((index + (value ? 1 : 0)) / TOTAL_STEPS) * 100),
    [index, value]
  );

  useEffect(() => {
    trackGa4EventOnce("qualifier_start");
  }, []);

  // Focus the text field on every step change so the form is type-and-enter.
  useEffect(() => {
    if (!autoFocus) return;
    if (q.kind === "choice") return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => window.clearTimeout(t);
  }, [index, q.kind, autoFocus]);

  const finish = useCallback(
    (final: Answers) => {
      setSubmitting(true);
      saveAnswers(final);
      const qualified = isQualified(final);
      postLead(final, qualified);

      // CompleteRegistration for every completed form; QualifiedLead additionally
      // when Q7 = "Yes...". Both GA4 + Meta CAPI, each once per browser.
      trackGa4EventOnce("complete_registration");
      if (qualified) trackGa4EventOnce("qualified_lead");

      const metaBody = {
        name: final.name ?? "",
        email: final.email ?? "",
        whatsapp: `${final.dialCode ?? "+91"}${final.whatsapp ?? ""}`,
        dialCode: final.dialCode ?? "+91",
        fbclid: restoreFbclid(),
      };
      fireMetaEventOnce("fwp_meta_completeregistration", "/api/meta/complete-registration", metaBody);
      if (qualified) {
        fireMetaEventOnce("fwp_meta_qualifiedlead", "/api/meta/qualified-lead", metaBody);
      }

      router.push(destinationFor(final));
    },
    [router]
  );

  const advance = useCallback(
    (next: Answers, from: number) => {
      if (from >= TOTAL_STEPS - 1) {
        finish(next);
        return;
      }
      setLeaving("fwd");
      window.setTimeout(() => {
        setIndex(from + 1);
        setLeaving(null);
      }, 170);
    },
    [finish]
  );

  const set = (id: QuestionId, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    setError(null);
  };

  const onContinue = () => {
    if (submitting) return;
    const err = validate(q.id, value, answers.dialCode);
    if (err) {
      setError(err);
      inputRef.current?.focus();
      return;
    }
    advance(answers, index);
  };

  const onPick = (choice: string) => {
    if (submitting) return;
    const next = { ...answers, [q.id]: choice };
    setAnswers(next);
    setError(null);
    // Small beat so the selected state is visible before the screen turns.
    window.setTimeout(() => advance(next, index), 180);
  };

  const onBack = () => {
    if (index === 0 || submitting) return;
    setLeaving("back");
    window.setTimeout(() => {
      setIndex((i) => Math.max(0, i - 1));
      setLeaving(null);
      setError(null);
    }, 170);
  };

  return (
    <div className="pk-q" data-submitting={submitting ? "1" : undefined}>
      {/* ------------------------------------------------ HEAD + PROGRESS */}
      <div className="pk-q-head">
        <img className="pk-q-logo" src="/brand-logo.png" alt="FitWithPalak" />
        <div className="pk-q-headmeta">
          <span className="pk-q-count">
            Question <strong>{q.step}</strong> of {TOTAL_STEPS}
          </span>
          <span className="pk-q-time">Takes only 30 secs</span>
        </div>
        {onClose && (
          <button className="pk-q-close" type="button" onClick={onClose} aria-label="Close the form">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
        )}
      </div>

      <div
        className="pk-q-rail"
        role="progressbar"
        aria-valuenow={q.step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-label="Form progress"
      >
        <span className="pk-q-rail-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* --------------------------------------------------------- SCREEN */}
      <div className="pk-q-stage">
        <div className="pk-q-screen" key={q.id} data-leaving={leaving ?? undefined}>
          {index === 0 && (
            <p className="pk-q-intro">
              Fill out this quick form and we&rsquo;ll show you the exact root cause behind your
              symptoms, and your path to feeling like yourself again.
            </p>
          )}

          {q.lede && <p className="pk-q-lede">{q.lede}</p>}

          <h2 className="pk-q-title display">
            <span className="pk-q-num" aria-hidden="true">{q.step}</span>
            {q.title}
          </h2>
          {q.help && <p className="pk-q-help">{q.help}</p>}

          {q.kind === "choice" ? (
            <div className="pk-q-choices" role="radiogroup" aria-label={q.title}>
              {q.choices!.map((choice, i) => {
                const on = value === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className="pk-q-choice"
                    data-on={on ? "1" : undefined}
                    onClick={() => onPick(choice)}
                  >
                    <span className="pk-q-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                    <span className="pk-q-choice-label">{choice}</span>
                    <span className="pk-q-tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4 4 10-10.5" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : q.kind === "tel" ? (
            <div className="pk-q-phone">
              <select
                className="pk-q-cc"
                aria-label="Country dial code"
                value={answers.dialCode ?? "+91"}
                onChange={(e) => setAnswers((p) => ({ ...p, dialCode: e.target.value }))}
              >
                {DIAL_CODES.map((c) => (
                  <option key={c.iso} value={c.dial}>{c.label}</option>
                ))}
              </select>
              <input
                ref={inputRef}
                className="pk-q-input"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={15}
                placeholder={q.placeholder}
                value={value}
                aria-invalid={!!error}
                onChange={(e) => set(q.id, e.target.value.replace(/[^\d]/g, ""))}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onContinue(); } }}
              />
            </div>
          ) : q.kind === "email" ? (
            <input
              ref={inputRef}
              className="pk-q-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={254}
              placeholder={q.placeholder}
              value={value}
              aria-invalid={!!error}
              onChange={(e) => set(q.id, e.target.value.replace(/\s/g, ""))}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onContinue(); } }}
            />
          ) : (
            <input
              ref={inputRef}
              className="pk-q-input"
              type="text"
              autoComplete="given-name"
              maxLength={60}
              placeholder={q.placeholder}
              value={value}
              aria-invalid={!!error}
              onChange={(e) => set(q.id, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onContinue(); } }}
            />
          )}

          {error && <p className="pk-q-err" role="alert">{error}</p>}
        </div>
      </div>

      {/* ------------------------------------------------------------ NAV */}
      <div className="pk-q-nav">
        <button
          className="pk-q-back"
          type="button"
          onClick={onBack}
          disabled={index === 0 || submitting}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 10H5M9 4.5L4.5 10 9 15.5" />
          </svg>
          Back
        </button>

        {q.kind !== "choice" && (
          <button className="pk-q-next" type="button" onClick={onContinue} disabled={submitting}>
            {index === TOTAL_STEPS - 1 ? "Submit" : "Continue"}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
            </svg>
          </button>
        )}

        {q.kind === "choice" && (
          <span className="pk-q-hint">
            {submitting ? "Taking you there…" : "Select an option to continue"}
          </span>
        )}
      </div>
    </div>
  );
}
