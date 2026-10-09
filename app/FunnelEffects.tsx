"use client";

import { useEffect, useRef } from "react";
import { captureTrackingParams, restoreFbclid } from "@/lib/tracking";
import { trackGa4EventOnce } from "@/lib/ga4";
import { fireMetaEventOnce } from "@/lib/meta-client";
import { ANSWERS_KEY } from "@/lib/qualifier";

/* Client-side conversion polish for the FitWithPalak Clinical Track page:
   - a top scroll-progress rail
   - reveal-on-scroll for sections below the fold (fail-open: only sections
     already below the viewport at mount get hidden, so above-fold never blinks)
   - the method "journey spine" fills + ignites its step nodes as you scroll
   - a sticky bottom CTA that rises after the hero and hides again over the finale
   - the VSL poster frame swaps to the real embed on play (when a src is wired)
   Everything degrades to visible, finished content without JS, and honors
   prefers-reduced-motion. */

/** Build an embed URL that starts playing on its own, so our poster's play
   button is the only click needed (the click itself is the user gesture that
   lets the player start with sound). Handles Vimeo + YouTube, falls back to a
   plain autoplay flag for anything else. */
function buildEmbedSrc(raw: string): string {
  try {
    const u = new URL(raw);
    const host = u.hostname;
    if (host.includes("vimeo.com")) {
      u.searchParams.set("autoplay", "1");
      u.searchParams.set("playsinline", "1");
      u.searchParams.set("title", "0");
      u.searchParams.set("byline", "0");
      u.searchParams.set("portrait", "0");
    } else if (host.includes("youtube.com") || host.includes("youtu.be")) {
      u.searchParams.set("autoplay", "1");
      u.searchParams.set("playsinline", "1");
      u.searchParams.set("rel", "0");
    } else {
      u.searchParams.set("autoplay", "1");
    }
    return u.toString();
  } catch {
    return raw;
  }
}

export default function FunnelEffects({
  bookHref = "#book",
  sticky = true,
}: {
  bookHref?: string;
  sticky?: boolean;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const stickyRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const sticky = stickyRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Capture UTM / fbclid on landing so they survive to /checkout order notes.
    captureTrackingParams();

    // --- The method journey spine: pre-measure each node's fractional position.
    const journey = document.querySelector<HTMLElement>(".pk-journey");
    const jnodes = journey
      ? Array.from(journey.querySelectorAll<HTMLElement>(".pk-jstep-node"))
      : [];
    let nodeFr: number[] = [];
    const measureNodes = () => {
      if (!journey) return;
      const jr = journey.getBoundingClientRect();
      const trackH = journey.offsetHeight - 20; // spine runs top:10 -> bottom:10
      nodeFr = jnodes.map((n) => {
        const r = n.getBoundingClientRect();
        const center = r.top - jr.top + r.height / 2 - 10;
        return trackH > 0 ? Math.min(1, Math.max(0, center / trackH)) : 1;
      });
    };

    // --- Hide the sticky bar while the finale is on screen (never double a CTA).
    const finale = document.querySelector<HTMLElement>(".pk-finale");

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (fill) fill.style.width = pct + "%";

      if (sticky) {
        const pastHero = doc.scrollTop > window.innerHeight * 0.9;
        let overFinale = false;
        if (finale) {
          const fr = finale.getBoundingClientRect();
          overFinale = fr.top < window.innerHeight * 0.85;
        }
        sticky.classList.toggle("in", pastHero && !overFinale);
      }

      if (journey && journey.classList.contains("armed")) {
        const jr = journey.getBoundingClientRect();
        const refLine = window.innerHeight * 0.6; // fill tracks this line down the page
        let p = (refLine - jr.top) / journey.offsetHeight;
        p = Math.min(1, Math.max(0, p));
        journey.style.setProperty("--fill", p.toFixed(4));
        for (let i = 0; i < jnodes.length; i++) {
          const on = p >= (nodeFr[i] ?? 1) - 0.004;
          jnodes[i].closest(".pk-jstep")?.classList.toggle("active", on);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    const onResize = () => {
      measureNodes();
      update();
    };

    // --- Reveal-on-scroll for below-fold sections only.
    let io: IntersectionObserver | null = null;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
          el.classList.add("reveal");
          io!.observe(el);
        }
      });
    }

    // Arm the spine only when we can drive it; CSS otherwise leaves it full + lit.
    if (!reduce && journey) {
      journey.classList.add("armed");
      measureNodes();
    }

    // --- The "next step" walkaway ledger: ignite each number as its row scrolls
    //     into view (fail-open: CSS leaves them lit without JS / reduced-motion).
    let waIo: IntersectionObserver | null = null;
    const walkaway = document.querySelector<HTMLElement>(".pk-walkaway");
    if (!reduce && walkaway && "IntersectionObserver" in window) {
      walkaway.classList.add("armed");
      waIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-active");
              waIo?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      walkaway.querySelectorAll<HTMLElement>(".pk-wa").forEach((el) => waIo!.observe(el));
    }

    // --- Case-study thumbnails: if a thumb fails to load (not wired yet), hide it
    //     so the clean pink gradient stands instead of a broken-image + alt text.
    document.querySelectorAll<HTMLImageElement>(".pk-case-thumb").forEach((img) => {
      const hide = () => { img.style.display = "none"; };
      if (img.complete && img.naturalWidth === 0) hide();
      img.addEventListener("error", hide);
    });

    // --- VSL play affordance: swap the poster frame for the real embed on click.
    const vsl = document.querySelector<HTMLElement>(".pk-vsl");
    const onPlay = () => {
      if (!vsl || vsl.classList.contains("playing")) return;
      const src = vsl.getAttribute("data-video-src");
      if (!src) return; // no video wired yet -> keep the clean poster frame
      vsl.classList.add("playing");
      trackGa4EventOnce("video_play"); // hero VSL starts (once per browser)
      const isFile = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);
      if (isFile) {
        // Direct video file (our DigitalOcean CDN) -> HTML5 <video> player.
        const video = document.createElement("video");
        video.className = "pk-vsl-frame";
        video.src = src;
        video.poster = "/VSL-thumbnail.png";
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.play().catch(() => {});
        vsl.appendChild(video);
      } else {
        // Embeddable player (Vimeo/YouTube) -> iframe, built to start playing
        // straight away so the poster's play button is the only click needed.
        const frame = document.createElement("iframe");
        frame.className = "pk-vsl-frame";
        frame.src = buildEmbedSrc(src);
        frame.title = "FitWithPalak clinical track video";
        frame.allow =
          "autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; clipboard-write; gyroscope";
        frame.setAttribute("allowfullscreen", "");
        vsl.appendChild(frame);
      }
    };
    if (vsl) {
      vsl.addEventListener("click", onPlay);
      vsl.addEventListener("keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          onPlay();
        }
      });
    }

    // --- Case-study video modal: open only when a card has a wired data-video.
    const modal = document.getElementById("caseModal");
    const modalVideo = document.getElementById("caseModalVideo") as HTMLVideoElement | null;
    const openCase = (el: HTMLElement) => {
      const src = el.getAttribute("data-video");
      if (!src || !modal || !modalVideo) return; // no video wired yet -> no-op (no dead click)
      modalVideo.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      modalVideo.play().catch(() => {});
    };
    const closeCase = () => {
      if (!modal || !modalVideo) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();
    };
    const caseVideos = Array.from(document.querySelectorAll<HTMLElement>(".pk-case-video"));
    const caseHandlers = caseVideos.map((el) => {
      const onClick = () => openCase(el);
      const onKeydown = (e: Event) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          openCase(el);
        }
      };
      el.addEventListener("click", onClick);
      el.addEventListener("keydown", onKeydown);
      return { el, onClick, onKeydown };
    });
    modal?.querySelectorAll<HTMLElement>("[data-close]").forEach((el) => el.addEventListener("click", closeCase));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCase(); };
    document.addEventListener("keydown", onKey);

    // --- Analytics triggers (GA4 native + Meta AddToCart CAPI), delegated so
    //     they catch every CTA including the sticky bar (rendered by this comp).
    // Any CTA that goes to the booking page -> GA4 add_to_cart + Meta AddToCart.
    const onCtaClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href="/book-a-call"]');
      if (!link) return;
      trackGa4EventOnce("add_to_cart");
      fireMetaEventOnce("fwp_atc_fired", "/api/meta/add-to-cart");
    };
    document.addEventListener("click", onCtaClick);

    // Calendly booking completion (book-a-call page) -> GA4 book_call.
    const onCalendlyMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.endsWith("calendly.com")) return;
      const data = e.data as { event?: string } | undefined;
      if (data && data.event === "calendly.event_scheduled") {
        trackGa4EventOnce("book_call");
        // Meta Schedule (once per browser). Attach the applicant PII the qualifier
        // saved in sessionStorage (same tab -> survives the push to /book-a-call)
        // for high EMQ; if the page was opened fresh it still fires on fbc/fbp/IP/UA.
        let leadBody: Record<string, unknown> = { fbclid: restoreFbclid() };
        try {
          const raw = window.sessionStorage.getItem(ANSWERS_KEY);
          if (raw) {
            const a = JSON.parse(raw) as {
              name?: string; email?: string; whatsapp?: string; dialCode?: string;
            };
            leadBody = {
              name: a.name ?? "",
              email: a.email ?? "",
              whatsapp: `${a.dialCode ?? "+91"}${a.whatsapp ?? ""}`,
              dialCode: a.dialCode ?? "+91",
              fbclid: restoreFbclid(),
            };
          }
        } catch {
          /* sessionStorage blocked -> fire with cookie-based match only */
        }
        fireMetaEventOnce("fwp_meta_schedule", "/api/meta/schedule", leadBody);
      }
    };
    window.addEventListener("message", onCalendlyMessage);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      waIo?.disconnect();
      vsl?.removeEventListener("click", onPlay);
      caseHandlers.forEach(({ el, onClick, onKeydown }) => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("keydown", onKeydown);
      });
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onCtaClick);
      window.removeEventListener("message", onCalendlyMessage);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={fillRef} />
      </div>

      {sticky && (
        <a className="sticky-cta" ref={stickyRef} href={bookHref} aria-label="Book My Free 1:1 Call With Palak">
          <div className="pk-sticky-inner">
            <div className="pk-sticky-text">
              <span className="pk-sticky-lead">A 30-minute clinical assessment</span>
              <span className="pk-sticky-sub">Completely free &middot; By application</span>
            </div>
            <span className="pk-sticky-btn">
              BOOK MY FREE 1:1 CALL WITH PALAK
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
              </svg>
            </span>
          </div>
        </a>
      )}
    </>
  );
}
