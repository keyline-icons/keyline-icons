/**
 * The custom icons offer at `/custom`: what it costs, what it delivers, and the
 * address its one button writes to.
 *
 * A paid service on top of the set, and nothing more than that. The library,
 * its packages and its licence do not change because of it, and nothing here
 * is imported by anything that builds them. The FAQ says so in as many words,
 * because "free icons, now with a price on the page" is the first suspicion a
 * reader of the set will arrive with.
 *
 * Imports nothing at runtime, like `lib/site-chrome.ts`, because the button
 * that reads it is a client component and anything it imports goes into the
 * bundle.
 */

import type { FaqEntry } from "@/lib/faq"

/**
 * Where the button writes, and the address the closing card prints.
 *
 * The project's own address rather than a personal one (Zafar's pick, 26 Oct
 * 2026). Cloudflare Email Routing forwards it to the maker's inbox, the same
 * service overflow.design uses; the domain's DNS moved from Vercel to
 * Cloudflare for it, because routing only works on a zone Cloudflare serves.
 * DMARC is `p=reject`: nothing sends as keylineicons.com, so anything that
 * claims to is refused.
 */
export const CUSTOM_EMAIL = "hello@keylineicons.com"

/**
 * The message the button opens, prefilled.
 *
 * Four lines with nothing after the colons, so the reader fills in a form they
 * can see rather than facing an empty message. They are the four things a
 * reply would otherwise have to ask for first.
 */
const SUBJECT = "Custom icons"
const BODY = [
  "Product link:",
  "Icons we need:",
  "Style test ($150) or 30-icon set ($1,500):",
  "When we need them:",
  "",
].join("\n")

export const CUSTOM_MAILTO =
  `mailto:${CUSTOM_EMAIL}` +
  `?subject=${encodeURIComponent(SUBJECT)}` +
  `&body=${encodeURIComponent(BODY)}`

/** The two fixed offers, in the order a buyer meets them. */
export const CUSTOM_OFFERS = [
  {
    id: "test",
    name: "Style test",
    price: "$150",
    summary: "3 icons",
    description:
      "Three icons from your product, drawn on the grid, so you judge the fit on real drawings before committing to a set.",
    includes: [
      "3 icons from your product",
      "Back within 3 days",
      "SVG and a Figma file",
      // A checklist row like Overflow's, not a bold line of its own: as a
      // line it pushed this card's list below the set card's. The hyphen is
      // non-breaking, so a narrow card never ends a line on "30-".
      "Credited toward the 30\u2011icon set if you go ahead",
    ],
  },
  {
    id: "set",
    name: "Icon set",
    price: "$1,500",
    summary: "30 icons in 7 days",
    description:
      "The icons your product needs, drawn as one system and delivered within a week.",
    includes: [
      "30 icons, sizes and states included",
      "Delivered in 7 days",
      "SVG, a Figma file and a React package",
    ],
  },
] as const

/**
 * The glyphs on the page, by section, in the order each section draws them.
 *
 * Here rather than in the page because `pipeline/check-demos.mjs` scans `lib/`
 * for `*_ICON_NAMES` and nothing else, so a rename that misses one of these
 * fails the build instead of leaving a hole in the page.
 */
export const CUSTOM_DELIVERY_ICON_NAMES = [
  "grid-3x3",
  "layers",
  "package",
] as const

export const CUSTOM_STEP_ICON_NAMES = ["send", "pen", "package-check"] as const

export const CUSTOM_CLOSE_ICON_NAMES = ["mail"] as const

/**
 * The row under the hero: one drawing at the sizes it ships at, then the
 * states an interface asks of it. Real files from the set, so the page shows
 * the standard before the cards below describe it.
 *
 * `bell` because its family has every state the row names: struck through
 * for off, filled for the active tab, and a dot for a badge.
 */
export const CUSTOM_SAMPLE_ICON_NAMES = ["bell", "bell-off", "bell-dot"] as const

export const CUSTOM_SAMPLE_SIZES = [16, 20, 24] as const

export const CUSTOM_SAMPLE_STATES = [
  { label: "Off", name: "bell-off", style: "stroke" },
  { label: "Active", name: "bell", style: "fill" },
  { label: "Badged", name: "bell-dot", style: "stroke" },
] as const

/** What the set delivers, one card each, beside the glyphs above. */
export const CUSTOM_DELIVERY = [
  {
    lead: "Keyline's grid",
    rest: ": 24×24, one 2px keyline, and the same rules for corners, padding and weight as the free set.",
  },
  {
    lead: "Sizes and states",
    rest: ", proofed at 16, 20 and 24px, with the off, active and badged forms an interface needs.",
  },
  {
    lead: "SVG, Figma and React",
    rest: ": the files, a Figma file of components, and a package your engineers install like any other.",
  },
] as const

/** How a project runs, beside `CUSTOM_STEP_ICON_NAMES`. */
export const CUSTOM_STEPS = [
  {
    title: "Send the brief",
    body: "A link to your product and the icons it needs. Screenshots of where they sit help most.",
  },
  {
    title: "Approve the direction",
    body: "The first icons come back for your review, so the style is settled on real drawings before the rest is drawn.",
  },
  {
    title: "Get the set",
    body: "SVG files, a Figma file and a React package, ready for the team to use the day they arrive.",
  },
] as const

/**
 * The questions, short. Plain strings, as `components/faq.tsx` requires.
 *
 * The first one is there for the set's own readers rather than for buyers:
 * anyone who found `/custom` from a README is asking it.
 */
export const CUSTOM_FAQ: FaqEntry[] = [
  {
    question: "Does the free set change?",
    answer:
      "No. Keyline stays free under the MIT License, and nothing about the library, its packages or its licence changes because of this work.",
  },
  {
    question: "Who owns the icons drawn for us?",
    answer:
      "You do. They are drawn for your product and are not added to the free set.",
  },
  {
    question: "Can custom icons sit beside Keyline icons?",
    answer:
      "Yes. They are drawn on the same grid with the same keyline, so a custom icon and a free one read as one set.",
  },
  {
    question: "What if we need more than 30?",
    answer:
      "Say so in the brief. Larger sets are priced from the list of icons, and the style test works the same way.",
  },
]

/**
 * The maker's other custom offer, linked under the FAQ: animated isometric
 * scenes on Overflow, whose own `/custom` links back here.
 *
 * `www` and the trailing slash because that is the form the site serves; the
 * bare host and the unslashed path both answer with a redirect. No price in
 * the sentence: it is Overflow's to change, and a figure typed here would
 * outlive it.
 *
 * `live` switches the line off without deleting it. It was off at launch,
 * while Overflow's page still answered 404, and came on the same day once it
 * answered 200 and linked back here. Turn it off again if that page ever goes:
 * a link from a sales page to a missing page is worse than no link. A check at
 * build would not do, because overflow.design challenges datacenter traffic
 * and Vercel's builders are datacenter traffic.
 */
export const CUSTOM_SEE_ALSO = {
  href: "https://www.overflow.design/custom/",
  label: "custom isometric scenes on Overflow",
  live: true,
}

/**
 * The before and after on the page: twelve icons from an open-source app as it
 * ships them, and the same twelve redrawn as one system.
 *
 * Empty until the art is supplied. Drop twelve SVGs into
 * `public/custom/case-study/before/` and twelve into `.../after/`, list their
 * paths here in matching order, and fill in the app. While either list is
 * empty the section does not render at all, so an unfinished case study never
 * reaches the page.
 *
 * `license` is the app's own, named under the "before" row: the drawings are
 * someone else's work shown for comparison, and the credit is what makes that
 * fair.
 */
export const CASE_STUDY: {
  app: { name: string; url: string; license: string }
  before: readonly string[]
  after: readonly string[]
} = {
  app: { name: "", url: "", license: "" },
  before: [],
  after: [],
}

/** How many tiles each row of the case study has. */
export const CASE_STUDY_COUNT = 12

/**
 * Which link brought a reader to `/custom`, for the two analytics events.
 *
 * A fixed list, so the Events panel groups into a handful of rows rather than
 * one per URL. It names our own links and a few hosts, never the reader.
 *
 * `?ref=` wins where it is set: the site's own links carry it, and so do the
 * READMEs, because a reader who reaches the page by a client-side navigation
 * keeps the referrer of the page they first loaded, and that would credit
 * Google for a click on the homepage.
 */
export const CUSTOM_SOURCES = [
  "home",
  "install",
  "icons",
  "no-results",
  "overflow",
  "readme",
  "npm",
  "figma",
  "x",
  "search",
  "site",
  "other",
  "direct",
] as const

export type CustomSource = (typeof CUSTOM_SOURCES)[number]

const HOSTS: [RegExp, CustomSource][] = [
  [/(^|\.)github\.com$/, "readme"],
  [/(^|\.)npmjs\.com$/, "npm"],
  [/(^|\.)figma\.com$/, "figma"],
  [/(^|\.)overflow\.design$/, "overflow"],
  [/(^|\.)(x\.com|t\.co|twitter\.com)$/, "x"],
  [/(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.brave\.com|ecosia\.org)$/, "search"],
]

/**
 * Resolve the source in the browser. Called from the view and from the button.
 *
 * A page that was not the first one loaded was reached by a link on this site,
 * whatever `document.referrer` still says, so it counts as `site` unless the
 * link said more with `?ref=`.
 */
export function customSource(): CustomSource {
  const ref = new URLSearchParams(window.location.search).get("ref")
  if (ref && (CUSTOM_SOURCES as readonly string[]).includes(ref)) {
    return ref as CustomSource
  }

  const [first] = performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[]
  if (first && new URL(first.name).pathname !== window.location.pathname) {
    return "site"
  }

  if (!document.referrer) return "direct"
  const host = new URL(document.referrer).hostname
  if (host === window.location.hostname) return "site"
  return HOSTS.find(([pattern]) => pattern.test(host))?.[1] ?? "other"
}
