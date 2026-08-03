import { brand } from "@/lib/config";

/** Shared site footer — legal links live here so every page carries them. */
export default function Footer() {
  return (
    <footer className="pk-colophon">
      <span className="pk-colophon-line">&copy; 2026 {brand.name} &middot; Clinical Track</span>
      <span className="pk-colophon-orn" aria-hidden="true">&#10022;</span>
      <nav className="pk-colophon-nav" aria-label="Footer">
        <a href="/">Home</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms &amp; Conditions</a>
        <a href={`mailto:${brand.supportEmail}`}>Contact</a>
      </nav>
    </footer>
  );
}
