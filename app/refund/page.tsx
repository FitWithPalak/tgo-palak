import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalShell from "../LegalShell";

// HIDDEN — the funnel is free by application, so there is no fee to cancel or
// refund and this policy would be misleading if anyone reached it. The page is
// kept intact (not deleted) so it can be restored the day a paid offer returns:
// delete the `notFound()` line below and re-add the footer links in
// app/Footer.tsx + the colophon nav in app/page.tsx.
export const metadata: Metadata = {
  title: "Cancellation and Refund Policy | FitWithPalak",
  description: "The FitWithPalak clarity-or-fee-back promise, refunds, and rescheduling.",
  robots: { index: false, follow: false },
};

export default function RefundPage() {
  notFound();

  return (
    <LegalShell
      eyebrow="FitWithPalak"
      title="Cancellation and Refund Policy"
      intro="We want the Clarity Call to feel like an easy decision, so the risk sits with us, not with you. This page explains our clarity-or-fee-back promise, how to ask for a refund, and how rescheduling works."
    >
      <h2>1. Our clarity-or-fee-back promise</h2>
      <p>The Clarity Call is ₹499, and it is backed by a simple promise. If you attend your full call and do not walk away with real clarity on what is likely going on with your body and what to do next, your ₹499 is refunded. All we ask is that you complete the call, so Palak has the chance to actually assess your situation.</p>

      <h2>2. How to request a refund</h2>
      <p>To request a refund under this promise, write to <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a> up to 7 days after your call. Please use the same email you booked with and tell us briefly that the call did not give you the clarity you came for. You do not need to justify it in detail. We honour this promise in good faith.</p>

      <h2>3. Refund timelines</h2>
      <p>Once we approve your refund, we process it to your original payment method through Razorpay. Refunds are usually completed within 5 to 7 business days, though the exact time your bank takes to show it can vary.</p>

      <h2>4. Rescheduling</h2>
      <p>Life happens, and we understand that. If a genuine emergency means you cannot attend your booked slot, you can reschedule using the link in your confirmation email. Please do this as early as you can so your slot can be offered to someone else. Rescheduling is meant for genuine emergencies, not for routine changes of mind, and is subject to available slots.</p>

      <h2>5. No-show policy</h2>
      <p>If you do not attend your booked call and did not reschedule beforehand, the call is treated as delivered and the ₹499 fee is not refunded, because the slot was held for you and Palak&rsquo;s time was reserved. If something genuinely went wrong, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a> and we will look at it fairly.</p>

      <h2>6. Cancellation before the call</h2>
      <p>If you decide before your call that you no longer want the assessment, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a> as early as possible and we will help you sort it out.</p>

      <h2>7. Contact</h2>
      <p>For anything about cancellations or refunds, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a> and we will help.</p>
    </LegalShell>
  );
}
