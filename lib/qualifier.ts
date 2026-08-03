// Priority Call Qualifier — the step form that now sits between the
// landing-page CTA and the calendar. Answers decide the branch:
//   READY_YES -> /book-a-call      (qualified)
//   READY_NO  -> /thank-you-disqualified (shows their answers back to them)
//
// Shared by the modal (app/QualifierModal.tsx), the no-JS fallback page
// (app/apply), and the disqualified thank-you page, so the question text and
// the option strings only ever live here.

export type QuestionId =
  | "name"
  | "email"
  | "whatsapp"
  | "location"
  | "profession"
  | "concern"
  | "readiness";

export interface Question {
  id: QuestionId;
  kind: "text" | "email" | "tel" | "choice";
  /** Number shown to the user, 1-based. Derived from position — never authored,
   *  so inserting a question can't leave two screens claiming the same number. */
  step: number;
  title: string;
  /** Small italic line under the question. */
  help?: string;
  placeholder?: string;
  choices?: string[];
  /** Longer framing paragraph rendered above the question (Q6 only). */
  lede?: string;
}

/* The two answers on Q6 that drive the redirect. Compared by exact string, so
   they must never be edited in isolation — change here, everywhere follows. */
export const READY_YES = "Yes, I am ready to invest and take action.";
export const READY_NO = "I am not ready to take action right now.";

/* Q5 — the health-concern gate quoted on the disqualified page. */
export const CONCERN_THYROID = "Thyroid / Hashimoto's, diagnosed or suspected";
export const CONCERN_OTHER = "Something else";

export const PROGRAM_PRICE_LABEL = "₹40,000";
export const PROGRAM_DURATION = "3 months";

const QUESTION_SPECS: Omit<Question, "step">[] = [
  {
    id: "name",
    kind: "text",
    title: "Your first name",
    placeholder: "First name",
  },
  {
    id: "email",
    kind: "email",
    title: "Your email address",
    help: "Your call link and confirmation go here",
    placeholder: "you@example.com",
  },
  {
    id: "whatsapp",
    kind: "tel",
    title: "Your WhatsApp number",
    help: "We send your call details, prep and reminders here",
    placeholder: "10-digit mobile number",
  },
  {
    id: "location",
    kind: "choice",
    title: "Where are you currently based?",
    choices: ["India", "Dubai / UAE", "Singapore", "UK", "US / Canada", "Other"],
  },
  {
    id: "profession",
    kind: "choice",
    title: "What is your current profession?",
    choices: [
      "Founder or Business Owner",
      "CEO or Senior Executive",
      "Working Professional - Doctor, Lawyer, Banker, Consultant or similar",
      "Homemaker",
      "Other",
    ],
  },
  {
    id: "concern",
    kind: "choice",
    title: "What's your main health concern right now?",
    choices: [CONCERN_THYROID, CONCERN_OTHER],
  },
  {
    id: "readiness",
    kind: "choice",
    lede: "Only if you're serious about fixing the root cause and ready to invest in yourself, book your priority clarity call.",
    title: `The program is an investment of ${PROGRAM_PRICE_LABEL} for ${PROGRAM_DURATION}. If it's a clear fit on the call, where are you at?`,
    choices: [READY_YES, READY_NO],
  },
];

/** Step numbers are assigned here, from array order. */
export const QUESTIONS: Question[] = QUESTION_SPECS.map((q, i) => ({ ...q, step: i + 1 }));

export const TOTAL_STEPS = QUESTIONS.length;

export type Answers = Partial<Record<QuestionId, string>> & {
  /** Dial code for the WhatsApp number, e.g. "+91". */
  dialCode?: string;
};

/** Country dial codes, mirroring the list the checkout form already ships. */
export const DIAL_CODES: { iso: string; dial: string; label: string }[] = [
  { iso: "IN", dial: "+91", label: "🇮🇳 +91" },
  { iso: "AE", dial: "+971", label: "🇦🇪 +971" },
  { iso: "SG", dial: "+65", label: "🇸🇬 +65" },
  { iso: "GB", dial: "+44", label: "🇬🇧 +44" },
  { iso: "US", dial: "+1", label: "🇺🇸 +1" },
  { iso: "AU", dial: "+61", label: "🇦🇺 +61" },
  { iso: "MY", dial: "+60", label: "🇲🇾 +60" },
  { iso: "NZ", dial: "+64", label: "🇳🇿 +64" },
  { iso: "ZA", dial: "+27", label: "🇿🇦 +27" },
  { iso: "SA", dial: "+966", label: "🇸🇦 +966" },
];

/**
 * The routing rule, exactly as briefed: the FINAL question alone decides the
 * branch. Q5 is still surfaced on the disqualified page as a criterion, but it
 * does not gate the redirect.
 */
export function isQualified(a: Answers): boolean {
  return a.readiness === READY_YES;
}

/** Where the CTAs point. The modal hijacks clicks on this href; without JS the
 *  link still resolves to the standalone /apply page. */
export const QUALIFIER_PATH = "/apply";
export const QUALIFIED_PATH = "/book-a-call";
export const DISQUALIFIED_PATH = "/thank-you-disqualified";

export function destinationFor(a: Answers): string {
  return isQualified(a) ? QUALIFIED_PATH : DISQUALIFIED_PATH;
}

/* ------------------------------------------------------------- VALIDATION */

/* Deliberately permissive: one @, a dot-suffixed domain, no spaces. Stricter
   patterns reject real addresses (plus-tags, long TLDs, unicode locals) and the
   only thing that truly proves an address is sending to it. */
export const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function validate(id: QuestionId, value: string, dialCode?: string): string | null {
  const v = (value ?? "").trim();
  if (!v) {
    const q = QUESTIONS.find((x) => x.id === id);
    return q?.kind === "choice" ? "Pick one to continue." : "This one is required.";
  }
  if (id === "name" && v.length < 2) return "Enter your first name.";
  if (id === "email") {
    if (!EMAIL_RE.test(v)) return "Enter a valid email address, like you@example.com.";
    if (v.length > 254) return "That email address is too long.";
  }
  if (id === "whatsapp") {
    const digits = v.replace(/\D/g, "");
    // The dial code drives the rule. India (+91, the default) mobile numbers are
    // exactly 10 digits and start 6-9; other codes stay permissive (7-15 digits).
    if ((dialCode ?? "+91") === "+91") {
      if (digits.length !== 10) return "Enter a valid 10-digit mobile number.";
      if (!/^[6-9]/.test(digits))
        return "Enter a valid Indian mobile number (it starts with 6, 7, 8 or 9).";
    } else if (!/^\d{7,15}$/.test(digits)) {
      return "Enter a valid mobile number (7 to 15 digits).";
    }
  }
  return null;
}

/* ---------------------------------------------------------------- STORAGE */
/* The disqualified page reads the answers back out of sessionStorage to echo
   the user's own responses. sessionStorage (not local) so a shared device does
   not show someone else's answers later. */

export const ANSWERS_KEY = "fwp_qualifier";

export function saveAnswers(a: Answers): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(a));
  } catch {
    /* private mode — the disqualified page falls back to generic copy */
  }
}

export function loadAnswers(): Answers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ANSWERS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Answers) : null;
  } catch {
    return null;
  }
}

/* --------------------------------------------------------------- CRITERIA */
/* The three criteria the disqualified page explains, each tied back to the
   answer the user actually gave. */

export interface Criterion {
  n: number;
  text: string;
  /** Which answer is quoted back under "Your Response". */
  from: QuestionId;
  met: (a: Answers) => boolean;
}

export const CRITERIA: Criterion[] = [
  {
    n: 1,
    text: "A thyroid, Hashimoto's or related chronic health concern you're currently dealing with, or suspect you have.",
    from: "concern",
    met: (a) => a.concern === CONCERN_THYROID,
  },
  {
    n: 2,
    text: "Being ready to solve this now, not explore it someday.",
    from: "readiness",
    met: (a) => a.readiness === READY_YES,
  },
  {
    n: 3,
    text: `Being able to invest ${PROGRAM_PRICE_LABEL} for ${PROGRAM_DURATION} if it's a clear fit on the call.`,
    from: "readiness",
    met: (a) => a.readiness === READY_YES,
  },
];

/* Plain profile URL — the `?igsh=` share token that came with the original link
   makes Instagram show a "<someone> shared this with you" interstitial before
   the profile, so it is deliberately stripped. */
export const INSTAGRAM_URL = "https://www.instagram.com/fitwithpalak";
export const INSTAGRAM_HANDLE = "fitwithpalak";

/* ---------------------------------------------------------------------------
   Everything below mirrors the live @fitwithpalak profile.

   Instagram serves a JS-only shell to servers and its private endpoints
   (`web_profile_info`, `?__a=1`) return empty without an authenticated session,
   so none of this can be fetched at build time — it is transcribed from the
   profile itself. When the real profile changes, update it here; this is the
   only place any of it is written.
   --------------------------------------------------------------------------- */

/** The display name line, exactly as it reads on the profile. */
export const INSTAGRAM_NAME = "Palak Sachdeva | Women's Health Coach";

/** Local copy of the profile photo (IG's own CDN urls are signed and expire). */
export const INSTAGRAM_AVATAR = "/assets/palak-instagram.jpg";

/** Real profile counts. */
export const INSTAGRAM_STATS: { posts: string; followers: string; following: string } | null = {
  posts: "640",
  followers: "68.9K",
  following: "346",
};

/** The bio, line for line. */
export const INSTAGRAM_BIO = [
  "🌻 Helping busy working women heal thyroid, PCOS, stubborn fat & gut issues by fixing the root cause",
  "🌿 Functional Nutritionist & Life Coach",
  "📩 Start here ⬇️",
] as const;

/** The link in her bio, shown as text (the card's clickable target is Instagram). */
export const INSTAGRAM_BIO_LINK = "superprofile.bio/fitwithpalak";

