import type { Metadata } from "next";
import FunnelEffects from "../FunnelEffects";
import Footer from "../Footer";
import CalendlyInline from "../CalendlyInline";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book your Clarity Call | FitWithPalak",
  description:
    "Your application is approved. Pick a time for your 30-minute 1:1 Clarity Call with Palak.",
  robots: { index: false, follow: false },
};

const SLOT_WA_MESSAGE =
  "Hi FitWithPalak, my application for a Clarity Call was approved, but my preferred time slot is not showing. Here are my details:\nName:\nEmail:\nPhone:\nPreferred day and time:";
const SLOT_MAIL_SUBJECT = "Preferred slot not available — Clarity Call";

export default function BookACallPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const waHref = `https://wa.me/${brand.supportWhatsapp}?text=${encodeURIComponent(SLOT_WA_MESSAGE)}`;
  const mailHref = `mailto:${brand.supportEmail}?subject=${encodeURIComponent(SLOT_MAIL_SUBJECT)}&body=${encodeURIComponent(SLOT_WA_MESSAGE)}`;
  return (
    <>
      <FunnelEffects sticky={false} />

      {/* ============================================== CHROME */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="Book your call">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>Book your call</span><span className="sep" aria-hidden="true">/</span><span>Priority slot held</span><span className="sep" aria-hidden="true">/</span><span>30 minutes, 1:1 with Palak</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>Book your call</span><span className="sep">/</span><span>Priority slot held</span><span className="sep">/</span><span>30 minutes, 1:1 with Palak</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <span className="pk-nav-cta" aria-hidden="true">Book your call</span>
        </div>
      </header>

      <main id="top" className="pk-bookstage">
        {/* ============================================== 1 · SUCCESS HEADER + URGENCY */}
        <section className="section pk-book-head" aria-label="Book your call">
          <div className="wrapn">
            <div className="pk-success">
              <span className="pk-success-seal" aria-hidden="true">
                <span className="ring"></span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg>
              </span>
            </div>
            <div className="sec-head">
              <span className="eyebrow">Book your call</span>
              <h2 className="display">Pick your time.</h2>
              <p className="deck">Choose a slot below for your Clarity Call and your call link comes straight to your email.</p>
            </div>
          </div>
        </section>

        {/* ============================================== 2 · SCHEDULER (full-width, prominent) */}
        <section className="section" id="schedule" data-reveal aria-label="Pick your slot">
          <div className="wrap">
            <div className="pk-book">
              <div className="pk-sched-head">
                <span className="eyebrow">Pick your slot</span>
                <p className="sub">Times shown in your local time zone.</p>
              </div>
              <div className="pk-scheduler" aria-label="Scheduler">
                {calendlyUrl ? (
                  <CalendlyInline url={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=e479af`} />
                ) : (
                  <div className="pk-scheduler-ph" aria-hidden="true">
                    <span className="ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /><circle cx="8" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="16" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="8" cy="17" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" /></svg>
                    </span>
                    <span className="lbl">Loading your calendar</span>
                    <p className="note">Pick a day and time that actually works for you. No rushing.</p>
                  </div>
                )}
              </div>

              {/* Highlighted fallback for paid clients who cannot find a slot they want */}
              <div className="pk-slot-help" role="group" aria-label="Preferred time slot not available">
                <span className="pk-slot-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17v.5" /></svg>
                  Preferred slot not available?
                </span>
                <h3 className="pk-slot-title">Cannot find a time that works for you?</h3>
                <p className="pk-slot-text">Your application is approved and your seat is reserved, so you will not lose it. If none of the times above suit you, message us your <strong>name, email, phone number, and your preferred day and time</strong>, and we will personally set up your slot.</p>
                <div className="pk-slot-actions">
                  <a className="pk-slot-btn pk-slot-btn--wa" href={waHref} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3 4.2c-.2 0-.5 0-.7.4-.2.4-.9 1-.9 2.3s.9 2.6 1.1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.1-.5l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.4-.5-.6-.5z" /></svg>
                    Message us on WhatsApp
                  </a>
                  <a className="pk-slot-btn pk-slot-btn--mail" href={mailHref}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6.5h18v11H3z" /><path d="M3 7l9 6.5L21 7" /></svg>
                    Email us
                  </a>
                </div>
                <p className="pk-slot-contacts">
                  <span>{brand.supportPhone}</span>
                  <span className="dot" aria-hidden="true">&middot;</span>
                  <span>{brand.supportEmail}</span>
                </p>
              </div>

              {/* <ul className="pk-book-support" aria-label="What to expect">
                <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 1 2.3 5.6" /><path d="M4 20v-4h4" /></svg></span>
                  <span>Only reschedule if there is an emergency.</span>
                </li> 
                 <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6.5h16v11H4z" /><path d="M4 7l8 6 8-6" /></svg></span>
                  <span>Video link by email, plus one WhatsApp reminder.</span>
                </li>
                <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5.5 19a6.5 6.5 0 0 1 13 0" /></svg></span>
                  <span>30 minutes, 1:1, directly with Palak.</span>
                </li> 
               </ul> */}

              <div className="pk-book-more">
                <span className="pk-book-more-kicker">Wait, <em>there is more.</em></span>
                <p className="pk-book-more-text">Your booking also includes the private FitWithPalak WhatsApp community. Grab your link on the next step.</p>
                <a className="cta-big" href="/thank-you" role="button">
                  Get The WhatsApp Community Link
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 3 · WALK-AWAY LEDGER */}
        <section className="section section--soft" data-reveal aria-label="What you walk away with">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">What you walk away with</span>
              <h2 className="display">In 30 minutes you leave with three things you do not have right now.</h2>
            </div>
            <div className="pk-walkaway" role="list">
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">01</span>
                <div>
                  <span className="pk-wa-label">The cause</span>
                  <p className="pk-wa-body">What is most likely driving <em>your</em> tiredness, bloating, and stuck weight.</p>
                </div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">02</span>
                <div>
                  <span className="pk-wa-label">The tests</span>
                  <p className="pk-wa-body">The exact markers your current reports are missing.</p>
                </div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">03</span>
                <div>
                  <span className="pk-wa-label">The order</span>
                  <p className="pk-wa-body">What to fix first, so your effort finally works.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 4 · NUDGE */}
        <section className="section" data-reveal aria-label="A quick nudge">
          <div className="wrapn">
            <p className="pk-book-nudge">You are already approved. The only thing left is to pick a time. <strong>An unbooked call cannot help you.</strong></p>
          </div>
        </section>

        {/* ============================================== 5 · FAQ */}
        <section className="section section--soft" data-reveal aria-label="Before your call">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Before you book</span>
              <h2 className="display">Two quick questions before you book.</h2>
            </div>
            <div className="pk-faq">
              <details className="pk-faq-item" open>
                <summary>
                  <span className="pk-faq-q">Is the call directly with Palak?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Yes. Every Clarity Call is 30 minutes, 1:1, on video, directly with Palak. Not an assistant, not a sales team.</p></div>
              </details>
              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">Can I reschedule?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Please only reschedule if there is a genuine emergency. If something urgent comes up, use the link in your confirmation email to move your call, and your slot stays reserved. Palak holds a limited number of these slots, so keeping your time helps every woman get seen.</p></div>
              </details>
            </div>
          </div>
        </section>

        {/* ============================================== 6 · FINAL CTA */}
        <section className="section" data-reveal aria-label="Book your slot">
          <div className="wrapn">
            <div className="pk-book-final">
              <p className="line">Your slot is waiting. Pick your time now.</p>
              <a className="cta-big" href="#schedule" role="button">
                Pick my time
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================== FOOTER */}
        <Footer />
      </main>
    </>
  );
}
