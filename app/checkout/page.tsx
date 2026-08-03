import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FunnelEffects from "../FunnelEffects";
import Footer from "../Footer";
import CheckoutClient from "./CheckoutClient";
import { pricing, priceLabel } from "@/lib/config";

// HIDDEN — the ₹499 checkout is no longer part of the funnel. CTAs now open the
// qualifier at /apply and approved applicants go straight to /book-a-call.
// The page, CheckoutClient, and the Razorpay routes are kept intact so a paid
// step can be restored: delete the `notFound()` line below and point the CTAs
// back at /checkout (see QUALIFIER_PATH in lib/qualifier.ts).
export const metadata: Metadata = {
  title: "Checkout | FitWithPalak Clarity Call",
  description: `Confirm your details and book your 30-minute 1:1 Clarity Call with Palak for ${priceLabel}.`,
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  notFound();

  return (
    <>
      <FunnelEffects sticky={false} />

      {/* ============================================== CHROME */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="Checkout is secure">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>Complete your booking</span><span className="sep" aria-hidden="true">/</span><span>{priceLabel} &middot; Clarity Call with Palak</span><span className="sep" aria-hidden="true">/</span><span>Secure &amp; encrypted</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>Complete your booking</span><span className="sep">/</span><span>{priceLabel} &middot; Clarity Call with Palak</span><span className="sep">/</span><span>Secure &amp; encrypted</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <span className="pk-nav-cta" aria-hidden="true">Secure checkout</span>
        </div>
      </header>

      <main id="top" className="pk-paystage" data-theme="dark">
        {/* ============================================== 1 · COMPACT HEADER */}
        <section className="section pk-checkout-head" aria-label="Checkout">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">One step away</span>
              <h2 className="display">You are just one step away from finding the root cause of your thyroid issues</h2>
              <p className="deck">Confirm your details below and lock in your 30-minute Clarity Call with Palak.</p>
              <ul className="pk-trustrow" aria-label="Why this is safe">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>
                  Secure payment
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
                  256-bit encrypted
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
                  Clarity or your fee back
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================== 2+3 · FORM + SUMMARY + PAY (client) */}
        <CheckoutClient priceInr={pricing.inr} priceLabel={priceLabel} />

        <Footer />
      </main>
    </>
  );
}
