import FunnelEffects from "./FunnelEffects";
import QualifierModal from "./QualifierModal";
import { QUALIFIER_PATH } from "@/lib/qualifier";

export default function Page() {
  return (
    <>
      <FunnelEffects bookHref={QUALIFIER_PATH} />
      {/* Every CTA below is a plain <a href="/apply">. This intercepts the click
          and opens the step form as an overlay; without JS the link still works. */}
      <QualifierModal />

      {/* ============================================== 1 · CHROME (page) */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="What the Clarity Call is">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>1:1 with Palak</span><span className="sep" aria-hidden="true">/</span><span>A clinical assessment, not a sales pitch</span><span className="sep" aria-hidden="true">/</span><span>Completely free, by application</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>1:1 with Palak</span><span className="sep">/</span><span>A clinical assessment, not a sales pitch</span><span className="sep">/</span><span>Completely free, by application</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="#top" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <a className="pk-nav-cta" href="/apply">BOOK MY FREE 1:1 CALL WITH PALAK</a>
        </div>
      </header>

      <main id="top">
        {/* ============================================== 2 · HERO + VSL (dark stage) */}
        {/* Order: eyebrow -> headline -> subhead -> VIDEO -> CTA -> bridge. */}
        <section className="pk-hero" data-theme="dark" aria-label="Hero">
          <div className="pk-hero-inner">
            <p className="pk-hero-eyebrow">For women on thyroid medication who still do not feel like themselves</p>
            <h1>
              You take the <em>thyroid pill</em> every single day.<br/>And you still wake up <em>tired, bloated, and stuck.</em>
            </h1>
            <p className="pk-sub">
              <span className="lede">It is not your fault.</span> The medicine only manages the number. Nobody has told you why you still feel this bad, because nobody has looked for the real cause yet. It can be found.
            </p>

            {/* VSL — sits before the CTA */}
            <div className="pk-hero-vsl">
              <p className="pk-vsl-cap">
                <span className="dot" aria-hidden="true"></span>
                <span><strong>Press play.</strong> Watch this first</span>
              </p>
              {/* Clean dark player frame. data-video-src is wired by Atul; until then
                  the poster + play affordance stand on their own (no faked imagery). */}
              <div className="pk-vsl" role="button" tabIndex={0} aria-label="Play the video" data-video-src={process.env.NEXT_PUBLIC_VSL_URL ?? ""}>
                <div className="pk-vsl-poster" aria-hidden="true"></div>
                <button className="pk-vsl-play" type="button" aria-label="Play the video">
                  <span className="ripple" aria-hidden="true"></span>
                  <span className="ripple" aria-hidden="true"></span>
                  <span className="ripple" aria-hidden="true"></span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5.5v13a1 1 0 0 0 1.54.84l10.3-6.5a1 1 0 0 0 0-1.68L8.54 4.66A1 1 0 0 0 7 5.5z" />
                  </svg>
                </button>
                <span className="pk-vsl-runtime" aria-hidden="true">Watch first</span>
              </div>
            </div>

            <a className="cta-big" href="/apply" role="button">
              BOOK MY FREE 1:1 CALL WITH PALAK
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
              </svg>
            </a>
            {/* <p className="pk-cta-guarantee">Completely free &middot; No obligation</p> */}
            <ul className="pk-cta-points" aria-label="What the call is">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                30-minute 1:1
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" />
                </svg>
                Not a sales pitch
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" />
                </svg>
                Completely free, no obligation
              </li>
            </ul>

            <p className="pk-vsl-bridge">
              If that sounded exactly like what you have been feeling, keep reading. <strong>Everything below is what we look at, in the exact order we look at it.</strong>
            </p>
          </div>
        </section>

        {/* ============================================== 4 · THE "YOU" MIRROR (text) */}
        <section className="section section--light" id="mirror" data-reveal aria-label="If this is you">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">If this is you, you are in the right place</span>
              <h2 className="display">On the outside you have it all together. On the inside your body feels like it is working against you.</h2>
            </div>
            <ul className="pk-mirror-points" aria-label="If this is you">
              <li>
                <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7L9.5 17.5 4 12" /></svg></span>
                <span>You do everything right. Protein, your walks, the medication exactly as told.</span>
              </li>
              <li>
                <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7L9.5 17.5 4 12" /></svg></span>
                <span>Still exhausted, still bloated, still off, and the dose only goes up.</span>
              </li>
              <li>
                <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7L9.5 17.5 4 12" /></svg></span>
                <span>You keep hearing &ldquo;your numbers are controlled, raise the dose, you are just stressed.&rdquo;</span>
              </li>
              <li>
                <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7L9.5 17.5 4 12" /></svg></span>
                <span>You know your own body, and you know something underneath is actually wrong.</span>
              </li>
            </ul>
            <p className="pk-mirror-close">Being dismissed year after year is exhausting on its own.</p>
          </div>
        </section>

        {/* ============================================== 8 · PROOF (result quote cards) */}
        {/* Background skin: swap "proof-wine" <-> "proof-soft" to A/B test the stage. */}
        <section className="section proof-wine" id="proof" data-reveal aria-label="Client results">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Women who were told &ldquo;this is just how it is&rdquo;</span>
              <h2 className="display">This is what happens when someone finally looks into it properly.</h2>
            </div>

            <div className="pk-cases">
              <article className="pk-case">
                <div className="pk-case-video" data-video={process.env.NEXT_PUBLIC_TESTIMONIAL_2_URL ?? ""} role="button" tabIndex={0} aria-label="Play Shivani&rsquo;s story">
                  <img className="pk-case-thumb" src="/testimonials/Shivani.png" alt="Shivani, thyroid recovery story" loading="lazy" />
                </div>
                <div className="pk-case-body">
                  <h3 className="pk-case-name">Shivani</h3>
                  <div className="pk-case-meta">Her energy came back</div>
                  <div className="pk-case-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="pk-case-quote">&ldquo;Years of fatigue, hair fall, dry skin, and a Hashimoto's diagnosis left her feeling exhausted. By following a holistic plan focused on addressing the root cause, her thyroid symptoms improved, her antibody levels reduced, and she finally started feeling healthier again.&rdquo;</p>
                </div>
              </article>

              <article className="pk-case">
                <div className="pk-case-video" data-video={process.env.NEXT_PUBLIC_TESTIMONIAL_1_URL ?? ""} role="button" tabIndex={0} aria-label="Play Shradha&rsquo;s story">
                  <img className="pk-case-thumb" src="/testimonials/Shradha.png" alt="Shradha, thyroid and gut recovery story" loading="lazy" />
                </div>
                <div className="pk-case-body">
                  <h3 className="pk-case-name">Shradha</h3>
                  <div className="pk-case-meta">Thyroid &amp; gut, finally moving</div>
                  <div className="pk-case-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="pk-case-quote">&ldquo;Despite working out daily and eating healthy, she couldn't lose stubborn belly fat due to thyroid and gut health issues. After identifying the root cause and making simple lifestyle changes, she improved her energy, gut health, and finally started seeing real progress. 
&rdquo;</p>
                </div>
              </article>

              <article className="pk-case">
                <div className="pk-case-video" data-video={process.env.NEXT_PUBLIC_TESTIMONIAL_3_URL ?? ""} role="button" tabIndex={0} aria-label="Play Yogita&rsquo;s story">
                  <img className="pk-case-thumb" src="/testimonials/Yogita.png" alt="Yogita, thyroid recovery story" loading="lazy" />
                </div>
                <div className="pk-case-body">
                  <h3 className="pk-case-name">Yogita</h3>
                  <div className="pk-case-meta">A plan built around her body</div>
                  <div className="pk-case-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="pk-case-quote">&ldquo;Four months after her C-section, she wanted to regain strength and recover safely. With a personalized nutrition and workout plan tailored to her body, recovery stage, and lifestyle, she rebuilt her strength and continues to follow the healthy habits she learned. &rdquo;</p>
                </div>
              </article>

              <article className="pk-case">
                <div className="pk-case-video" data-video={process.env.NEXT_PUBLIC_TESTIMONIAL_4_URL ?? ""} role="button" tabIndex={0} aria-label="Play Ashwin&rsquo;s story">
                  <img className="pk-case-thumb" src="/testimonials/Ashwin.png" alt="Ashwin, gut and bloating recovery story" loading="lazy" />
                </div>
                <div className="pk-case-body">
                  <h3 className="pk-case-name">Ashwin</h3>
                  <div className="pk-case-meta">Gut healed, bloating gone</div>
                  <div className="pk-case-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="pk-case-quote">&ldquo;Despite exercising regularly, her weight wouldn't budge because of PCOS and poor gut health. By improving her nutrition, supporting her gut, and making sustainable lifestyle changes, she reduced bloating, gained more energy, and finally felt her body responding again.
&rdquo;</p>
                </div>
              </article>
            </div>

            <p className="pk-proof-foot">Different women, same pattern: <strong>the answer was never to try harder, it was to look deeper.</strong></p>
          </div>
        </section>

        {/* ============================================== 5 · WHY THIS KEEPS HAPPENING (markers ledger) */}
        <section className="section section--soft" id="why" data-reveal aria-label="Why this keeps happening">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">This was never a discipline problem</span>
              <h2 className="display">The problem is not you. There are four things nobody ever fixed, and that is why you still feel like this even on medication.</h2>
              <p className="deck">Your medicine only manages the number. It never touches the reason your thyroid slowed down in the first place. Nobody ran your full panel, and nobody checked these four.</p>
              <p className="deck pk-why-line">You were treated for the symptom, while the real causes kept growing quietly.</p>
            </div>

            <ol className="pk-cards" aria-label="The four root causes nobody fixed">
              <li className="pk-card">
                <div className="pk-card-left">
                  <span className="pk-card-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5v3.2c0 1.5 1.2 2.6 2.7 2.6h.8c1.7 0 3 1.4 3 3.1 0 2.3-1.9 4.1-4.2 4.1H10a4.5 4.5 0 0 1-4.5-4.5c0-2 1.2-3.4 1.2-5.3A3.2 3.2 0 0 0 5 6.7" />
                      <path d="M9.5 12.5c1.4-1 3.4-1 4.8 0" />
                    </svg>
                  </span>
                  <div className="pk-card-titles">
                    <span className="pk-card-name">Your gut</span>
                    <span className="pk-card-sub">Absorption</span>
                  </div>
                </div>
                <div className="pk-card-div" aria-hidden="true"></div>
                <div className="pk-card-right">
                  <p className="pk-card-insight">If your <em>gut</em> is not working, nothing you eat reaches you.</p>
                  <p className="pk-card-support">Your body cannot absorb what you eat, and it cannot even use your thyroid medicine properly. This is why eating clean changes nothing.</p>
                </div>
              </li>

              <li className="pk-card">
                <div className="pk-card-left">
                  <span className="pk-card-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 3.5h5" />
                      <path d="M10.5 3.5v9.2a1.5 1.5 0 0 0 3 0V3.5" />
                      <path d="M10.5 8.4h3" />
                      <path d="M17.4 4.5c.7.8.7 1.6.1 2.1-.5.4-1.3.1-1.4-.5-.1-.5.3-1 .7-1.4z" />
                    </svg>
                  </span>
                  <div className="pk-card-titles">
                    <span className="pk-card-name">Your blood sugar</span>
                    <span className="pk-card-sub">Fasting insulin</span>
                  </div>
                </div>
                <div className="pk-card-div" aria-hidden="true"></div>
                <div className="pk-card-right">
                  <p className="pk-card-insight">Your <em>blood sugar</em> was left high and unmanaged.</p>
                  <p className="pk-card-support">While it stays there the weight will not move, no matter how clean you eat, and nobody ever checked your <em>fasting insulin</em> to see it.</p>
                </div>
              </li>

              <li className="pk-card">
                <div className="pk-card-left">
                  <span className="pk-card-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5c2.9 3.4 4.8 5.8 4.8 8.3a4.8 4.8 0 0 1-9.6 0c0-2.5 1.9-4.9 4.8-8.3z" />
                      <circle cx="12" cy="12.2" r="1" />
                      <circle cx="9.9" cy="13.6" r=".8" />
                      <circle cx="14.1" cy="13.6" r=".8" />
                      <path d="M11.2 12.7l-.6.6M12.8 12.7l.6.6" />
                    </svg>
                  </span>
                  <div className="pk-card-titles">
                    <span className="pk-card-name">Vitamins &amp; minerals</span>
                    <span className="pk-card-sub">B12 &middot; D &middot; iron</span>
                  </div>
                </div>
                <div className="pk-card-div" aria-hidden="true"></div>
                <div className="pk-card-right">
                  <p className="pk-card-insight">Your <em>B12</em>, <em>vitamin D</em> and <em>iron</em> are running low.</p>
                  <p className="pk-card-support">When these run low your thyroid slows down even more. Your <em>ferritin</em> was marked normal at <em>18</em>, but the functional range starts around <em>50</em>, and that gap is why you feel so tired.</p>
                </div>
              </li>

              <li className="pk-card">
                <div className="pk-card-left">
                  <span className="pk-card-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 4.5A3 3 0 0 0 6 7.5a2.6 2.6 0 0 0-1.4 4.7A2.8 2.8 0 0 0 6 16.8 2.6 2.6 0 0 0 9 19.4c1 0 1.8-.5 2.2-1.3V6.2A2.6 2.6 0 0 0 9 4.5z" />
                      <path d="M13.5 8h2.2a2 2 0 0 1 0 4h-2M14 12l2.5 2.2" />
                    </svg>
                  </span>
                  <div className="pk-card-titles">
                    <span className="pk-card-name">Your nervous system</span>
                    <span className="pk-card-sub">Stuck in stress</span>
                  </div>
                </div>
                <div className="pk-card-div" aria-hidden="true"></div>
                <div className="pk-card-right">
                  <p className="pk-card-insight">Your body has been stuck in stress for years.</p>
                  <p className="pk-card-support">Always on, never calm. That alone keeps your thyroid struggling, and it is the one thing no report you have ever done went looking for.</p>
                </div>
              </li>
            </ol>

            <p className="pk-markers-foot">The longer these four go unfixed, the more your body learns to run on empty, until you start feeling forty-five when you are only thirty-two. <strong>None of this is your fault.</strong> You cannot fix something that was never measured.</p>
          </div>
        </section>

        {/* ============================================== 6 · THE METHOD (journey spine) */}
        <section className="section section--light" id="method" data-reveal aria-label="The method">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How healing actually works</span>
              <h2 className="display">You can eat perfectly and take every supplement, but if your gut is not absorbing it, <em>none of it reaches your body.</em></h2>
              <p className="deck">This is the part almost everyone skips. If your gut is not absorbing, nothing changes, no matter how right you eat. Fix that first, and the same effort finally starts to work. It happens in this order, and the order is the reason it works.</p>
            </div>

            <div className="pk-journey" aria-label="The four steps, in order">
              <span className="pk-journey-line" aria-hidden="true"></span>
              <span className="pk-journey-fill" aria-hidden="true"></span>
              <span className="pk-journey-head" aria-hidden="true"></span>

              <div className="pk-jstep pk-jstep--left">
                <div className="pk-jstep-card">
                  <span className="pk-jstep-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M16 16l4.5 4.5" /></svg>
                  </span>
                  <span className="pk-jstep-kicker">Step 01</span>
                  <h3 className="pk-jstep-title">See the full picture</h3>
                  <p className="pk-jstep-text">A complete functional workup, the 20+ markers a regular checkup skips, so we find the actual cause instead of guessing.</p>
                </div>
                <span className="pk-jstep-node" aria-hidden="true">01</span>
              </div>

              <div className="pk-jstep pk-jstep--right">
                <span className="pk-jstep-node" aria-hidden="true">02</span>
                <div className="pk-jstep-card">
                  <span className="pk-jstep-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3.5 2.5 5.5 5.5 5.5 9a5.5 5.5 0 0 1-11 0c0-3.5 2-6.5 5.5-9z" /><path d="M9.5 13.5c.8 1.2 2.2 1.8 3.5 1.2" /></svg>
                  </span>
                  <span className="pk-jstep-kicker">Step 02</span>
                  <h3 className="pk-jstep-title">Heal the gut</h3>
                  <p className="pk-jstep-text">Until your gut is working, your body cannot absorb most of what you eat. This is why &ldquo;I eat so clean and nothing changes&rdquo; is so common. We fix this first.</p>
                </div>
              </div>

              <div className="pk-jstep pk-jstep--left">
                <div className="pk-jstep-card">
                  <span className="pk-jstep-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h3l2-6 3 12 2.5-8 1.5 2H21" /></svg>
                  </span>
                  <span className="pk-jstep-kicker">Step 03</span>
                  <h3 className="pk-jstep-title">Repair the metabolism</h3>
                  <p className="pk-jstep-text">Thyroid, insulin, and the markers that actually control your energy and your weight, corrected at the source instead of chased with a higher dose.</p>
                </div>
                <span className="pk-jstep-node" aria-hidden="true">03</span>
              </div>

              <div className="pk-jstep pk-jstep--right">
                <span className="pk-jstep-node" aria-hidden="true">04</span>
                <div className="pk-jstep-card">
                  <span className="pk-jstep-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12h3l1.5-3 2.5 6 2-9 2.5 9 1.5-3h3.5" /></svg>
                  </span>
                  <span className="pk-jstep-kicker">Step 04</span>
                  <h3 className="pk-jstep-title">Calm the nervous system</h3>
                  <p className="pk-jstep-text">We bring your body out of constant stress mode so the results hold instead of slipping back the moment life gets busy.</p>
                </div>
              </div>
            </div>

            <p className="pk-method-foot">Most plans start at step three and skip the first two completely. That is why they stop working. <strong>We start at step one.</strong></p>
          </div>
        </section>

        {/* ============================================== 7 · PALAK / AUTHORITY (text + portrait) */}
        <section className="section" id="palak" data-theme="dark" data-reveal aria-label="Who you would be working with">
          <div className="pk-palak">
            <img className="pk-palak-img" src="/assets/about_photo.avif" alt="Palak, clinical functional nutritionist" />
            <div className="pk-palak-text">
              <span className="eyebrow">Who you would be working with</span>
              <h2>I built this because I was exactly where you are: doing everything right, running on empty, and getting <em>no real answers.</em></h2>
              <div className="prose prose--left">
                <p>I am Palak, a clinical functional nutritionist. For eight years I worked in corporate life, pushing it all down, running on stress with a body that felt stuck and heavy. Every test I took came back normal. Every doctor told me some version of &ldquo;you&rsquo;re just stressed.&rdquo; I knew that was not the full story, so I trained in functional nutrition myself to find the part everyone kept missing.</p>
                <p>Five years and hundreds of test panels later, this is all I do. I run the 20+ marker workups that doctors skip, and I read the body at a level a regular appointment is not built to reach. I am not guessing at your situation from the outside. I have lived the version where the reports say you are fine and your body says otherwise, and I know exactly where to look.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 8.5 · VALUE STACK (what the free call includes;
            the ₹ figures below are value anchors, not amounts charged) */}
        <section className="section section--soft" data-reveal aria-label="Everything you get">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What you get</span>
              <h2 className="display">Everything you get, and it costs you <span className="pk-vs-price">nothing</span>.</h2>
              <p className="deck">A focused 1:1 assessment, a clear root cause analysis, and a private community of women doing the same work. Here is everything that is yours the moment your application is approved.</p>
            </div>

            <div className="pk-vstack-grid">
              <article className="pk-vs-card">
                <img src="/value-stack/30_min_call.png" alt="30-Minute Clarity Call with Palak, value ₹1,999" loading="lazy" />
                <div className="pk-vs-cap">
                  <div className="pk-vs-cap-top">
                    <h3 className="pk-vs-name">30-Minute Clarity Call</h3>
                    <span className="pk-vs-val-pill">₹1,999</span>
                  </div>
                  <p className="pk-vs-desc">A focused 1:1 assessment where you get the likely cause of how you feel and a clear order of what to fix first.</p>
                  <span className="pk-vs-included"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4 4 10-10.5" /></svg>Included</span>
                </div>
              </article>
              <article className="pk-vs-card">
                <img src="/value-stack/rca.png" alt="Root Cause Analysis, value ₹999" loading="lazy" />
                <div className="pk-vs-cap">
                  <div className="pk-vs-cap-top">
                    <h3 className="pk-vs-name">Root Cause Analysis</h3>
                    <span className="pk-vs-val-pill">₹999</span>
                  </div>
                  <p className="pk-vs-desc">On the call, we identify the root cause of your thyroid or hashimoto and explain it clearly to you.</p>
                  <span className="pk-vs-included"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4 4 10-10.5" /></svg>Included</span>
                </div>
              </article>
              <article className="pk-vs-card">
                <img src="/value-stack/community.png" alt="The FitWithPalak Community, value ₹899" loading="lazy" />
                <div className="pk-vs-cap">
                  <div className="pk-vs-cap-top">
                    <h3 className="pk-vs-name">The FitWithPalak Community</h3>
                    <span className="pk-vs-val-pill">₹899</span>
                  </div>
                  <p className="pk-vs-desc">A private WhatsApp space with other women doing the same work, so you are never figuring this out alone.</p>
                  <span className="pk-vs-included"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4 4 10-10.5" /></svg>Included</span>
                </div>
              </article>
            </div>

            <div className="pk-vstack-total" role="group" aria-label="Total value and price">
              <span className="pk-vs-gift" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v8H4v-8" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7S9.5 3 7.5 4.2 8 7 8 7h4zM12 7s2.5-4 4.5-2.8S16 7 16 7h-4z" /></svg>
              </span>
              <div className="pk-vs-total-left">
                <span className="pk-vs-total-lbl">Total value</span>
                <span className="pk-vs-total-fig">₹3,897</span>
              </div>
              <span className="pk-vs-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </span>
              <div className="pk-vs-pay">
                <span className="pk-vs-pay-lbl">You pay today</span>
                <span className="pk-vs-pay-fig">Free</span>
              </div>
            </div>

            <div className="pk-vstack-cta">
              <a className="cta-big" href="/apply" role="button">
                Book My Free 1:1 Call With Palak
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                </svg>
              </a>
              <p className="pk-cta-guarantee">Completely free &middot; No obligation</p>
            </div>
          </div>
        </section>

        {/* ============================================== 9 · THE OFFER (walk-away ledger + price + guarantee) */}
        <section className="section section--light" id="book" data-reveal aria-label="Book a Clarity Call">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">The next step</span>
              <h2 className="display">Book a Clarity Call: a 30-minute clinical assessment of what is actually going on with your body.</h2>
            </div>

            <div className="pk-offer">
              <p className="pk-offer-intro">This is not generic advice, and it is not a chit-chat sales call. It is a focused, 1:1 clinical assessment with me. In 30 minutes we look at your specific situation, and <strong>you walk away with three things you do not have right now:</strong></p>

              <div className="pk-walkaway" role="list">
                <div className="pk-wa" role="listitem">
                  <span className="pk-wa-num" aria-hidden="true">01</span>
                  <div>
                    <span className="pk-wa-label">The cause</span>
                    <p className="pk-wa-body">What is most likely causing <em>your</em> tiredness, bloating, and stuck weight, based on your history and your reports.</p>
                  </div>
                </div>
                <div className="pk-wa" role="listitem">
                  <span className="pk-wa-num" aria-hidden="true">02</span>
                  <div>
                    <span className="pk-wa-label">The tests</span>
                    <p className="pk-wa-body">Which tests you actually need next, the specific markers your current reports are missing.</p>
                  </div>
                </div>
                <div className="pk-wa" role="listitem">
                  <span className="pk-wa-num" aria-hidden="true">03</span>
                  <div>
                    <span className="pk-wa-label">The order</span>
                    <p className="pk-wa-body">What to fix first, so you stop spending money and energy in the wrong order.</p>
                  </div>
                </div>
              </div>

              <p className="pk-offer-clarity">You leave with <strong>real clarity about your own body</strong>, whether or not we work together after this.</p>

              <p className="pk-offer-intro">Almost every woman asks this, so: <strong>do not wait for your reports before you book.</strong> You see the doctor first, and they tell you which tests to run. Same here. I look at your case, then I tell you <strong>exactly which bloodwork you actually need.</strong></p>

              <div className="pk-price">
                <span className="pk-price-fig">Free</span>
                <p className="pk-price-reframe">The call itself is free. But it is <span className="strike">not open to everyone</span>, it is <span className="real">by application</span>. A few short questions keep this space for women who are genuinely ready to fix this, not just collect more opinions. <strong>If that is you, the application will be the easiest thing you do on this page.</strong></p>
              </div>

              <div className="pk-guarantee">
                <span className="pk-seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5l7 3v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V5.5z" /><path d="M8.5 12l2.4 2.4 4.6-4.8" /></svg>
                </span>
                <p className="pk-guarantee-text">And there is nothing to lose here. You are not paying anything, and you are not signing up for anything. <strong>The only thing you are putting in is 30 minutes.</strong> You leave with real clarity about your own body, whether or not we work together after this.</p>
              </div>

              <div className="pk-offer-cta">
                <a className="cta-big" href="/apply" role="button">
                  BOOK MY FREE 1:1 CALL WITH PALAK
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                  </svg>
                </a>
                <p className="pk-cta-guarantee">Completely free &middot; No obligation</p>
                <p className="pk-cta-microline">Apply in 30 seconds &middot; 30 minutes, 1:1 with Palak &middot; Free</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 10 · WHO THIS IS / IS NOT FOR (fit contrast) */}
        <section className="section section--soft" id="fit" data-reveal aria-label="Who this is for">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Let us be honest about fit</span>
              <h2 className="display">This is for a specific woman. It is not for everyone.</h2>
            </div>

            <div className="pk-fit">
              <div className="pk-fit-col pk-fit-col--yes">
                <div className="pk-fit-head">
                  <span className="pk-fit-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg>
                  </span>
                  <span className="pk-fit-title">This is for you if</span>
                </div>
                <ul className="pk-fit-list">
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span><span>You already know something is wrong in your body, even while you are told to just raise the dose and wait.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span><span>You are on thyroid medication and the dose keeps going up, not down.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span><span>You have, or think you might have, Hashimoto&rsquo;s, a thyroid condition, advanced PCOS, or a complex gut issue.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span><span>You have been told &ldquo;this is just how it is&rdquo; and something in you refuses to accept that.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span><span>You are ready to find and fix the real cause, not manage symptoms for the rest of your life.</span></li>
                </ul>
              </div>

              <div className="pk-fit-col pk-fit-col--no">
                <div className="pk-fit-head">
                  <span className="pk-fit-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7L7 17" /></svg>
                  </span>
                  <span className="pk-fit-title">This is not for you if</span>
                </div>
                <ul className="pk-fit-list">
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7L7 17" /></svg></span><span>You are looking for a quick fix or a crash plan with no testing behind it.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7L7 17" /></svg></span><span>You want someone to simply hand you a diet and not look at why your body is not responding.</span></li>
                  <li className="pk-fit-item"><span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l10 10M17 7L7 17" /></svg></span><span>You are not willing to run the bloodwork that finding the real cause requires.</span></li>
                </ul>
              </div>
            </div>

            <p className="pk-fit-foot">Thyroid and Hashimoto&rsquo;s are where I go deepest. The same root-cause work is also how I help women with PCOS, with complex gut issues, and women who simply want their energy back and to feel younger than their age. The body heals the same way: <strong>find the root, and fix it in the right order.</strong></p>

            <p className="pk-fit-foot">I would rather you decide this is not for you now than book a call that was never going to fit. <strong>If you are still reading, you are very likely the woman this was built for.</strong></p>
          </div>
        </section>

        {/* ============================================== 11 · FAQ (objection ledger) */}
        <section className="section section--light" id="faq" data-reveal aria-label="Before you book">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Before you book</span>
              <h2 className="display">The questions women ask me before they say yes.</h2>
            </div>

            <div className="pk-faq">
              <details className="pk-faq-item" open>
                <summary>
                  <span className="pk-faq-q">I have already done blood tests. More than once.<span className="pk-faq-most"><span className="dot" aria-hidden="true"></span>Most asked</span></span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Almost every woman I work with has, and they were right to. The issue is not that you have not tested, it is <em>which</em> markers were run. A standard panel checks only a few things and stops. On the call I will tell you exactly which markers your existing reports are missing, so even if you have tested three times, you will finally see what was never measured.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">My doctor says I am fine.</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>On medication your thyroid number gets pulled into range, so you are told it is controlled and you are fine now. But feeling exhausted, bloated and off is a different question, and raising the dose was never built to answer it. Your number being controlled and you actually feeling well are not the same thing, and the gap between them is exactly what we look at.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">If it is free, why do I have to apply?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Because the application filters. Palak only has a limited number of these slots each week, and the questions make sure the women on her calendar are actually dealing with a thyroid or related concern and are ready to act on what they hear. That is the only way she can give each one a real clinical assessment instead of a rushed pitch. It takes about 30 seconds.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">Will this work with my Hashimoto&rsquo;s and my thyroid medication?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>This is exactly who this is built for. We never ask you to stop any medication. We work alongside it, find what is actually driving the condition, and fix the cause, which is often why women on medication still feel unwell. Divya started exactly here. You can read what changed for her above.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">I already eat very clean and take my supplements. What more is there?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>That is often the most frustrating place to be, and it usually points to step two. If your gut is not absorbing, even perfect food and supplements cannot reach your body. This is the 180g-of-protein, still-not-improving situation. The effort was never the problem. Your gut not absorbing it was.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">Should I get my tests done before I book?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>No, and please do not wait for that. You see a doctor first, and the doctor tells you which tests to do. This call is the same. You come on the call, I look at your case, and then I tell you exactly which bloodwork you actually need. The bloodwork is the first step inside the program, not something you finish before we even talk. Waiting until your reports are ready is exactly what keeps women stuck for another six months.</p></div>
              </details>

              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">What actually happens on the call?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>30 minutes, 1:1, on video. We go through your situation, I tell you what is most likely causing it, which tests you need, and what to fix first. You leave with a clear picture of your own body, whether or not we work together afterwards.</p></div>
              </details>
            </div>
          </div>
        </section>

        {/* ============================================== 12 · FINAL CTA (dark premium peak) */}
        <section className="pk-finale" data-theme="dark" aria-label="Book your call">
          <div className="pk-finale-inner">
            <span className="eyebrow">You have felt this long enough</span>
            <h2>You already know your body is not &ldquo;just fine.&rdquo; <em>You have known it for a long time.</em></h2>
            <div className="pk-finale-body">
              <p>You were never the reason things have not improved. The picture was incomplete. Thirty minutes from now, you could finally know the actual cause.</p>
            </div>

            <a className="cta-big" href="/apply" role="button">
              BOOK MY FREE 1:1 CALL WITH PALAK
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
              </svg>
            </a>
            <ul className="pk-cta-points" aria-label="What the call is">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
                30-minute 1:1
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" />
                </svg>
                Not a sales pitch
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" />
                </svg>
                Completely free, no obligation
              </li>
            </ul>
          </div>

          <div className="pk-colophon">
            <span className="pk-colophon-line">&copy; 2026 FitWithPalak &middot; Clinical Track</span>
            <span className="pk-colophon-orn" aria-hidden="true">&#10022;</span>
            <nav className="pk-colophon-nav" aria-label="Footer">
              <a href="/apply">Book</a>
              <a href="#faq">FAQ</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms &amp; Conditions</a>
            </nav>
          </div>
        </section>

        {/* case-study video modal — kept at the root of <main> so its overlay sits
            above the sticky header + CTA (not trapped inside a section stacking context) */}
        <div className="pk-case-modal" id="caseModal" aria-hidden="true">
          <div className="pk-case-modal-bg" data-close></div>
          <div className="pk-case-modal-inner" role="dialog" aria-modal="true" aria-label="Client story video">
            <button className="pk-case-modal-close" type="button" aria-label="Close video" data-close>&times;</button>
            <video className="pk-case-modal-video" id="caseModalVideo" controls playsInline preload="none"></video>
          </div>
        </div>
      </main>
    </>
  );
}
