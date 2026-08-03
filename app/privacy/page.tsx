import type { Metadata } from "next";
import LegalShell from "../LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy | FitWithPalak",
  description: "How FitWithPalak collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="FitWithPalak"
      title="Privacy Policy"
      intro="This policy explains what information FitWithPalak collects when you book a Clarity Call, how we use it, and the choices you have. We keep this simple on purpose, because your trust matters to us."
    >
      <h2>1. Who we are</h2>
      <p>FitWithPalak provides the Clarity Call, a free 30-minute 1:1 clinical nutrition assessment for women on thyroid medication. In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;FitWithPalak&rdquo; mean the FitWithPalak team. &ldquo;You&rdquo; means anyone who visits this website or books a call. If you have any question about your data, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a>.</p>

      <h2>2. What information we collect</h2>
      <p>We collect only what we need to deliver your call and run the service.</p>
      <ul>
        <li><strong>Answers you give in the application form:</strong> your first name, your email address, your WhatsApp number, where you are based, your profession, your main health concern, and whether you are ready to act on what you hear.</li>
        <li><strong>Booking information:</strong> the time slot you choose and your booking confirmation. The Clarity Call is free, so we do not take or store any card or bank details for it.</li>
        <li><strong>Information you share on or before the call:</strong> anything you choose to tell us about your health history, symptoms, or reports so that Palak can assess your situation.</li>
        <li><strong>Technical and usage information:</strong> collected automatically through cookies and analytics tools when you use the website, such as your device type, browser, approximate location, the pages you view, and how you move through the page. Our analytics tools include Google Analytics 4 (GA4), Microsoft Clarity, and the Meta Pixel.</li>
      </ul>

      <h2>3. How we use your information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Deliver your Clarity Call, including sending your call link and joining details.</li>
        <li>Send you booking confirmations and WhatsApp or email reminders so you do not miss your slot.</li>
        <li>Reply to your questions and provide support.</li>
        <li>Review your application and decide whether a Clarity Call is likely to be useful for you.</li>
        <li>Understand how people use the website so we can improve the page, the booking flow, and the service.</li>
        <li>Keep records we are required to keep and protect against fraud or misuse.</li>
      </ul>
      <p>We do not sell your personal information to anyone.</p>

      <h2>4. Cookies and analytics</h2>
      <p>This website uses cookies and similar technologies to make the site work and to measure how it is used. Some are needed for the site to function. Others, such as GA4, Microsoft Clarity, and the Meta Pixel, help us see which parts of the page are useful and where people drop off. You can control or clear cookies through your browser settings. If you block some cookies, parts of the site may not work as expected.</p>

      <h2>5. Who we share your information with</h2>
      <p>We share your information only with service providers who help us run the service, and only to the extent they need it:</p>
      <ul>
        <li><strong>Our workflow and CRM tool</strong>, to receive your application answers and route your booking messages.</li>
        <li><strong>Our scheduling tool</strong>, to book your slot and send your confirmation and reminders.</li>
        <li><strong>Our analytics and messaging tools</strong> (such as GA4, Microsoft Clarity, the Meta Pixel, and our email or WhatsApp reminder service), to measure usage and to send you booking messages.</li>
      </ul>
      <p>These providers process your information on our behalf and are expected to protect it. We may also share information if the law requires it, or to protect our rights and the safety of others.</p>

      <h2>6. How long we keep your information</h2>
      <p>We keep your information for up to 30 days after your call, after which we delete it or make it anonymous. The only exception is any record we are required by law to retain, which we keep for as long as the law requires.</p>

      <h2>7. How we protect your information</h2>
      <p>We use reasonable technical and organisational measures to protect your information from loss, misuse, and unauthorised access. No method of transmission over the internet is completely secure, so we cannot promise absolute security, but we take your data seriously and limit access to the people who need it.</p>

      <h2>8. Your rights and choices</h2>
      <p>You can:</p>
      <ul>
        <li>Ask us for a copy of the personal information we hold about you.</li>
        <li>Ask us to correct information that is wrong or out of date.</li>
        <li>Ask us to delete your information, where we are not required to keep it.</li>
        <li>Ask us to stop sending you marketing or reminder messages.</li>
      </ul>
      <p>To make any of these requests, write to <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a> and we will respond within a reasonable time.</p>

      <h2>9. Children</h2>
      <p>This service is meant for adult women. It is not directed at anyone under 18, and we do not knowingly collect information from children.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. When we do, we will change the &ldquo;Last updated&rdquo; date at the top. Please check this page now and then so you stay informed.</p>

      <h2>11. Contact</h2>
      <p>If you have any question about this policy or your information, write to us at <a href="mailto:teamfitwithpalak@gmail.com">teamfitwithpalak@gmail.com</a>.</p>
    </LegalShell>
  );
}
