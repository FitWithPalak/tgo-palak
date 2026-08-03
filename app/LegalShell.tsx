import Footer from "./Footer";

/** Shared chrome (topstrip + nav + footer) for the three legal pages. */
export default function LegalShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="urgency-strip pk-topstrip" role="note" aria-label="FitWithPalak">
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
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <a className="pk-nav-cta" href="/apply">Book My Clarity Call</a>
        </div>
      </header>

      <main className="section section--light">
        <article className="pk-legal">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="pk-legal-intro">{intro}</p>
          <p className="pk-legal-updated">Last updated: 8 July 2026</p>
          {children}
        </article>
        <Footer />
      </main>
    </>
  );
}
