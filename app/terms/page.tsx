import type { Metadata } from "next";
import LegalShell from "../LegalShell";

export const metadata: Metadata = {
  title: "Terms and Conditions | FitWithPalak",
  description: "The terms on which you book the FitWithPalak Clarity Call.",
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="FitWithPalak"
      title="Terms and Conditions"
      intro="These terms explain what the Clarity Call is, what it is not, and the terms on which you book it. Please read them before you apply. By applying for and booking a call, you agree to these terms."
    >
      <h2>1. About the service</h2>
      <p>The Clarity Call is a free 30-minute 1:1 educational clinical nutrition assessment with Palak, a clinical functional nutritionist. There is no fee and no payment is taken for the call. On the call, Palak reviews the information and reports you share and gives you an educational view of what may be driving how you feel, which markers your current reports may be missing, and what to look at first.</p>

      <h2>2. What the service is not</h2>
      <p>The Clarity Call is for education and guidance only. It is not medical treatment, diagnosis, a prescription, or emergency care. It does not create a doctor and patient relationship. It is meant to work alongside the care of your own doctor, never to replace it. You should not stop, start, or change any medication based on the call. Always consult your doctor before making any medical decision. If you are having a medical emergency, do not use this service. Contact your doctor or your local emergency number right away.</p>

      <h2>3. Applying and booking</h2>
      <ul>
        <li>The Clarity Call is free. We do not take payment for it, and we will never ask you for card or bank details to book one.</li>
        <li>Slots are limited and are offered by application. You answer a short set of questions, and a call is offered only where the answers indicate the call is likely to be genuinely useful for you.</li>
        <li>Applying does not guarantee a call. We may decline an application, and we may withdraw a slot where the information given turns out to be inaccurate.</li>
        <li>You choose your slot at the time of booking. Your call link and joining details are sent to the email and phone number you provide, so please make sure they are correct.</li>
        <li>If a genuine emergency means you cannot attend, please reschedule using the link in your confirmation email as early as you can, so the slot can be offered to someone else.</li>
        <li>On the call Palak may tell you about a paid program. That is entirely optional, it is never a condition of the free call, and nothing is charged unless you separately choose to enrol.</li>
      </ul>

      <h2>4. Your responsibilities</h2>
      <p>To get the most from the call, and to keep it safe and useful, you agree to:</p>
      <ul>
        <li>Give accurate and complete information about your health history, symptoms, and reports.</li>
        <li>Understand that any guidance is general and educational, and that decisions about your treatment rest with you and your doctor.</li>
        <li>Continue to follow your doctor&rsquo;s advice and not change your medication based on the call.</li>
        <li>Be over 18 and booking for yourself.</li>
        <li>Join your call on time from a quiet place with a stable connection.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>All content on this website and shared during the call, including the text, design, method, frameworks, and any materials we send you, belongs to FitWithPalak and is protected by law. It is for your personal use only. You may not copy, record, resell, or share it publicly without our written permission.</p>

      <h2>6. Limitation of liability</h2>
      <p>We provide the Clarity Call in good faith and with genuine care, but we cannot promise any specific health result. Every body is different, and outcomes depend on many factors outside our control. To the extent allowed by law, FitWithPalak is not liable for any loss or harm that results from relying on the educational guidance given on the call, from any decision you make based on it, or from any change you make to your health or medication without your doctor. Nothing in these terms limits any liability that cannot be limited by law.</p>

      <h2>7. Medical disclaimer</h2>
      <p>The information on this website and on the Clarity Call is for educational purposes only and is not medical advice. It is not a substitute for the advice, diagnosis, or treatment of a qualified doctor. Never ignore or delay seeking medical advice because of something you read here or heard on the call. Your use of this service is at your own discretion and is subject to this disclaimer.</p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of India. Any dispute relating to the service or these terms will be subject to the courts of India, at the jurisdiction FitWithPalak operates from.</p>

      <h2>9. Changes to these terms</h2>
      <p>We may update these terms from time to time. The version on this page at the time you book is the version that applies to your booking.</p>

      <h2>10. Contact</h2>
      <p>For any question about these terms, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a>.</p>
    </LegalShell>
  );
}
