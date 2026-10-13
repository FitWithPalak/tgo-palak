"use client";

// Calendly's official inline widget. A plain <iframe> never posts
// `calendly.event_scheduled` to the page (Calendly docs: iframes do not support
// event tracking via postMessage), so the Meta Schedule + GA4 book_call triggers in
// FunnelEffects need this widget instead.

import { useEffect, useRef } from "react";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyGlobal = {
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

export default function CalendlyInline({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const init = () => {
      const c = (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
      if (c && !el.querySelector("iframe")) c.initInlineWidget({ url, parentElement: el });
    };
    if ((window as unknown as { Calendly?: CalendlyGlobal }).Calendly) {
      init();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [url]);

  return <div ref={ref} className="pk-scheduler-frame" aria-label="Book your Clarity Call with Palak" />;
}
