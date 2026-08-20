/**
 * What an icon is called besides its file name, and which shelf it sits on.
 *
 * Both facts are needed in two places — the grid, which filters by them, and
 * the preview panel, which states them — so they live here rather than in
 * either component. The grid used to own the categories; importing them back
 * out of it would have closed a cycle, since the grid imports the panel.
 */

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
    match: /^(map|compass|route)/,
    blurb: "Pins, maps, compasses and routes.",
  },
  {
    // Ahead of Layout, whose `list` prefix would otherwise claim `list-music`.
    label: "Media",
    match:
      /^(play|pause|stop|record|skip-|fast-forward|rewind|volume|audio-lines|mic|headphones|headset|shuffle|music-note|list-music|camera|image)/,
    blurb: "Playback, volume, capture and the sound and image marks.",
  },
  // `activity` is a pulse trace, not a transport control — it reads against the
  // bar charts and the signal bars, which is where the design file files it too.
  {
    label: "Charts",
    match: /^(bar-chart|trending|signal|progress|activity)/,
    blurb: "Trends, bar charts, signal strength and activity markers.",
  },
  // `code` sits with `terminal` rather than on a shelf of its own: the label is
  // the developer surface, and two names do not earn a row in a rail of 18.
  {
    label: "Devices",
    match: /^(smartphone|terminal|database|server|code)/,
    blurb: "Phones, servers, databases, terminals and code.",
  },
  {
    label: "Pointers",
    match: /^cursor/,
    blurb: "Cursors and the states they carry.",
  },
  {
    label: "Layout",
    match: /^(panel|list|align|menu)/,
    blurb: "Panels, lists, alignment and the menu marks.",
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
      /^(check|double-check|plus|minus|x|more|lock|unlock|download|upload|filter|eye|star|heart|octagon-alert|triangle-alert|info|question)/,
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
 */
const ALIASES: { match: RegExp; terms: string[] }[] = [
  // Families.
  { match: /^activity$/, terms: ["pulse", "heartbeat", "health", "vitals"] },
  {
    match: /^align-offset/,
    terms: ["align", "distribute", "spacing", "rows", "justify"],
  },
  { match: /^arrow/, terms: ["direction", "move", "navigate"] },
  { match: /^arrow-u-turn/, terms: ["undo", "redo", "back", "return"] },
  {
    match: /dashed-panel$/,
    terms: ["move to", "drop", "boundary", "edge", "snap"],
  },
  {
    match: /^audio-lines$/,
    terms: ["waveform", "sound", "equalizer", "audio"],
  },
  {
    match: /^bar-chart/,
    terms: ["analytics", "statistics", "graph", "report", "data", "insights"],
  },
  { match: /^bell/, terms: ["notification", "alert", "reminder", "ring"] },
  {
    match: /^bookmark$/,
    terms: ["save", "favourite", "favorite", "read later"],
  },
  {
    match: /^bracket-arrow/,
    terms: ["collapse", "expand", "resize", "fit", "inset"],
  },
  {
    match: /^calendar/,
    terms: ["date", "schedule", "event", "planner", "agenda"],
  },
  { match: /^caret/, terms: ["triangle", "dropdown", "sort", "select"] },
  {
    match: /^check$/,
    terms: ["done", "complete", "tick", "confirm", "success", "approve"],
  },
  {
    match: /^chevron/,
    terms: ["expand", "collapse", "next", "previous", "dropdown", "accordion"],
  },
  { match: /^circle$/, terms: ["shape", "round", "dot", "ellipse"] },
  {
    match: /^clock/,
    terms: ["time", "hour", "schedule", "timer", "history", "alarm"],
  },
  // Both angle-bracket icons, plus the markup words only the second one earns.
  // `terminal` already answers to "code", so these join a word the set has.
  {
    match: /^code/,
    terms: ["source", "developer", "programming", "brackets", "syntax"],
  },
  { match: /^code-xml$/, terms: ["markup", "html", "tag", "element"] },
  {
    match: /^compass$/,
    terms: ["direction", "navigate", "explore", "bearing", "discover"],
  },
  { match: /^copy$/, terms: ["duplicate", "clipboard", "clone"] },
  {
    match: /^credit-card$/,
    terms: ["payment", "checkout", "billing", "card", "pay"],
  },
  { match: /^cursor/, terms: ["pointer", "mouse", "select", "click"] },
  { match: /^cursor-text$/, terms: ["caret", "input", "type", "insert"] },
  { match: /^dashed/, terms: ["placeholder", "empty", "draft", "outline"] },
  { match: /^dice/, terms: ["random", "chance", "game", "roll", "luck"] },
  {
    match: /^double-check$/,
    terms: ["read", "delivered", "verified", "seen", "confirm"],
  },
  { match: /^download$/, terms: ["save", "export", "get", "install"] },
  {
    match: /^expand-dashed/,
    terms: ["resize", "fullscreen", "crop", "corner", "scale"],
  },
  { match: /^fast-forward$/, terms: ["skip", "speed", "seek", "faster"] },
  { match: /^file/, terms: ["document", "page", "paper"] },
  { match: /^file-text$/, terms: ["note", "article", "txt", "readme"] },
  {
    match: /^file-spreadsheet$/,
    terms: ["excel", "csv", "table", "sheet", "numbers"],
  },
  { match: /^flower$/, terms: ["nature", "plant", "bloom", "spring"] },
  { match: /^folder/, terms: ["directory", "files", "storage"] },
  { match: /^folders$/, terms: ["directories", "library", "workspace"] },
  {
    match: /^(full|half|quarter|three-quarter)$/,
    terms: ["portion", "fraction", "pie", "percentage", "share"],
  },
  { match: /^gift$/, terms: ["present", "reward", "birthday", "bonus"] },
  {
    match: /^git-/,
    terms: ["version control", "repository", "source control", "vcs"],
  },
  { match: /^git-pull-request/, terms: ["pr", "review", "merge request"] },
  { match: /^git-graph$/, terms: ["history", "log", "timeline"] },
  {
    match: /^globe/,
    terms: ["world", "internet", "web", "language", "international"],
  },
  { match: /^handbag$/, terms: ["purse", "bag", "shopping", "store"] },
  {
    match: /^(headphones|headset)/,
    terms: ["audio", "listen", "support", "call", "music"],
  },
  { match: /^home$/, terms: ["house", "dashboard", "start", "main"] },
  { match: /^info$/, terms: ["information", "help", "about", "details"] },
  {
    match: /^link$/,
    terms: ["url", "chain", "hyperlink", "connect", "attach"],
  },
  { match: /^list/, terms: ["items", "index", "rows", "todo"] },
  { match: /^list-music$/, terms: ["playlist", "queue", "tracks"] },
  {
    match: /^(lock|unlock)$/,
    terms: ["secure", "private", "password", "protected", "access"],
  },
  {
    match: /^mail/,
    terms: ["email", "envelope", "message", "inbox", "letter"],
  },
  {
    match: /^map/,
    terms: ["location", "place", "address", "gps", "marker", "pin"],
  },
  { match: /^menu$/, terms: ["hamburger", "nav", "bars", "burger"] },
  { match: /^mic$/, terms: ["microphone", "voice", "record", "speak"] },
  {
    match: /^minus$/,
    terms: ["remove", "subtract", "less", "collapse", "hide"],
  },
  {
    match: /^more-/,
    terms: ["ellipsis", "dots", "options", "overflow", "kebab", "meatball"],
  },
  { match: /^music-note$/, terms: ["song", "track", "audio", "media"] },
  { match: /^navigation$/, terms: ["direction", "gps", "heading", "travel"] },
  {
    match: /^octagon-alert$/,
    terms: ["stop", "error", "danger", "critical", "blocked"],
  },
  {
    match: /^package$/,
    terms: ["box", "delivery", "shipping", "parcel", "product"],
  },
  { match: /^panel/, terms: ["sidebar", "layout", "drawer", "dock", "split"] },
  { match: /^paperclip$/, terms: ["attach", "attachment", "clip"] },
  { match: /^pause$/, terms: ["media", "player", "hold", "suspend"] },
  { match: /^play$/, terms: ["media", "player", "start", "resume", "video"] },
  { match: /^stop$/, terms: ["media", "player", "halt", "end"] },
  { match: /^record$/, terms: ["media", "capture", "rec", "live"] },
  { match: /^plus$/, terms: ["add", "new", "create", "increase", "more"] },
  {
    match: /^progress/,
    terms: ["loading", "status", "completion", "percent", "ring"],
  },
  {
    match: /^question$/,
    terms: ["help", "ask", "faq", "support", "unknown", "what"],
  },
  { match: /^receipt$/, terms: ["invoice", "bill", "order", "payment"] },
  { match: /^rewind$/, terms: ["back", "replay", "seek", "slower"] },
  { match: /^route$/, terms: ["path", "directions", "journey", "trip"] },
  {
    match: /^scan-face$/,
    terms: ["face id", "biometric", "recognition", "identity"],
  },
  {
    match: /^search$/,
    terms: ["find", "magnifier", "lookup", "query", "zoom"],
  },
  {
    match: /^settings$/,
    terms: ["gear", "cog", "preferences", "config", "options"],
  },
  { match: /^shapes/, terms: ["geometry", "objects", "elements", "design"] },
  { match: /^share$/, terms: ["send", "export", "social", "forward"] },
  {
    match: /^shopping-/,
    terms: ["buy", "checkout", "ecommerce", "basket", "store", "purchase"],
  },
  { match: /^shuffle$/, terms: ["random", "mix", "swap", "cross"] },
  {
    match: /^signal/,
    terms: ["wifi", "network", "reception", "strength", "cellular"],
  },
  { match: /^skip-/, terms: ["next", "previous", "track", "media"] },
  {
    match: /^smartphone/,
    terms: ["phone", "mobile", "device", "app", "iphone"],
  },
  { match: /^square$/, terms: ["shape", "box", "rectangle"] },
  { match: /^tag/, terms: ["label", "price", "category", "badge"] },
  {
    match: /^terminal/,
    terms: ["console", "command line", "shell", "cli", "bash", "code"],
  },
  { match: /^bin$/, terms: ["delete", "remove", "trash", "discard"] },
  {
    match: /^trending/,
    terms: ["growth", "decline", "analytics", "stocks", "arrow"],
  },
  {
    match: /^triangle-alert$/,
    terms: ["warning", "caution", "attention", "error", "danger"],
  },
  {
    match: /^truck$/,
    terms: ["delivery", "shipping", "transport", "logistics"],
  },
  { match: /^upload$/, terms: ["import", "send", "publish", "cloud"] },
  {
    match: /^user/,
    terms: ["person", "profile", "account", "avatar", "member"],
  },
  { match: /^users$/, terms: ["people", "team", "group", "contacts"] },
  {
    match: /^volume/,
    terms: ["sound", "audio", "speaker", "mute", "loudness"],
  },
  {
    match: /^wifi/,
    terms: [
      "wireless",
      "network",
      "internet",
      "connection",
      "hotspot",
      "signal",
    ],
  },
  { match: /^wifi-x$/, terms: ["offline", "disconnected", "no connection"] },
  {
    match: /^x$/,
    terms: ["close", "cancel", "dismiss", "exit", "times", "cross"],
  },

  // Modifiers, which compose with whatever they hang off.
  { match: /-plus$/, terms: ["add", "new", "create"] },
  { match: /-minus$/, terms: ["remove", "subtract"] },
  { match: /-check$/, terms: ["done", "verified", "approved", "success"] },
  { match: /-x$/, terms: ["remove", "delete", "cancel", "failed"] },
  { match: /-dot$/, terms: ["unread", "badge", "new", "notification"] },
  { match: /-search$/, terms: ["find", "lookup"] },
  { match: /-info$/, terms: ["details", "about", "status", "learn more"] },
  { match: /-exclamation$/, terms: ["warning", "overdue", "attention"] },
  { match: /-arrow-down$/, terms: ["download", "receive", "incoming"] },
  { match: /-arrow-up$/, terms: ["upload", "send", "outgoing"] },
  { match: /-open$/, terms: ["browse", "expanded"] },
]

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
