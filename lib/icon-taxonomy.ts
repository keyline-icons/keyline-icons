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
  // The review shelf is empty, which is its resting state. It is opened by
  // adding a row here that matches the batch by name and sits FIRST, so it
  // beats each icon's real shelf; every name in it is also listed in its real
  // category below, so deleting the row files the whole batch at once with no
  // second edit to forget. That deletion is what "reviewed" means.
  //
  // Last closed on 9 Sep 2026, when Zafar passed the twenty-three of v0.6.0:
  // flame, store, buildings, cpu, graduation-cap, the six books, the wallet,
  // the card's four signs and the seven currency marks with their circled
  // halves. `refresh` and `rotate` sit in Arrows because they are arrow glyphs,
  // whatever they are used for. The anchor is what keeps `git-refresh` in Git.
  //
  // Opened 10 Sep 2026 for the fourteen of v0.7.0: the square bubble and its
  // eight companions, and qr-code, scan, scissors and hourglass; then the first
  // ten of the chart and diagram batch on 10 Sep 2026.
  {
    label: "New",
    match: /^(message-square|messages-square|qr-code|scan$|scissors|hourglass|chart-(diagram|pyramid|waterfall|no-axes-combined|scatter-3d|radar|tree-map|scatter-bubble|bullet|line-down)$)/,
    blurb: "Drawn since the last release, waiting on review.",
  },
  {
    label: "Arrows",
    match: /^(arrow|bracket-arrow|expand|refresh|rotate|move$)/,
    blurb:
      "Direction, movement and resizing, with the brackets, u-turns and dashed panels.",
  },
  // Split out of Arrows on 29 Aug 2026: the sharp matrix doubled every catalog
  // card's cells, and 104 rows, one per name on a card of 60 sets, stopped
  // being one readable shelf. Media, the next-largest card that day, stood at
  // 62 names and was left whole; that count is the bar a new shelf clears.
  {
    label: "Chevrons & Carets",
    match: /^(caret|chevron)/,
    blurb: "Carets, chevrons and their doubled and opposing pairs.",
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
    // `pen` carries a lookahead so `pencil-*` falls through to Tools below:
    // a pencil-and-ruler is a drawing instrument, not a document.
    // `book` carries a lookahead of its own: `bookmark` is a web-scoped action
    // and is claimed by Web below, which this category is evaluated before.
    match: /^(file|folder|copy|paperclip|bin|archive|book(?!mark)|pen(?!cil)|(square|circle)-pen)/,
    blurb: "Documents, folders, books, copies, the paperclip and the bin.",
  },
  {
    label: "Time",
    match: /^(calendar|clock|hourglass)/,
    blurb: "Calendars, clocks and the hourglass, with the signs that act on them.",
  },
  // `at` is anchored inside the group because the bare symbol is the whole
  // name: an unanchored `at` would hand this category every future name that
  // merely starts with those two letters. The rest are prefixes, so the
  // compounds each is being drawn towards land here too.
  {
    label: "Mail",
    // `send` is here with `forward` and `reply` rather than in Actions: a
    // paper plane is the verb a message takes, and the family it reads against
    // is the one it is sent from.
    match: /^(mail|message|bell|inbox|reply|forward|send|at$)/,
    blurb: "Envelopes, messages, bells, the paper plane and the marks that badge them.",
  },
  {
    // Money, and what carries it. Split out of Commerce on 9 Sep 2026, when
    // Zafar asked why a currency mark was filed under shopping. The seven marks
    // went there on the argument that a shelf of seven reads as a gap beside
    // Media's 63, and that argument is dead: a drawing sits where it belongs
    // whatever the count. So the line is what the drawing IS. A euro, a card
    // and a wallet are money; a cart, a receipt and a parcel are a purchase.
    //
    // Evaluated before Commerce, which would otherwise take `credit-card` and
    // `wallet` on prefixes of its own.
    label: "Finance",
    match:
      /^(dollar-sign|euro|pound-sterling|japanese-yen|indian-rupee|swiss-franc|bitcoin|credit-card|wallet)/,
    blurb: "The currency marks, the payment cards and the wallet.",
  },
  {
    // `percent` is here rather than with the marks in Actions: the batch that
    // drew it drew the percent tags with it, and a bare `%` reads as a discount
    // next to `coupon` and `tag`, not as a verb. Its containered forms go to
    // Shapes on their prefix like every other contained glyph.
    //
    // `briefcase` is filed as the third bag, beside `handbag` and
    // `shopping-bag`, not because business is commerce: Files is documents,
    // and one name does not earn a row.
    label: "Commerce",
    match:
      /^(shopping-|handbag|briefcase|receipt|tag|package|truck|gift|coupon|percent|store)/,
    blurb:
      "Carts, bags, receipts, shipping, the shopfront, the tags and the discount marks.",
  },
  {
    // `flag` and `traffic-light` are both road furniture: a marker you plant
    // and the lights at the junction, next to the routes they sit on.
    label: "Maps",
    match: /^(map|compass|building|route|flag$|traffic-light)/,
    blurb: "Pins, maps, compasses, routes, flags and the lights at the junction.",
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
      /^(play|pause|stop|record|skip-|fast-forward|rewind|repeat|replay|volume|audio-lines|mic|megaphone|headphones|headset|shuffle|music-note|list-music|list-video|camera|image|cast|subtitles|captions|picture-in-picture|gallery-|podcast|queue)/,
    blurb:
      "Playback, volume, capture, casting and the sound and image marks.",
  },
  // `activity` is a pulse trace, not a transport control — it reads against the
  // bar charts and the signal bars, which is where the design file files it too.
  {
    label: "Charts",
    match: /^(bar-chart|chart-|trending|signal|progress|loader|activity)/,
    blurb: "Trends, bar charts, signal strength and activity markers.",
  },
  // `code`, `terminal`, `bug` and the `app-*` tiles are the developer surface
  // of the devices around them, eleven sets today, and they stay here until
  // this card reaches the count that split Chevrons & Carets out of Arrows.
  // `app-*` is the tile on a phone's home screen with its badge, so it files
  // beside `smartphone-check`; the bare tile is `square`, in Shapes, and only
  // the badged members carry the word. The prefix is anchored for the reason
  // `at$` gives under Mail: unanchored, `app` would take every future
  // `apple` or `approve`.
  {
    // `bug` is the software bug, so it sits with `code` rather than in a
    // shelf of creatures the set does not have.
    label: "Devices",
    match: /^(smartphone|phone|monitor|terminal|database|server|battery|bluetooth|code|plug|bug|cpu|qr-code|scan$|app(?=-|$))/,
    blurb: "Phones, handsets, servers, databases, terminals, code, processors, bugs, the app tiles, the QR code and its scan frame.",
  },
  {
    label: "Pointers",
    match: /^cursor/,
    blurb: "Cursors and the states they carry.",
  },
  {
    // Ahead of Layout, which owns the `align-offset-*` family: those nudge an
    // object, these set a paragraph. The four alignment names are spelled out
    // rather than matched on a bare `align`, or the offsets follow them here.
    // `quote` and its three siblings are here rather than in Mail with the
    // speech bubbles: a quotation mark is a typographic mark, and the bubble is
    // the thing it goes inside. `language` is here for the same reason and it is
    // the one that could have gone to Web — it is an A beside a CJK glyph, so it
    // is letterforms first and internationalisation second.
    label: "Text",
    match:
      /^(bold|italic|underline|strikethrough|heading|pilcrow|indent|letter-|line-height|text-|type$|quote|language|align-(?:left|center|right|justify)$)/,
    blurb: "The quotation marks, the formatting marks, the alignment stack and what sets a paragraph.",
  },
  {
    label: "Layout",
    // `fullscreen` and `fullscreen-exit` sit here with `maximize` and
    // `minimize` for the reason given under Media: brackets and diagonals
    // framing a viewport read as layout, whatever they are used to resize.
    match: /^(panel|layout|layers|grid|list|align|menu|maximize|minimize|fullscreen)/,
    blurb: "Panels, layers, lists, alignment, the menu marks and the fullscreen corners.",
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
    // `zap` sits here for the reason `lightbulb` does: it is an energy mark you
    // set on a thing — instant, fast, powered — not a control you operate, and
    // not the weather. The storm belongs to a cloud, and this bolt has none.
    match:
      /^(check|double-check|plus|minus|x|more|lock|unlock|shield|download|upload|filter|eye|star|heart|alert|octagon|triangle-alert|info|question|lightbulb|zap|flame|sparkle|ban)/,
    blurb: "Checks, crosses, pluses, the everyday verbs and the marks that guard a thing.",
  },
  {
    // Next to Actions rather than inside it: those are marks you read, a check
    // or an alert reporting what happened, while these are widgets you set.
    // Prefixes rather than exact names, so the family this is being drawn
    // towards lands here too: a bare `slider`, a `toggle-left`.
    label: "Controls",
    match: /^(toggle|slider|grip|power)/,
    blurb: "Toggles, sliders and the drag handle.",
  },
  {
    // A shelf of one, and that is fine: Zafar's rule is that a drawing sits on
    // the shelf it belongs to whatever the count, so a shelf waits for its
    // second name rather than the name waiting for a shelf. The mortarboard
    // spent the v0.6.0 batch in Sport, on the reading that a qualification is
    // an achievement and belongs beside a trophy; it is a school, and that is
    // what someone types looking for it.
    label: "Education",
    match: /^graduation-cap/,
    blurb: "The mortarboard.",
  },
  {
    // `crown` is what a winner gets, so it sits with the trophy rather than
    // with the marks in Actions.
    label: "Sport",
    match: /^(trophy|award|podium|medal|crown|flag-chequered)/,
    blurb: "Trophies, awards, crowns and the places on the podium.",
  },
  {
    // The shelf follows what the thing is, not what the drawing is made of: a
    // toolbox is drawn from the same rounded box as `archive` and belongs here
    // rather than in Files, the same call `gallery-*` gets against Layout.
    // Prefixes, so the family this is being drawn towards lands here too: a
    // `screwdriver`, a `wrench-plus`.
    label: "Tools",
    match: /^(toolbox|wrench|hammer|pencil-ruler|screwdriver|pliers|saw|ruler|scissors)/,
    blurb: "The toolbox and what comes out of it.",
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
    //
    // The badged clouds and `cloud-off` are here rather than in Weather, which
    // follows: the sign is inside the cloud, so they read as the state of a
    // sync, and the person looking for one is looking where `globe-check` and
    // `wifi-x` are. `cloud` and `cloud-rain` stay weather.
    label: "Web",
    match:
      /^(globe|link|unlink|share|navigation|home|search|settings|bookmark|wifi|cloud-(?:check|x|plus|minus|alert|dot|off|arrow|backup|cog))/,
    blurb: "Globes, links, connectivity, sync states and web-scoped actions.",
  },
  {
    // Prefixes rather than exact names, so the compounds this family is being
    // drawn towards land here too: `cloud-rain`, `sunrise`, `moon-star`.
    label: "Weather",
    match: /^(sun|moon|cloud|umbrella|parasol)/,
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

/**
 * What another set calls a drawing here, keyed by the name someone would type:
 * `message-square` for `message`, `arrow-big-up` for `arrow-up`.
 *
 * Kept apart from the words above, and matched against the whole query rather
 * than word by word, because a name is not a keyword. Folded into the terms
 * instead — which is how this shipped for an afternoon — `message-square` puts
 * "square" into the message icon's vocabulary, and a search for `square` comes
 * back with every message in the set ahead of the squares.
 */
const FOREIGN: Record<string, string> = Object.fromEntries(
  Object.entries(
    (aliases as { names?: Record<string, string[]> }).names ?? {}
  ).flatMap(([icon, list]) => list.map((name) => [name, icon]))
)

/** The drawing another set's name asks for, or nothing. */
export function iconNamedElsewhere(query: string): string | undefined {
  return FOREIGN[query.trim().toLowerCase()]
}

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
