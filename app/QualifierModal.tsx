"use client";

// Full-screen overlay that takes over when any funnel CTA is clicked. It hijacks
// every `a[href="/apply"]` on the page (including the sticky bottom bar that
// FunnelEffects renders), so the CTAs stay plain links: without JS they still
// navigate to the real /apply page and the funnel never dead-ends.

import { useCallback, useEffect, useRef, useState } from "react";
import QualifierForm from "./QualifierForm";
import { QUALIFIER_PATH, TOTAL_STEPS } from "@/lib/qualifier";

export default function QualifierModal() {
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocusTo.current?.focus?.();
    restoreFocusTo.current = null;
  }, []);

  // Delegate: any CTA pointing at the qualifier opens the overlay instead.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Let the browser handle modified clicks (new tab / new window).
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>(
        `a[href="${QUALIFIER_PATH}"]`
      );
      if (!link) return;
      e.preventDefault();
      restoreFocusTo.current = link;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Lock the page behind the overlay + wire Escape.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      shellRef.current?.querySelector<HTMLElement>("input, button:not(.pk-q-close)")?.focus();
    }, 240);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="pk-q-overlay" role="dialog" aria-modal="true" aria-label="Priority Call Qualifier">
      <div className="pk-q-overlay-bg" onClick={close} aria-hidden="true" />
      <div className="pk-q-shell-kicker">
        <span className="dot" aria-hidden="true" />
        Priority Call Qualifier &middot; {TOTAL_STEPS} short questions
      </div>
      <div className="pk-q-shell" ref={shellRef}>
        <QualifierForm onClose={close} />
      </div>
    </div>
  );
}
