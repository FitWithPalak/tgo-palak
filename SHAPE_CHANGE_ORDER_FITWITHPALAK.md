# Change-Order — Upgrade the shape + design-system agents (from the FitWithPalak build)

**For:** the Claude Code agent running inside the forked `claude-systems` repo
(github.com/ManavLohia945/claude-systems) — **make all edits on the `update` branch.**

**Why this exists.** The `shape` agent's *first* output (after `no-brainer` supplies copy)
currently lands ~70%. Building the "FitWithPalak — Clinical Track" VSL funnel (landing +
checkout + book-a-call + thank-you + legal) surfaced ~22 corrections. Unlike a pure mobile
ledger, the dominant failures here were **layering / stacking-context bugs**, **components
built against placeholder content and placeholder assets**, and **third-party embeds shipped
without hardening or a human fallback** — plus a set of mobile breakages. This document
distils every one of those into concrete edits, **routed to the correct file**, so the *next*
first output starts at ~90%.

**How to apply.** Each entry says *which file, which section,* and gives a **paste-ready
block** in that file's own voice. Keep existing numbering and voice — **append, don't
renumber.** Files are referenced repo-relative:

| Layer | File (repo-relative) | What lives here |
|---|---|---|
| Agent | `agents/atul/shape.md` | S.H.A.P.E. formula, craft rules, LEARN loop |
| Tier 2 — vocabulary (GROWS) | `refs/atul/shape/structure-library.md` | 13 category → component options + Append-log |
| Tier 1 — brain (stable) | `systems/atul/design-system.base.md` | Concepts C1–C13, Recipes R1–R12, anti-slop, checklist |
| Layer 3 — skin | `systems/atul/design-system.skin.tgo-wellness.md` | Tokens + literal CSS |

> If your fork's folder segment isn't `atul/`, adjust that segment only; the filenames and
> section names are the same. Precedence is unchanged: **a base concept beats a skin value.**

**Routing legend** (used below): `[BASE-C]` new/edited concept · `[BASE-R]` recipe ·
`[BASE-AS]` anti-slop · `[BASE-CHK]` checklist · `[LIB]` structure-library option + Append-log ·
`[SHAPE]` agent craft · `[SKIN]` tokens/CSS · `[COPY]` no-brainer (noted, not applied here).

---

## 0 · ⚠️ READ FIRST — co-submission & numbering protocol

This change-order is being submitted **alongside a second change-order derived from the
"Kraft With Kunal" build**. They were produced from two different projects and mostly cover
different ground, but they **collide in three places**. Resolve as follows — do not apply
blindly.

| Collision | Kraft order says | This order says | **Resolution** |
|---|---|---|---|
| Concept id `C14` | claims **C14 · Responsive is a first-class state** | needs two new concepts | **Kraft keeps C14.** This order's concepts become **C15** and **C16**. If the Kraft order is *not* applied, shift these down to C14/C15 and promote §3 below into its own concept. |
| Anti-slop item `15` | appends `15. ¬C14` | needs two entries | Kraft keeps **15**; this order appends **16** and **17**. |
| Structure-library §10 entry | files *"Collapsed order-summary bar above the form"* `[SHIPPED]` | independently shipped the same pattern | **Do not file a duplicate.** File **one merged entry** noting two independent instances (§6b below). Keep `[SHIPPED]` — cross-project recurrence is *not* liveness, and this file's own honesty rule reserves `[EMPIRICAL]` for shipped-and-live/Atul-approved. |

Everything in §3 of this document is written as an **additive block appended to Kraft's C14**
rather than a competing concept, for exactly this reason.

**Suggested apply order:** Kraft order first (it establishes C14), then this one.

---

## 1 · THE #1 UPGRADE — The layering ladder  `[BASE-C] [BASE-AS] [BASE-CHK] [SKIN]`

**Root finding:** the brain is **completely silent on z-index and stacking contexts.** It
teaches depth as *light* (C4, C5) but never as *order*. The result was the single worst bug
of the build: the testimonial lightbox was authored inside `<section id="proof">`, which
carries `isolation:isolate` for its own atmosphere. That isolation trapped the modal's
`z-index:1000` inside the section's stacking context, so the sticky header and sticky CTA
painted **over** the modal and hid its close button on mobile — the user was locked in a
video with no way out. Nothing in C1–C13 would have caught it, and no amount of responsive
doctrine would either. This is a distinct axis and needs a concept.

### 1a. Add a new concept — `systems/atul/design-system.base.md`, in **`# LAYER 1 — Concepts`**, appended after C14

```
**C15 · The layering ladder — depth is order, not just light.** C4/C5 make surfaces *look*
deep; this makes them *stack* correctly. A page has exactly one layering ladder, declared
once, and every fixed/absolute element takes a rung on it. Overlays live at the ROOT of the
document tree — never inside a section.
*Why:* the premium tells (isolation, atmospheric stages, transforms, backdrop filters) all
silently create **stacking contexts**. A z-index authored inside one is scoped to it and
cannot rise above page chrome, no matter how large the number. This is invisible on desktop
and traps the user on mobile, where the chrome is proportionally huge.
*Rules (skin-agnostic):*
- **The ladder is declared once and never improvised.** In-flow content `0–9` · in-section
  focal affordances (play discs, tags, badges) `10–19` · reserved `20–39` · sticky nav `40` ·
  sticky page chrome (announcement strip, sticky CTA bar) `50` · top-most chrome (scroll
  progress) `60` · **overlays (modal / lightbox) `1000`** · toasts `1100`. A number outside
  the ladder is a bug, not a preference.
- **Overlays are rendered at the root of the page tree.** A modal, lightbox, drawer or toast
  authored inside a section is trapped by that section's stacking context and will be painted
  over by page chrome. Move it out; do not raise its z-index.
- **Know what creates a stacking context.** `isolation:isolate`, any `transform`, `filter`,
  `backdrop-filter`, `will-change`, `contain`, `opacity < 1`, and `position` + `z-index`. The
  brain's own recipes use several of these for atmosphere (C5) — so assume every decorated
  section is a stacking context and author overlays outside it.
- **An overlay must fully occlude the chrome it outranks.** Its backdrop is opaque enough
  (≥ 0.9 alpha + blur) that a sticky header/CTA underneath is invisible, not ghosted through.
- **The dismiss affordance is always reachable.** On small screens pin close/back to the
  viewport (`position:fixed`, top-right, ≥ 44px, offset by `env(safe-area-inset-top)`), never
  to the media's corner — portrait media of unknown height pushes a corner-anchored button
  under the notch or off-screen. Scroll-lock the body while open; ESC and backdrop-tap close.
- **Sticky chrome is a budget, not a habit.** Count what is simultaneously fixed on a phone
  (announcement + nav + sticky CTA + progress bar can eat ~35% of a 667px viewport). If the
  budget is exceeded, chrome sheds — it does not overlap the content it is meant to serve.
*Seen:* FitWithPalak (case-study lightbox moved out of `#proof{isolation:isolate}` to the root
of `<main>`; backdrop `.86 → .94` + blur `4 → 6px`; mobile close re-pinned to fixed
safe-area top-right).
```

### 1b. Add its inversion — same file, **`# Anti-slop`** list (append as item 16)

```
16. **¬C15** — a modal or lightbox authored inside a decorated section; z-index numbers
invented per element instead of taken from the ladder; an overlay whose backdrop lets the
sticky header ghost through; a close button anchored to media of unknown height so it lands
under the notch; three or four pieces of sticky chrome fixed at once on a phone.
```

### 1c. Add its checklist line — same file, **`# Self-review checklist`** (append)

```
- [ ] **C15** every fixed/absolute element takes a declared rung; overlays live at the page
  root (not inside an `isolation`/`transform` section); backdrop fully occludes chrome;
  dismiss is fixed, ≥44px, safe-area-aware; simultaneous sticky chrome is within budget?
```

### 1d. Canonical ladder values — `systems/atul/design-system.skin.tgo-wellness.md`

Append to the end of **`## Tokens (OKLCH)`** (as a documented comment — the ladder is a
convention, not a runtime value, and must be identical across skins):

```
/* C15 layering ladder (canonical; the brain's C15 is the principle, these are the rungs).
   Every fixed/absolute element takes a rung. Numbers outside this list are bugs.
     0–9     in-flow content
     10–19   in-section focal affordances (play disc, tag, badge, runtime chip)
     20–39   reserved
     40      sticky nav
     50      sticky page chrome (announcement strip, sticky CTA bar)
     60      top-most chrome (scroll-progress rail)
     1000    overlays — modal / lightbox  (MUST be authored at the page root)
     1100    toasts
   Overlay backdrop: >= .9 alpha + blur, so sticky chrome underneath is occluded, not ghosted. */
```

---

## 2 · Build for the real thing, not the placeholder  `[BASE-C] [BASE-AS] [BASE-CHK]`

**Root finding:** components were authored against **invented placeholder content and
placeholder assets**, then broke the moment reality arrived. A testimonial card built for a
one-line pull-quote received a four-line real review and went ragged. A three-column support
grid received one item and left it stranded hard-left. Thumbnails shipped at 1.6–2.2 MB each
because nobody owned asset weight. Supplied thumbnails already carried their own play glyph,
so the recipe's play disc stacked a second affordance on top of it. And two third-party
embeds (Vimeo, Calendly) shipped with no hardening and no fallback for when they fail the
user. None of this is a taste failure — it is a **contract** failure, and the brain has no
contract.

### 2a. Add a new concept — `systems/atul/design-system.base.md`, in **`# LAYER 1 — Concepts`**, appended after C15

```
**C16 · Build for the real thing — real copy, real counts, real assets, real embeds.** A
component is authored against the content and assets that will actually ship, at their real
lengths, real counts and real weights. Placeholder-shaped components are a debt that always
comes due in review.
*Why:* every "this looks average" note traces back to a component that was correct for the
lorem and wrong for the truth. Designing for the real payload is cheaper than redesigning
after it lands.
*Rules (skin-agnostic):*
- **Copy length is a range, not a value.** Any repeated text slot (quote, card body, list
  item, feature line) is authored to hold its *shortest and longest* real instance. Sibling
  cards equalise (`align-items:stretch` / matched rows) so a long one doesn't orphan a short
  one; if truncation is used it is deliberate (`-webkit-line-clamp`) with the full text
  reachable, never an accidental overflow.
- **Item counts vary — the layout must not assume N.** A layout that only reads correctly at
  its authored count is broken. A fixed N-column grid stranding a lone item hard-left is the
  classic tell: use centred flex with `flex-basis` + `wrap` (which reads correctly at 1, 2, 3
  and 7) rather than `grid-template-columns:repeat(3,1fr)`, unless the count is genuinely
  fixed and owned.
- **Assets carry a budget and a provenance.** Photographic content ships as WebP/AVIF, sized
  to its rendered box, target < 250KB (hero < 400KB); PNG only for transparency; SVG for
  marks. **Never commit the raw source asset next to the derived one.** State the derivation
  in the build note ("logo: transparent PNG derived from the supplied JPEG"), so the next
  agent doesn't re-derive or ship the source by mistake.
- **Do not decorate media that already carries its own affordance.** If a supplied thumbnail
  already contains a play glyph, a name plate or branding, the recipe's overlay affordance is
  *removed*, not stacked on top. Two play buttons on one tile is the loudest amateur tell in
  the set. The recipe describes the *job*; the asset may already do it.
- **Third-party embeds are hardened AND given a human fallback.** Extending C12: the embed
  gets a neutral inset panel + branded placeholder (C12), *plus* — (a) it is reachable in one
  user gesture, not two (a poster tile that swaps in a player must hand the play intent
  through, e.g. by injecting `autoplay=1&playsinline=1` into the src on first tap, not
  requiring a second tap inside the widget); (b) an explicit height/aspect reservation so it
  never lands at 0px or collapses on load; and (c) **a visible human fallback directly
  beneath it** — a real contact route with a pre-filled message — for the guaranteed case
  where the third party shows the user nothing (no slots, region block, blocked script). An
  embed is a dependency you do not control; shipping it as the only path forward is shipping
  a dead end.
- **Commercial values live in one config module.** Price, currency, canonical host, support
  contacts and third-party URLs are read from a single source, never inlined into components
  — a price change must be one edit, not a grep across the funnel.
*Seen:* FitWithPalak (testimonial cards rebuilt for four-line real reviews; three-column
support grid → centred flex after dropping to one item; supplied thumbnails' overlay play +
tag removed as redundant; brand logo derived to transparent PNG; Vimeo poster→player handoff
made one-tap; a WhatsApp + email fallback box welded under the Calendly embed; price moved to
`PRICE_INR` after ₹599 → ₹499 required touching seven files).
```

### 2b. Add its inversion — same file, **`# Anti-slop`** list (append as item 17)

```
17. **¬C16** — cards designed for lorem that go ragged on the real quote; a fixed 3-column
grid holding one stranded item; multi-megabyte PNGs where a WebP was the answer; the source
asset committed beside its derivative; a play disc stacked on a thumbnail that already has
one; a third-party embed with no height reservation, a two-tap play, or no human fallback
when it shows the user nothing; a price hardcoded across components.
```

### 2c. Add its checklist line — same file, **`# Self-review checklist`** (append)

```
- [ ] **C16** authored against real copy at its real length range, real item counts (does it
  read at N=1?), budgeted real assets (no source-beside-derivative), no affordance stacked on
  self-contained media, embeds hardened + one-gesture + human fallback, commercials in config?
```

---

## 3 · Additions to C14 (responsive) — merge, do not duplicate  `[BASE-C]`

The FitWithPalak build independently produced the same responsive finding as the Kraft build,
which is strong corroboration for C14. It also surfaced **three rules Kraft's C14 does not
cover.** Append them to the existing C14 `*Rules*` list rather than creating a second concept.

**Edit** `systems/atul/design-system.base.md`, the **C14** entry, appending to its `*Rules*`:

```
- **A pill is not a paragraph — the primary CTA must fit the narrowest viewport.** A
  first-person CTA carrying the price (C10/R3) is inherently long. On small screens it goes
  full-width with reduced type/padding rather than overflowing or being truncated. Verify at
  360px with the *longest* label the copy agent may produce, not the current one.
- **Horizontal composites re-stack vertically, including their connectors.** A row that reads
  "A → B" (value → price, before → after, step → step) collapses to a column on small
  screens *and its directional connector rotates with it* (a `→` becomes a `↓`). A horizontal
  arrow in a vertical stack points at nothing and reads as a rendering bug.
- **Chrome sheds before content does.** When the viewport narrows, page chrome gives up its
  optional elements first (a nav CTA pill that duplicates the hero CTA and the sticky bar is
  dropped, not shrunk) so the content keeps its width. Decide what each piece of chrome is
  *for*; if a wider element already does that job on mobile, the chrome version goes.
```

Also append to C14's `*Seen:*` line:

```
· FitWithPalak (full-width CTA pill < 560px; value-stack total bar re-stacked with its arrow
rotated 90°; nav CTA pill dropped on mobile where the hero CTA + sticky bar already cover it;
fallback action buttons columned < 520px)
```

---

## 4 · Agent process upgrades  `[SHAPE]`

**Edit** `agents/atul/shape.md`. Four changes; each targets a failure the brain cannot fix
because it is a *process* failure, not a principle failure.

### 4a. The gate must be run against the OFFER, not only the copy sections

**Root finding:** the first output had **no value-stack section at all**, despite the offer
being an obvious accumulation (call + analysis + community → a total, against the price). The
category existed in the library (§3) and went unused, because SHAPE walked the *copy
document* section-by-section and the copy document had no "value stack" heading. The gate
fired correctly on every section it was shown — it was never shown the offer.

**Under `## How to operate`, add as a new step before the mode branches:**

```
0. **Sweep the OFFER before you sweep the sections.** The copy document's headings are not
   the complete set of candidate sections. Before walking it, read the offer itself — what is
   included, what it is worth, what it costs, what the risk reversal is — and run THE GATE
   against *that*. An offer whose parts sum to a value carries an accumulation structure
   (library §3) whether or not the copy has a heading for it; a price that needs justifying
   carries a price-reframe (§13). If the structure is there and the copy has no section for
   it, say so and propose the section — a missing structured section is as much a SHAPE
   finding as a mis-rendered one. Flag it to the copy agent rather than inventing the words.
```

### 4b. Section ORDER is a SHAPE output

**Root finding:** proof was placed low in the first output and had to be moved to the third
section; the value stack had to be inserted before the final CTA. SHAPE audits sections
*individually* and has no doctrine on *sequence*, so order was inherited from the copy
document by default and re-litigated by hand.

**Under `## Craft rules`, add:**

```
- **Order is a decision you own, not an inheritance.** The copy document's sequence is a
  draft, not a spec. BUILD and AUDIT both emit an explicit section ORDER with a one-line
  justification per move. Defaults, absent a reason: proof appears **early** (within the
  first three sections — it buys the attention the rest of the page spends, and burying it
  below the fold wastes it); the accumulation/value-stack sits **immediately before the final
  CTA** (the stack is the argument the CTA closes on); the price-reframe follows the stack,
  never precedes it. Deviating is fine — say why.
- **Tonal rhythm is part of the order.** Stage tone alternates deliberately and the funnel's
  emotional peak (usually the finale) is the darkest beat. **Post-conversion utility pages
  (checkout, booking, confirmation) stay light** — re-introducing the sales page's dark stage
  after the customer has paid reads as pressure exactly where you owe them relief.
```

### 4c. Pre-BUILD asset & content protocol

**Root finding:** the build proceeded on invented placeholders (one-line quotes, a text
wordmark, a stock-ish poster), all of which were replaced later at the cost of a rebuild.
The assets and copy existed — they were simply never asked for.

**Under `## How to operate`, inside the BUILD step, add:**

```
   **Before building, request the real payload — once, as a single list.** Brand mark (vector
   or transparent PNG, plus what it may sit on); the real proof assets (thumbnails, videos,
   and the *full* written testimonials at their real length, with the person→asset mapping
   confirmed); any client-supplied imagery with its intended crop; the commercial values
   (price, currency, canonical host, support contacts, third-party URLs). Build against what
   arrives. For anything that does not arrive, ship the placeholder **visibly declared** as a
   placeholder in the handoff note (per Honesty) — never let an invented one-line quote or a
   text wordmark pass silently as the finished article. State which components will need
   rework when the real payload lands.
```

### 4d. Ship tone-uncertain sections with a swappable class

**Root finding:** the proof section's stage tone (deep-wine vs soft-light) was genuinely a
matter of taste and was going to be re-litigated regardless. Shipping it with **both skins
defined and a one-word class swap** collapsed what would have been a rebuild cycle into a
single-token decision — and the same trick was *not* used on the value-stack section, which
duly cost a full rebuild when its stage was changed from dark to light.

**Under `## Craft rules`, add:**

```
- **When a section's stage tone is a genuine taste call, ship the switch, not the argument.**
  Define both treatments in the stylesheet and expose the choice as a single class on the
  section (`proof-wine` ↔ `proof-soft`). Name it in the handoff so the decision costs one
  word instead of a rebuild. Use this only for *tone* on a section whose structure is settled
  — it is a decision-cost reducer, not a licence to avoid deciding structure.
```

### 4e. Build-time gotchas (append to the same subsection the Kraft order creates)

If the Kraft order has been applied, `## Craft rules` already contains a
**`### Build-time gotchas`** subsection. **Append these; do not create a second subsection.**
If Kraft has not been applied, create the subsection with this content.

```
- **Commercial values come from one config module.** Price, currency, canonical host, support
  contacts and third-party URLs are imported, never inlined. Changing a price must be one
  edit. (Brain C16.)
- **Framework-inlined env vars are baked at build/start, not read at runtime.** Anything
  public-prefixed is substituted into the bundle — editing the env file without restarting
  leaves the old value on screen and produces a phantom "the fix didn't work." Restart, then
  verify the rendered value in the served HTML, not in the source.
- **Never build against a running dev server.** Producing a production build while the dev
  server holds the same output directory corrupts it (symptom: a missing chunk module, a page
  that renders but never hydrates, client storage appearing empty). Stop the server, clear
  the build output, then build.
- **An overlay authored inside a section is trapped there.** See brain C15 — this is a
  layering rule, but it presents as a framework bug ("my z-index:1000 doesn't work"), so
  recognise it here too: the fix is to move the node to the page root, never to raise the number.
```

### 4f. Honesty extension

**Under `## Honesty`, append a bullet:**

```
- **Declare placeholders as placeholders.** If a component ships against invented copy, a
  stand-in asset, or an unconfirmed mapping (which testimonial belongs to which person), say
  so explicitly in the handoff and name what will need rework when the real payload lands. A
  placeholder presented silently as finished work is the same failure as inventing structure
  — it just takes a review cycle longer to surface.
```

---

## 5 · Recipe refinements  `[BASE-R]`

**Edit** `systems/atul/design-system.base.md`, **`# LAYER 2 — Recipes`**.

### 5a. `### R7 · Proof / testimonial card` — append

```
*Lightbox spec (C15/C16 — this is where R7 actually broke):* the lightbox is authored at the
**page root**, never inside the proof section — proof sections carry `isolation`/atmosphere
per C5 and will trap it beneath page chrome. Backdrop ≥ .9 alpha + blur so sticky chrome is
occluded; body scroll-locked while open; ESC + backdrop-tap close; on small screens the close
control is `position:fixed` top-right, ≥44px, offset by `env(safe-area-inset-top)` — never
anchored to the media's corner, whose position is unknown for portrait assets.
*Media note (C16):* if the supplied poster already carries its own play glyph, name plate or
branding, **remove** the recipe's play disc and meta tag rather than stacking a second
affordance on it. Author the quote slot for the real review length (typically 3–5 lines, not
a one-liner) with siblings equalised.
```

### 5b. `### R11 · Checkout / order-summary surface` — append

> If the Kraft order has already rewritten R11 to be mobile-first, **append only this
> paragraph**; the mobile-first anatomy is already correct and this build corroborates it.

```
*Corroboration + content note:* a second independent build (FitWithPalak) arrived at the same
mobile-first shape — a collapsed, tap-to-expand summary bar ABOVE the form on small screens,
relaxing to a sticky panel beside the form on wide ones. Two independent derivations; treat
the mobile-first anatomy as settled. Content note: the summary is the **accumulation** (R5 /
library §3), not a single line — itemise what is included with a per-item value and let the
Total be the lit value-moment (C3). A one-line "Clarity Call — ₹499" summary wastes the last
surface before payment, where the buyer's doubt peaks. Only show a struck value if the offer
is genuinely stacked; never fabricate an anchor.
```

### 5c. `### R2 · Hero (offer / VSL)` — append

```
*Embed note (C16):* when the focal object is a third-party player rather than a native
`<video>`, the poster tile must hand the play intent *through* — the first tap swaps in the
iframe with autoplay/inline flags already injected into the src — so the viewer plays in one
gesture, not two (tap the poster, then hunt the widget's own button). Reserve the frame's
aspect explicitly so the embed cannot land at 0px, and keep a real poster on the native path
too — a focal object that flashes black before first frame undoes the atmosphere C5 built.
```

### 5d. `### R12 · Confirmation / "what happens next" surface` — append

```
*Dependency note (C16):* when the confirmation surface's next step is a third-party embed
(scheduler, community link, payment portal), weld a **human fallback** directly beneath it —
a real contact route with a pre-filled message — for the guaranteed case where the widget
shows the user nothing (no availability, region block, blocked script). The calm of R12 is
the promise that the transaction is handled; a dead embed with no fallback breaks exactly
that promise at the worst possible moment.
```

---

## 6 · Component vocabulary upgrades  `[LIB]`

**Edit** `refs/atul/shape/structure-library.md` — add these options under the named
categories (keep the `name — the structure/interaction — why it fits the meaning — weight —
instance/recipe — [provenance]` format), then add the Append-log line.

### 6a. Under `## 3 · ACCUMULATION / VALUE-STACK`

```
- **Poster-card value stack + total bar** — the included items as 2–4 image-led poster cards
  (one supplied visual per item, mono eyebrow + name + its individual value), followed by a
  single total bar that sums them, strikes the total value, and lands on the price with a
  savings pill; on small screens the bar re-stacks vertically and its `→` connector rotates
  to `↓` — a warmer, more tangible read than a ruled ledger when each item has a real visual
  and the audience buys on feel rather than on audit; the bar keeps the ledger's arithmetic
  honesty — `medium` — FitWithPalak `.pk-vstack-grid` + `.pk-vstack-total`; R5 variant, sits
  immediately before the final CTA — `[SHIPPED]`
```

### 6b. Under `## 10 · TRANSACTION` — **merged entry, see §0**

If the Kraft order's §10 entry is already present, **edit it** to add the second instance and
the content note below rather than filing a duplicate. If not, file this:

```
- **Collapsed order-summary bar above the form** — a single tap-to-expand bar (cart glyph ·
  "Order summary" · total · chevron) sits ABOVE the details form on small screens and expands
  to reveal the itemized stack, the lit total and the payment tiles; on wide screens it
  relaxes into a full sticky panel beside the form. The summary leads in the DOM so it is
  read first on mobile — why it fits: on a phone the buyer wants "what am I paying + how
  much" before touching fields, without a tall ledger shoving the form off-screen — `medium`
  — Kraft `/checkout` OrderSummaryBar; FitWithPalak `.pk-summary` / `.pk-summary-bar`
  (`order:-1`, `.is-open`); R11 mobile-first variant — `[SHIPPED · two independent
  derivations — Kraft, FitWithPalak]`
  (content: the expanded body is the §3 accumulation, not one line — itemise with per-item
  values and let the Total catch the light. Never fabricate a struck anchor to manufacture a saving.)
```

### 6c. Under `## 6 · PROOF / TESTIMONIAL`

```
- **Self-contained thumbnail grid + root-level lightbox** — supplied portrait thumbnails that
  already carry their own play glyph and branding are shown WHOLE and **undecorated** (no
  added play disc, no tag), with name + star row + the full written review beneath; tapping
  opens a lightbox authored at the PAGE ROOT (not inside the section) — why it fits: when the
  client supplies designed thumbnails, the recipe's affordance becomes a second play button
  on the same tile; stripping it is the upgrade — `light` — FitWithPalak `.pk-case-*` +
  root-level `#caseModal`; R7 variant, expresses C15/C16 — `[SHIPPED]`
  (trap: authoring this lightbox inside a section that carries `isolation:isolate` traps it
  below the sticky header and hides the close button on mobile. Brain C15.)
```

### 6d. Under `## 8 · FOCAL MEDIA / HOOK`

```
- **Poster → one-click third-party player handoff** — the poster tile IS the play affordance;
  the first tap swaps in the third-party iframe with `autoplay=1&playsinline=1` already
  injected into its src, so the viewer plays in ONE gesture instead of tapping the poster and
  then hunting the widget's own button; the frame's aspect is reserved so the embed can never
  land at 0px — why it fits: the existing VSL-frame option (this section) assumes a native
  `<video>` you control; when the media lives on Vimeo/YouTube the two-tap gap is where hook
  momentum dies — `light` — FitWithPalak `buildEmbedSrc()` in `app/FunnelEffects.tsx`; R2
  variant for embedded players — `[SHIPPED]`
  (caveat: unmuted autoplay after a user gesture is reliable on desktop and Android; on iOS
  Safari verify on a real device and keep the player SDK's `play()` as the fallback.)
```

### 6e. Under `## Welds (cross-category micro-treatments, not sections)`

```
- **Embed-failure human fallback** — a small welded box directly beneath any third-party
  embed (scheduler, payment, video) offering a real human route — WhatsApp and email buttons
  carrying a pre-filled subject/body naming the page and the intent — for the guaranteed case
  where the widget shows the user nothing (no availability, region block, blocked script). An
  embed is a dependency you don't control; shipping it as the only path forward ships a dead
  end at the exact moment the user has already decided to act — `light` — FitWithPalak
  `.pk-slot-help` under the Calendly embed; expresses C16/C12 — `[SHIPPED]`
- **Swappable section-tone class** — a section whose stage tone is a genuine taste call ships
  with BOTH treatments defined and the choice exposed as one class on the section
  (`proof-wine` ↔ `proof-soft`), named in the handoff — collapses a predictable rebuild cycle
  into a one-word decision. For *tone* only, on a section whose structure is settled; not a
  licence to defer structural decisions — `light` — FitWithPalak `#proof` — `[SHIPPED]`
```

### 6f. Append to `## Append-log (LEARN deposits)`

```
- 2026-07-22 — **FitWithPalak Clinical Track VSL funnel** (landing + checkout + book-a-call +
  thank-you; pink/plum wellness skin; business@trainergoesonline.com). Filed `[SHIPPED]`:
  poster-card value stack + total bar (§3), self-contained thumbnail grid + root-level
  lightbox (§6), poster→one-click third-party player handoff (§8), and two Welds — embed-
  failure human fallback, swappable section-tone class. Merged into §10: the collapsed
  mobile-first order-summary bar now carries a **second independent derivation** alongside
  Kraft — the mobile-first checkout anatomy is settled (still `[SHIPPED]`; cross-project
  recurrence is not liveness). Surfaced two brain-level gaps → new concepts **C15 · the
  layering ladder** (overlays trapped in section stacking contexts — the build's worst bug)
  and **C16 · build for the real thing** (real copy lengths, variable item counts, asset
  budgets, embed hardening + human fallback), each with its inversion and checklist line;
  three rules appended to **C14**; R2/R7/R11/R12 amended; SHAPE gained an offer-sweep step
  before the section walk (the value stack was missing entirely from the first output), an
  explicit section-ORDER output, a pre-BUILD asset request protocol, and a placeholder-
  declaration honesty rule. Upgrade to `[EMPIRICAL]` once vsl.palaksachdeva.com is live.
```

---

## 7 · Skin additions  `[SKIN]`

**Edit** `systems/atul/design-system.skin.tgo-wellness.md`. Deliberately thin — nearly every
finding in this order is concept-level, not palette-level. Three additions only (the layering
ladder in §1d above is the fourth).

Append to **`## Component CSS (highlight, eyebrow-pill, btn, reveal, section-head, annc, nav)`**:

```
/* C15 overlay primitive — MUST be authored at the page root, never inside a section.
   Backdrop opacity is load-bearing: it has to occlude the sticky nav + sticky CTA, not
   ghost them. Mobile close is pinned to the viewport, not to the media's corner. */
.overlay { position:fixed; inset:0; z-index:1000; display:none; place-items:center; padding:24px; }
.overlay.open { display:grid; }
.overlay-bg { position:absolute; inset:0; background:color-mix(in oklab,var(--ink) 94%,transparent); backdrop-filter:blur(6px); }
.overlay-close { position:absolute; top:-14px; right:-14px; z-index:3; width:40px; height:40px; border-radius:50%; }
@media (max-width:560px){
  .overlay-close { position:fixed; top:calc(env(safe-area-inset-top,0px) + 14px); right:14px; width:44px; height:44px; }
}

/* C16 embed frame — reserve the aspect so a third-party iframe can never land at 0px,
   and keep a branded placeholder underneath it (C12) while it loads. */
.embed-frame { position:relative; aspect-ratio:16/9; background:var(--canvas); }
.embed-frame > iframe { position:absolute; inset:0; width:100%; height:100%; border:0; z-index:1; }
.embed-ph { position:absolute; inset:0; z-index:0; display:grid; place-content:center; gap:14px; }
```

Append to **`## Tokens (OKLCH)`**, after the C15 ladder comment:

```
/* Stage-tone policy (C14/C15 + SHAPE order doctrine).
   Sales surfaces alternate light/soft and peak DARK at the finale.
   Post-conversion utility surfaces (checkout, booking, confirmation) stay LIGHT — never
   re-introduce the dark sales stage after the customer has paid. This is load-bearing:
   the dark stage reads as pressure where you owe relief.
   A section whose tone is a genuine taste call ships BOTH skins + a swap class
   (e.g. .proof-wine / .proof-soft) — see structure-library Welds. */
```

---

## 8 · Full iteration ledger (the raw evidence)

Every correction from the FitWithPalak build, with root cause and route. Commit hashes are
from `git@github.com:Trainer-Goes-Online/tgo-palak.git` (`main`). This is what "70% → 90%"
looks like in practice — the §1–§7 edits are designed to preempt these.

| # | Page / section | Device | What broke / looked average | Root cause | Commit | Route |
|---|---|---|---|---|---|---|
| 1 | Testimonial lightbox | mobile | close button painted UNDER the sticky header — user trapped in the video | modal authored inside `#proof{isolation:isolate}`; no layering doctrine | `482247f` | `[BASE-C C15]` `[SKIN]` |
| 2 | Testimonial lightbox | mobile | backdrop ghosted the header through at `.86` alpha | no occlusion rule | `482247f` | `[BASE-C C15]` |
| 3 | Proof section | all | placed low in the page; had to move to 3rd section | no section-ORDER doctrine | `62e08d8` | `[SHAPE 4b]` |
| 4 | Proof section | all | stage tone (wine vs soft) re-litigated by hand | tone call had no cheap switch | `62e08d8` | `[SHAPE 4d]` `[LIB Welds]` |
| 5 | Testimonial cards | all | built for one-line placeholder quotes; real reviews are 4 lines | authored against lorem | `c594b31` | `[BASE-C C16]` `[BASE-R R7]` |
| 6 | Testimonial cards | all | overlay play disc + tag stacked on thumbnails that already had them | recipe applied blind to the asset | `62e08d8` | `[BASE-C C16]` `[LIB §6]` |
| 7 | Value stack | all | **section absent entirely** from the first output | gate never run against the offer | `3514ad5` | `[SHAPE 4a]` `[LIB §3]` |
| 8 | Value stack | all | shipped on a dark stage; wanted light + white cards | no tonal-rhythm doctrine | `3514ad5` | `[SHAPE 4b]` `[SKIN]` |
| 9 | Value-stack total bar | mobile | cramped < 560px; `→` connector pointed sideways in a vertical stack | no re-stack + connector rule | `3514ad5` | `[BASE-C C14+]` |
| 10 | Primary CTA pill | mobile | long first-person label overflowed the viewport | no pill-fits-narrowest rule | `62e08d8` | `[BASE-C C14+]` |
| 11 | Nav CTA pill | mobile | competed with the hero CTA + sticky bar | no chrome-sheds rule | `62e08d8` | `[BASE-C C14+]` |
| 12 | book-a-call support list | desktop | 3-column grid holding ONE item, stranded hard-left | layout assumed N | `c594b31` | `[BASE-C C16]` |
| 13 | book-a-call slot-help | mobile | action buttons side-by-side, cramped < 520px | progressive disclosure | `9f3e11c` | `[BASE-C C14+]` |
| 14 | Calendly embed | all | showed no slots and offered the user no way forward | embed shipped as the only path | `9f3e11c` | `[BASE-C C16]` `[LIB Welds]` `[BASE-R R12]` |
| 15 | VSL (Vimeo) | all | two taps to play — poster, then the widget's own button | embed play intent not handed through | `ed89830` | `[BASE-C C16]` `[LIB §8]` `[BASE-R R2]` |
| 16 | VSL (native path) | all | no poster — flashed black before first frame | poster not part of the recipe's handoff | `e1f95f3` | `[BASE-R R2]` |
| 17 | Header brand | all | text wordmark stood in for a logo that existed | assets never requested | `9f3e11c` | `[SHAPE 4c]` |
| 18 | Header brand | repo | 2MB source JPEG committed beside the derived PNG | no asset provenance rule | `9f3e11c` | `[BASE-C C16]` |
| 19 | Thumbnails / posters | all | 1.6–2.2MB PNGs shipped as card thumbnails | no asset budget | `3514ad5` | `[BASE-C C16]` |
| 20 | Checkout summary | mobile | summary flowed BELOW the form | R11 not mobile-first | `f4ae9c1` | `[BASE-R R11]` `[LIB §10]` |
| 21 | Checkout summary | all | a bare one-line ledger on the last surface before payment | summary not treated as an accumulation | `f4ae9c1` | `[BASE-R R11]` `[LIB §10]` |
| 22 | Pricing | build | ₹599 → ₹499 required editing seven files | commercials inlined, not configured | `62e08d8` | `[SHAPE 4e]` `[BASE-C C16]` |
| 23 | Hero headline, legal copy | — | headline generic; legal placeholders (GST, jurisdiction) | copy | — | `[COPY]` no-brainer |

---

## 9 · Priority & expected impact (apply in this order)

1. **C15 layering ladder** (§1) — `[BASE]` `[SKIN]`. Preempts ledger rows 1, 2. *Low volume,
   highest severity:* this is the only failure in the set that **traps the user** rather than
   merely looking wrong, it is invisible on desktop, and no other concept in the brain would
   ever catch it. Ship this first.
2. **C16 build-for-the-real-thing** (§2) — `[BASE]`. Preempts rows 5, 6, 12, 14, 15, 18, 19, 22.
   *Biggest volume lever* — eight rows, and the one that most directly converts "this looks
   average" into a pre-empted defect.
3. **shape.md process upgrades** (§4) — `[SHAPE]`. Preempts rows 3, 4, 7, 8, 17, 22. Row 7 —
   an entire missing section — is the highest-value single catch in the document.
4. **C14 additions** (§3) — `[BASE]`. Preempts rows 9, 10, 11, 13. Corroborates the Kraft order.
5. **R2/R7/R11/R12 + Tier-2 deposits** (§5, §6) — `[BASE-R]` `[LIB]`. Preempts rows 5, 6, 14,
   15, 16, 20, 21, and settles the mobile-first checkout anatomy across two projects.

Done well, a fresh funnel's *first* shape output should already layer correctly (overlays at
the root, on a declared ladder), be authored against the real copy/assets/counts it will
actually ship, propose the value-stack section the offer implies rather than waiting to be
told, assemble a mobile-first itemized checkout, and never hand the user a third-party embed
with no way through — the ~90% target.

*Not applied here:* `[COPY]` items (row 23) belong to the `no-brainer` agent, not shape/design.
Analytics instrumentation (GA4/Meta CAPI) shipped in this build is out of scope for all four
files — it is neither structure nor design.
