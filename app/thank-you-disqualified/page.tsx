import type { Metadata } from "next";
import Footer from "../Footer";
import QualifierModal from "../QualifierModal";
import DisqualifiedResponses from "./DisqualifiedResponses";
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_NAME,
  INSTAGRAM_AVATAR,
  INSTAGRAM_STATS,
  INSTAGRAM_BIO,
  INSTAGRAM_BIO_LINK,
  QUALIFIER_PATH,
} from "@/lib/qualifier";

export const metadata: Metadata = {
  title: "Thank you for applying | FitWithPalak",
  description:
    "This specific program may not be the right fit right now — but you are not left empty handed.",
  robots: { index: false, follow: false },
};

export default function ThankYouDisqualifiedPage() {
  return (
    <>
      {/* Re-Apply opens the same overlay the landing-page CTAs open. */}
      <QualifierModal />

      {/* ============================================== CHROME */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="Application received">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>Application received</span><span className="sep" aria-hidden="true">/</span><span>Thank you for your honesty</span><span className="sep" aria-hidden="true">/</span><span>Free content still yours</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>Application received</span><span className="sep">/</span><span>Thank you for your honesty</span><span className="sep">/</span><span>Free content still yours</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <span className="pk-nav-cta" aria-hidden="true">Application received</span>
        </div>
      </header>

      <main id="top" className="pk-dq">
        {/* ============================================== 1 · THANK YOU */}
        <section className="section pk-dq-head" aria-label="Thank you for applying">
          <div className="wrapn">
            <div className="pk-dq-seal" aria-hidden="true">
              <span className="ring" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6.5h16v11H4z" /><path d="M4 7l8 6 8-6" />
              </svg>
            </div>
            <div className="sec-head">
              <span className="eyebrow">Application received</span>
              <h1 className="display">Thank you for applying.</h1>
              <p className="deck">
                After going through your answers, it looks like this specific program may not be
                the right fit for you at this moment.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================== 2 · NOT EMPTY HANDED (INSTAGRAM) */}
        <section className="section section--soft" aria-label="Follow Palak on Instagram">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">You&rsquo;re not left empty handed</span>
              <h2 className="display">
                The free work does not stop here. <em>Come take it.</em>
              </h2>
              <p className="deck">
                Follow Palak on Instagram for free, practical content on thyroid, gut health and
                root cause healing.
              </p>
            </div>

            {/* --- Instagram: reasons on the left, profile mock on the right --- */}
            <div className="pk-ig-split">
              <div className="pk-ig-why">
                <h3 className="pk-ig-why-title">Why it&rsquo;s worth following</h3>
                <ul className="pk-ig-why-list">
                  <li>
                    <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                    <span>The same <em>root cause</em> thinking this page is built on, broken down post by post.</span>
                  </li>
                  <li>
                    <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                    <span>Which markers a standard thyroid panel skips, and what the functional ranges actually are.</span>
                  </li>
                  <li>
                    <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                    <span>Real women, real reports, and what changed once someone looked deeper.</span>
                  </li>
                </ul>
                <p className="pk-ig-why-foot">
                  None of it costs anything. <strong>Take it whether or not you ever work with Palak.</strong>
                </p>
              </div>

              {/* Profile mock — structure mirrors an Instagram profile, skinned
                  in the site's pink. Nothing here is invented: the pillars come
                  from the copy above, and the stats row only renders once real
                  numbers are set in lib/qualifier.ts. */}
              <div className="pk-ig-phone">
                <div className="pk-ig-bar">
                  <span className="pk-ig-back" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
                  </span>
                  <span className="pk-ig-bar-handle">
                    {INSTAGRAM_HANDLE}
                    <span className="pk-ig-verified" aria-label="Verified account">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 1.8l2.3 2.1 3.1-.3 1 3 2.8 1.4-1 3 1 3-2.8 1.4-1 3-3.1-.3L12 22.2 9.7 20l-3.1.3-1-3-2.8-1.4 1-3-1-3L5.6 8.6l1-3 3.1.3z" />
                        <path d="M8.6 12.2l2.4 2.4 4.6-5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                  <span className="pk-ig-dots" aria-hidden="true">
                    <i /><i /><i />
                  </span>
                </div>

                <div className="pk-ig-body">
                  <div className="pk-ig-idrow">
                    <span className="pk-ig-ring">
                      <span className="pk-ig-avatar">
                        <img src={INSTAGRAM_AVATAR} alt={`${INSTAGRAM_NAME} on Instagram`} loading="lazy" />
                      </span>
                    </span>

                    {INSTAGRAM_STATS ? (
                      <dl className="pk-ig-stats">
                        <div><dt>{INSTAGRAM_STATS.posts}</dt><dd>posts</dd></div>
                        <div><dt>{INSTAGRAM_STATS.followers}</dt><dd>followers</dd></div>
                        <div><dt>{INSTAGRAM_STATS.following}</dt><dd>following</dd></div>
                      </dl>
                    ) : (
                      <span className="pk-ig-mark" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                          <circle cx="12" cy="12" r="4.1" />
                          <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
                        </svg>
                      </span>
                    )}
                  </div>

                  <div className="pk-ig-meta">
                    <span className="pk-ig-name">{INSTAGRAM_NAME}</span>
                    <p className="pk-ig-bio">
                      {INSTAGRAM_BIO.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                    <span className="pk-ig-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                        <path d="M10 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5L11 7.5" />
                        <path d="M14 10.5a3.5 3.5 0 0 0-5 0L6.5 13a3.5 3.5 0 0 0 5 5l1.5-1.5" />
                      </svg>
                      {INSTAGRAM_BIO_LINK}
                    </span>
                  </div>

                  <div className="pk-ig-actions">
                    <a
                      className="pk-ig-follow"
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Follow
                    </a>
                    <span className="pk-ig-ghost" aria-hidden="true">Message</span>
                    <span className="pk-ig-ghost pk-ig-ghost--sq" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </div>

                </div>

                <a
                  className="pk-ig-cta"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4.1" />
                    <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
                  </svg>
                  Follow @{INSTAGRAM_HANDLE}
                  <svg className="arr" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 3 · RE-APPLY */}
        <section className="section" aria-label="Re-apply">
          <div className="wrapn">
            <div className="pk-dq-reapply">
              <span className="pk-dq-reapply-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12a8 8 0 1 1 2.3 5.6" /><path d="M4 20v-4h4" />
                </svg>
                Answered something incorrectly?
              </span>
              <h2 className="pk-dq-reapply-title">
                Think you may have answered something incorrectly?
              </h2>
              <a className="cta-big" href={QUALIFIER_PATH} role="button">
                Re-Apply Now
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                </svg>
              </a>
              <p className="pk-dq-reapply-note">
                Only re-apply if you genuinely feel your answers didn&rsquo;t reflect your actual
                situation. If you do meet our criteria around health concern, readiness and
                investment, please re-apply with accurate answers.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================== 4 · WHY IT WASN'T APPROVED */}
        <section className="section section--soft" aria-label="Why your application wasn't approved">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">Full transparency</span>
              <h2 className="display">Here&rsquo;s why your application wasn&rsquo;t approved.</h2>
            </div>

            <DisqualifiedResponses />
          </div>
        </section>

        {/* ============================================== 5 · CLOSING */}
        <section className="section" aria-label="One more thing">
          <div className="wrapn">
            <div className="pk-dq-close">
              <span className="pk-dq-close-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20.5s-7.5-4.3-7.5-9.7A4.3 4.3 0 0 1 12 8.4a4.3 4.3 0 0 1 7.5 2.4c0 5.4-7.5 9.7-7.5 9.7z" />
                </svg>
              </span>
              <p className="pk-dq-close-lead">
                This doesn&rsquo;t mean your health concerns aren&rsquo;t real or important.
              </p>
              <p className="pk-dq-close-sub">
                It just means this particular program, in its current format, isn&rsquo;t the right
                fit for you right now.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
