/**
 * What an icon is called besides its file name, and which shelf it sits on.
 *
 * Both facts are needed in two places — the grid, which filters by them, and
 * the preview panel, which states them — so they live here rather than in
 * either component. The grid used to own the categories; importing them back
 * out of it would have closed a cycle, since the grid imports the panel.
 */

import aliases from "@/lib/icon-aliases.json"
import keywords from "@/lib/icon-keywords.json"

/**
 * The words written on each component set in Figma, baked out by
 * `pipeline/build-keywords.mjs`.
 *
 * Keyed by base name, because one component set there covers all three
 * containers: `square-arrow-down` is described by `arrow-down`'s description or
 * by nothing at all.
 */
const FIGMA_KEYWORDS = (keywords as { keywords: Record<string, string[]> })
  .keywords

/**
 * Categories, matched against the container-stripped base name in order — the
 * first pattern to match wins, so the specific ones lead.
 *
 * Each carries a `blurb`, one sentence naming what is on the shelf. It exists
 * because the Figma catalogue's cards print one under every heading and the
 * Paper cards are built to match them, so the sentence has to live somewhere
 * both can read. Written in the Figma file's own voice: a list of what is
 * there, not a pitch for it.
 *
 * These are curated rather than derived. The name families the set actually has
 * are far too lopsided to be a menu: 26 arrows and 25 git glyphs against thirty
 * families of exactly one.
 */
export const CATEGORIES = [
  // `refresh` and `rotate` are here because they are arrow glyphs, whatever they
  // are used for. The anchor is what keeps `git-refresh` in Git below.
  {
    label: "Arrows",
    match: /^(arrow|bracket-arrow|caret|chevron|expand|refresh|rotate)/,
    blurb:
      "Direction, movement and resizing, with the carets, chevrons and dashed panels.",
  },
  {
    label: "Git",
    match: /^git-/,
    blurb: "Branches, commits, merges and pull requests.",
  },
  {
    // The two containered pens are spelt out rather than caught by a `pen`
    // suffix: they have to land here before Shapes claims them for their
    // `square-` and `circle-` prefixes, the way it claims every other one.
    label: "Files",
    match: /^(file|folder|copy|paperclip|bin|archive|pen|(square|circle)-pen)/,
    blurb: "Documents, folders, copies, the paperclip and the bin.",
  },
  {
    label: "Time",
    match: /^(calendar|clock)/,
    blurb: "Calendars and clocks, with the signs that act on them.",
  },
  // `at` is anchored inside the group because the bare symbol is the whole
  // name: an unanchored `at` would hand this category every future name that
  // merely starts with those two letters. The rest are prefixes, so the
  // compounds each is being drawn towards land here too.
  {
    label: "Mail",
    match: /^(mail|message|bell|inbox|reply|forward|at$)/,
    blurb: "Envelopes, messages, bells and the marks that badge them.",
  },
  {
    label: "Commerce",
    match:
      /^(shopping-|handbag|receipt|credit-card|tag|package|truck|gift|coupon)/,
    blurb: "Carts, bags, receipts, cards and shipping.",
  },
  {
    label: "Maps",
    match: /^(map|compass|building|route)/,
    blurb: "Pins, maps, compasses and routes.",
  },
  {
    // Ahead of Layout, whose `list` prefix would otherwise claim `list-music`.
    //
    // `maximize` and `minimize` are deliberately NOT here, though they arrived
    // with this batch as fullscreen controls: four corner brackets read as a
    // viewport being framed, not as playback, and the shelf files by what a
    // drawing reads as. They are in Layout with the panels. "fullscreen" is an
    // alias on both, so the word still lands on them.
    //
    // `gallery-*` goes the other way and is here rather than in Layout, though
    // it is drawn from panels: a gallery is a carousel of pictures, and the
    // person looking for one is looking where `image` and `images` are. The
    // drawing is panels, the thing is media, and this shelf files by the thing
    // wherever the two disagree — the same call the taxonomy makes for `wifi`.
    label: "Media",
    match:
      /^(play|pause|stop|record|skip-|fast-forward|rewind|repeat|volume|audio-lines|mic|headphones|headset|shuffle|music-note|list-music|list-video|camera|image|cast|subtitles|captions|picture-in-picture|gallery-|megaphone|podcast|queue)/,
    blurb:
      "Playback, volume, capture, casting and the sound and image marks.",
  },
  // `activity` is a pulse trace, not a transport control — it reads against the
  // bar charts and the signal bars, which is where the design file files it too.
  {
    label: "Charts",
    match: /^(bar-chart|trending|signal|progress|loader|activity)/,
    blurb: "Trends, bar charts, signal strength and activity markers.",
  },
  // `code` sits with `terminal` rather than on a shelf of its own: the label is
  // the developer surface, and two names do not earn a row in a rail of 18.
  {
    label: "Devices",
    match: /^(smartphone|monitor|terminal|database|server|battery|bluetooth|code)/,
    blurb: "Phones, servers, databases, terminals and code.",
  },
  {
    label: "Pointers",
    match: /^cursor/,
    blurb: "Cursors and the states they carry.",
  },
  {
    label: "Layout",
    // `fullscreen` and `fullscreen-exit` sit here with `maximize` and
    // `minimize` for the reason given under Media: brackets and diagonals
    // framing a viewport read as layout, whatever they are used to resize.
    // `list-next` stays here too rather than following `list-music` and
    // `list-video` into Media: those are lists OF media, this is an operation
    // on a list, which is what the rest of the `list-*` family is.
    match: /^(panel|layout|grid|list|align|menu|maximize|minimize|fullscreen)/,
    blurb: "Panels, lists, alignment, the menu marks and the fullscreen corners.",
  },
  {
    label: "Users",
    match: /^(user|scan-face)/,
    blurb: "People, accounts and the signs that badge them.",
  },
  {
    // Ahead of Shapes so `triangle-alert`, `octagon-alert` and `info` read as
    // status rather than as the polygons and circles they are drawn from, and so
    // `star` and `heart` read as marks you set on a thing rather than as the two
    // outlines they happen to be. `eye` is the show/hide operation, next to lock.
    label: "Actions",
    match:
      /^(check|double-check|plus|minus|x|more|lock|unlock|download|upload|filter|eye|star|heart|alert|octagon-alert|triangle-alert|info|question)/,
    blurb: "Checks, crosses, pluses and the everyday verbs.",
  },
  {
    // Next to Actions rather than inside it: those are marks you read, a check
    // or an alert reporting what happened, while these are widgets you set.
    // Prefixes rather than exact names, so the family this is being drawn
    // towards lands here too: a bare `slider`, a `toggle-left`.
    label: "Controls",
    match: /^(toggle|slider)/,
    blurb: "Toggles and sliders.",
  },
  {
    label: "Sport",
    match: /^(trophy|award|podium|medal)/,
    blurb: "Trophies, awards and the places on the podium.",
  },
  {
    label: "Shapes",
    match:
      /^(circle|square|triangle|shapes|dashed|dice|flower|full|half|quarter|three-quarter)/,
    blurb: "Squares, circles, dashes and the progress states drawn from them.",
  },
  {
    // `wifi` is here rather than in Charts beside `signal`, which is the sibling
    // it shares a meaning with: the categories file by what a drawing reads as,
    // and a fan of arcs reads as connectivity next to `globe` and `link`, while
    // signal's bars read as a chart. Same reasoning that keeps `activity` out of
    // Media.
    label: "Web",
    match: /^(globe|link|share|navigation|home|search|settings|bookmark|wifi)/,
    blurb: "Globes, links, connectivity and web-scoped actions.",
  },
  {
    // Prefixes rather than exact names, so the compounds this family is being
    // drawn towards land here too: `cloud-rain`, `sunrise`, `moon-star`.
    label: "Weather",
    match: /^(sun|moon|cloud)/,
    blurb: "Sun, moon, cloud and the states between them.",
  },
] as const

export type CategoryLabel = (typeof CATEGORIES)[number]["label"] | "Other"

/**
 * The two rows that are not categories: everything, and the leftovers.
 *
 * Unfinished drawings are left here deliberately. A draft that has not earned its
 * filled styles yet has not earned a shelf either, and filing it early hides it
 * among finished work. Give it a category when it ships, not when it is named.
 */
export const OTHER_CATEGORY = "Other"

export const categoryOf = (base: string): CategoryLabel =>
  CATEGORIES.find((c) => c.match.test(base))?.label ?? OTHER_CATEGORY

/**
 * The words someone would type when they don't know what we called it, for the
 * drawings Figma has nothing to say about.
 *
 * Figma's own description is the list to follow where there is one — it is
 * curated per icon, next to the drawing, by whoever drew it — and these
 * patterns fill in behind it. They are patterns rather than a table per icon
 * because they were written to cover 414 drawings without 414 entries, and that
 * remains their job for whatever has not been described yet.
 *
 * Unlike the categories, **every** matching row contributes: the drawing's own
 * family and each modifier hung off it. `bell-x` is a notification and a
 * dismissal, and someone searching either word should land on it.
 *
 * These are search terms first and a caption second. That rules out restating
 * the name — "bell" under `bell` is noise — and rules in the wrong words people
 * actually use: "hamburger" for `menu`, "gear" for `settings`, "PR" for
 * `git-pull-request`.
 *
 * They live in `lib/icon-aliases.json` rather than in this file so that
 * `pipeline/build-data.mjs` can read them too. It cannot import TypeScript, and
 * for as long as it could not, these 106 rows reached the site and nothing
 * else: the CLI and the MCP server had no aliases at all, and `trash` found
 * `bin` here while finding nothing anywhere else.
 */
const ALIASES: { match: RegExp; terms: string[] }[] = (
  aliases as { aliases: { match: string; terms: string[] }[] }
).aliases.map((a) => ({ match: new RegExp(a.match), terms: a.terms }))

const cache = new Map<string, string[]>()

/**
 * Every word an icon answers to besides its name: Figma's description first,
 * then whatever the patterns add, deduplicated.
 *
 * Figma leads because that is the list someone maintains while drawing, and it
 * is the one a reader sees in the design file — a site that searched by
 * something else would be a second, invisible vocabulary. The patterns are not
 * dropped once a description exists, because deleting a working search term is
 * a regression nobody can see: "gear" finding `settings` is not worth losing
 * because the description happens to say "preferences" instead.
 *
 * Cached because the search runs this across the whole set on every keystroke,
 * and the answer for a given name never changes.
 */
export function aliasesFor(base: string): string[] {
  const hit = cache.get(base)
  if (hit) return hit

  const out = [
    ...new Set([
      ...(FIGMA_KEYWORDS[base] ?? []),
      ...ALIASES.filter((a) => a.match.test(base)).flatMap((a) => a.terms),
    ]),
  ]
  cache.set(base, out)
  return out
}
