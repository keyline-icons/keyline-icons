#!/usr/bin/env node
/**
 * Verify the four searches agree.
 *
 *   node pipeline/check-search.mjs
 *   node pipeline/check-search.mjs --json
 *
 * The set is searched in four places and each one implements it separately: the
 * site's browser, the MCP server, the CLI and the Figma plugin's panel. Nothing
 * made them agree, and twice now a fix landed in some of them and not the rest.
 *
 *  - The word tier, which lets `CheckCircle2` reach `circle-check`, went into
 *    the MCP server and the CLI. The plugin shipped without it and the site
 *    shipped with it half-working. Three separate commits to fix one bug.
 *  - The identifier guard only fired on a camelCase boundary, so `Share2` was
 *    left as a single word and matched nothing while `share` sat in the set.
 *    All four were wrong together, which no amount of cross-checking would have
 *    caught, so this file checks behaviour as well as agreement.
 *
 * WHAT IT CHECKS
 *
 * Six things. The fourth is the one that matters, and the fifth asks it of
 * each surface's own code:
 *
 *  1. AGREEMENT. The shared expressions are lifted out of all four files and
 *     compared with indentation flattened. They have to be the same code. This
 *     catches a fix that lands in three files. Two of them are shared: the word
 *     split, and the singular rule that lets a plural find the family.
 *  2. BEHAVIOUR. That expression is run against the table below. This catches a
 *     fix that lands in all four and is wrong in all four.
 *  3. VOCABULARY. The words each icon answers to are computed the site's way
 *     and the packages' way and compared. The two spell it differently on
 *     purpose, so they cannot be diffed as text, and they went out of step
 *     once already: the aliases reached the site alone, so "south" found nine
 *     icons in the browser and none in the tool an agent calls.
 *  4. OUTCOMES. A table of query-to-icon rows, run end to end. This is the one
 *     the other three cannot do, and the gap they left was not hypothetical:
 *     `Trash2` split correctly into `["trash"]`, passed case 2 green, and then
 *     matched nothing, because the drawing is called `bin` and no alias said
 *     so. Splitting a word right is not the same as finding the icon, and only
 *     this section can tell the difference.
 *  5. LEADS. A table of names whose drawing has to come back first, run
 *     through every surface's own ranking: the packages' and the plugin's
 *     search lifted out of their files and run on their own bundles, the
 *     site's from the helpers its grid sorts with. Nothing above looks at
 *     ranking, which is how the plugin went five weeks without reading another
 *     set's names at all and the site sorted every search alphabetically.
 *  6. NAMES. The redirect table in lib/icon-aliases.json: every name points at
 *     a drawing that exists, no name is listed twice, and no name is one the
 *     set now draws. Thirty rows had gone stale that way before this checked.
 *
 * It reads the source rather than importing it, because none of the four export
 * the function: the site's is a module-private const, the plugin's lives inside
 * a <script> tag in an HTML file, and the MCP server starts a stdio loop the
 * moment it is imported. Reading the text is the only thing that reaches all
 * four, and it is honest about what it is checking, which is that the code in
 * these four files is the same code.
 *
 * Adding a case is one row in CASES, one row in FINDS for an outcome, or one
 * row in FIRST for a name that has to lead. Adding a fifth surface is one row
 * in SOURCES, provided it spells the shared part the same way, and one in
 * RANKED with the names its search calls.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))

/*
 * Names that wear a container prefix without being one. Shared with
 * lib/icons.ts so every surface resolves a base the same way — the counts
 * drifted apart precisely because each of these files had its own copy of the
 * rule.
 */
const NOT_CONTAINERS = new Set(
  JSON.parse(
    await readFile(join(ROOT, "lib", "icon-not-containers.json"), "utf8")
  ).names
)
const json = process.argv.includes("--json")
const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/** Every file carrying a copy, and what to call it in a failure. */
const SOURCES = [
  ["components/icon-browser.tsx", "site"],
  ["packages/mcp/src/index.mjs", "mcp"],
  ["packages/cli/src/index.mjs", "cli"],
  ["packages/figma-plugin/ui.html", "plugin"],
]

/**
 * The three packages that build a searchable string per icon, and the line that
 * does it.
 *
 * The site is not here on purpose. It composes the same string from a different
 * shape, `[name, ...aliasesFor(base)]`, because it has the alias table itself
 * rather than a baked map, so there is no text to compare. Its behaviour is the
 * one this was copied from.
 */
const HAYSTACK_FILES = [
  ["packages/mcp/src/index.mjs", "mcp"],
  ["packages/cli/src/index.mjs", "cli"],
  ["packages/figma-plugin/ui.html", "plugin"],
]

const HAYSTACK = /const haystackFor = \(name\) =>[^\n]*/

/**
 * The shared part, from the guard down to the end of the filter.
 *
 * Anchored on code rather than on a marker comment, because a marker is a
 * promise to keep it updated and this is meant to survive someone who does not
 * know the file exists.
 */
const BODY = /const identifier =[\s\S]*?\.filter\(\(w\) => w && !\(identifier && \/\^\\d\+\$\/\.test\(w\)\)\)/

/**
 * The singular rule, and the pass that applies it to a haystack.
 *
 * Captured from the parameter rather than from `const`, because the site
 * annotates it, `(w: string)`, and the packages cannot. Everything after the
 * arrow is the part that has to be identical, and it is the part that decides
 * whether `arrows` finds the arrows or the one drawing whose name happens to
 * carry the letter.
 */
const SINGULAR = /const singular[^=]*= \(w[^)]*\) =>([\s\S]*?w\.slice\(0, -1\))/
const STEMMED = /const stemmed[^=]*= \(hay[^)]*\) =>([^\n]+)/

/**
 * The concept words, which only the two substring surfaces carry.
 *
 * The site and the plugin match inside a word, so `arrow` would otherwise be
 * handed every drawing keyworded `arrows`. The packages match whole words and
 * need nothing. Compared across the two that have it, for the same reason
 * everything else here is compared: the last time these two disagreed about a
 * search rule, the plugin was the one left behind.
 */
const CONCEPT_FILES = [
  ["components/icon-browser.tsx", "site"],
  ["packages/figma-plugin/ui.html", "plugin"],
]
const CONCEPTS = /const CONCEPTS = (\/[^\n]+\/g)/

/**
 * Each surface's own search, for LEADS: the file, its bundle, the names the
 * search calls, and how a caller asks it.
 *
 * Lifted and run rather than compared, because ranking is the one part the
 * four do not share. The packages match whole words and the plugin matches
 * inside them, so their tiers differ below the second, and what has to agree
 * is the outcome: the exact name first, then the drawing another set's name
 * points at. Every name a search calls is listed, so a rename fails here by
 * name instead of passing on a stale copy.
 */
const SHARED_HELPERS = ["wordsOf", "keywordsFor", "haystackFor", "singular", "stemmed"]
/* What the two packages read off their bundle at the top of the file. */
const packageScope = (data) => ({
  icons: data.icons,
  keywords: data.keywords ?? {},
  foreign: data.names ?? {},
  NAMES: Object.keys(data.icons),
})
const RANKED = [
  {
    file: "packages/mcp/src/index.mjs",
    label: "mcp",
    bundle: "packages/mcp/icons.json",
    lift: [...SHARED_HELPERS, "wholeWord", "answers", "search"],
    scope: (data) => packageScope(data),
    ask: (search, query) => search(query, null, 5).map((h) => h.name),
  },
  {
    file: "packages/cli/src/index.mjs",
    label: "cli",
    bundle: "packages/cli/icons.json",
    lift: [...SHARED_HELPERS, "wholeWord", "answers", "search"],
    scope: (data) => packageScope(data),
    ask: (search, query) => search(query, undefined, 5),
  },
  {
    file: "packages/figma-plugin/ui.html",
    label: "plugin",
    bundle: "packages/figma-plugin/icons.json",
    lift: [...SHARED_HELPERS, "CONCEPTS", "answers", "artOf", "search"],
    // What `load()` sets, and the panel's opening style and treatment.
    scope: (data) => ({
      ICONS: data.icons,
      KEYWORDS: data.keywords || {},
      FOREIGN: data.names || {},
      NAMES: Object.keys(data.icons),
      style: "stroke",
      corners: "regular",
    }),
    // The panel lowercases for the substring tiers and keeps the raw form for
    // `wordsOf`, which needs the case to recognise a pasted identifier.
    ask: (search, query) =>
      search(query.trim().toLowerCase(), query.trim()).map((h) => h.name),
  },
]

/**
 * The site's half: the helpers its grid filters and sorts a search with.
 * `matches` and `ordered` in the component are one call each into these.
 */
const SITE_RANK = ["byName", "namedBy", "leadOf", "bySearch"]

/**
 * One declaration out of a source file, by name: from its first line to the
 * last line indented under it.
 *
 * Indentation is enough because all four files are laid out the same way: a
 * declaration's body always sits deeper than its first line, and its closing
 * bracket comes back to that line's level. It is the same bet the rest of this
 * file makes by reading the four as text.
 */
function lift(src, file, name) {
  const head = new RegExp(
    `^([ \\t]*)(?:function ${name}\\(|const ${name}\\b[^=\\n]*=)`,
    "m"
  ).exec(src)
  if (!head) {
    console.error(
      `  ${c(31, "MISSING")}  ${file}\n` +
        `    No \`${name}\` to lift. Its search calls it, so either it was renamed\n` +
        `    and RANKED or SITE_RANK in this file has to follow, or the search no\n` +
        `    longer calls it and it comes off the list.`
    )
    process.exit(1)
  }
  const depth = head[1].length
  const lines = src.slice(head.index).split("\n")
  let end = 1
  for (; end < lines.length; end++) {
    const line = lines[end]
    const body = line.trimStart()
    if (!body) continue
    const indent = line.length - body.length
    if (indent > depth || (indent === depth && /^[}\])]/.test(body))) continue
    break
  }
  return lines.slice(0, end).join("\n").trimEnd()
}

/** The site's parameter types, the only TypeScript in what SITE_RANK lifts. */
const untype = (s) => s.replace(/\b(\w+): (?:BrowserIcon|string)\b/g, "$1")

/* Indentation differs by nesting depth and the plugin folds two `.replace`
   calls onto one line. Neither is a difference in the code, so whitespace is
   collapsed and then dropped entirely before a `.`, which is what turns
   `query .replace(` and `query.replace(` into the same string. */
const flatten = (s) => s.replace(/\s+/g, " ").replace(/\s+\./g, ".").trim()

/**
 * The cases worth failing over.
 *
 * `want` is the exact word list. A case exists because it broke once or because
 * something else would break if it changed.
 */
const CASES = [
  // The identifier forms.
  ["CheckCircle2", ["check", "circle"], "the other set's name for circle-check"],
  ["RefreshCw", ["refresh", "cw"], "two words, no digits"],
  ["ArrowDownNarrowWide", ["arrow", "down", "narrow", "wide"], "four words"],
  ["Share2", ["share"], "no case boundary anywhere. This is the one that was wrong"],
  ["Trash2", ["trash"], "same shape as Share2"],
  ["Volume2", ["volume"], "same shape as Share2"],

  // The `Icon` suffix, from a set that puts it on every export. The first has
  // no case boundary at all and was never an identifier; the rest split into a
  // word list ending in `icon`, which no drawing carries.
  ["Globe02Icon", ["globe"], "digits before the suffix, no boundary anywhere"],
  ["CheckmarkCircle02Icon", ["checkmark", "circle"], "same, with a boundary"],
  ["FileCodeIcon", ["file", "code"], "no digits, and `icon` must not survive"],
  ["SparklesIcon", ["sparkles"], "one word under the suffix"],
  ["Icon", ["icon"], "the bare word is not a suffix"],
  ["Lexicon", ["lexicon"], "a word that happens to end in icon, lowercase"],

  // The guard. These are real names in the set and must keep their digits.
  ["clock-3", ["clock", "3"], "a real name"],
  ["dice-5", ["dice", "5"], "a real name"],
  ["bar-chart-2", ["bar", "chart", "2"], "a real name"],

  // Ordinary queries, which nothing should be doing anything clever to.
  ["check", ["check"], "one word"],
  ["arrow-down", ["arrow", "down"], "hyphenated, as typed"],
  ["shopping cart", ["shopping", "cart"], "spaced, as typed"],
  ["", [], "empty"],
]

/**
 * Queries that must reach a particular drawing.
 *
 * The word someone types, and the icon they meant. Every row here is a word the
 * set does not call the thing, which is the only kind worth writing down: a
 * query that already matches the file name cannot regress without the file name
 * changing with it.
 *
 * `Trash2` is the row this table was built for. It sat in CASES above, green,
 * for as long as it took someone to notice that `["trash"]` matched nothing.
 */
const FINDS = [
  ["Trash2", "bin", "the other set's name. The drawing is `bin` and nothing said so"],
  ["trash", "bin", "the word most people would type first"],
  ["delete", "bin", "and the word the rest would type"],
  ["gear", "settings", "nobody looks for `settings` before trying this"],
  ["email", "mail", "the other half of the room"],
  ["hamburger", "menu", "what the three lines are called out loud"],
  ["south", "arrow-down", "reached the site alone until the aliases shipped"],
  ["theme", "sun", "the toggle, which neither drawing is named after"],
  ["paste", "copy", "the pair's other half; `paste` has had its own drawing since 1.5.0"],
  ["stats", "bar-chart", "`statistics` was there, the short form was not"],
  ["screen", "monitor", "the word for the object, which the drawing is not named after"],
  ["spinner", "loader", "and the word for the state, same"],
  ["office", "building", "nobody types `building` first"],
  ["cc", "captions", "the two letters the drawing shows"],
  ["cc", "captions-sparkles", "missed until 22 Sep 2026: only the plain one carried the letters"],
  ["cc", "subtitles-sparkles", "and its sibling, same"],

  // The plural, which is what the category rail is written in and what every
  // other set answers. `arrows` matched `git-compare-arrows` and nothing else:
  // one drawing out of 585, on the word printed above 66 of them.
  //
  // It is the one plural that does not mean "the family". It asks for the
  // drawings carrying more than one arrowhead, so it is a keyword rather than
  // a stem, and MISSES below is the other half of this rule.
  ["arrows", "fullscreen", "two arrows, and the name says neither word"],
  ["arrows", "chevrons-up-down", "the doubled chevrons are arrows too"],
  ["arrows", "refresh-cw", "two curved ones, filed under Arrows on the site"],
  ["charts", "bar-chart", "found nothing at all before the singular rule"],
  ["bells", "bell", "same, and there are seven of them"],
  ["files", "file", "matched the eleven `files-*` names and not `file`"],
  ["folders", "folder", "same shape as files"],
  ["chevron", "chevrons-left", "and the other direction, which whole words missed"],

  // Word order, which is the other way a name from elsewhere fails to land.
  ["CheckCircle2", "circle-check", "compounds here read base-first"],
  ["check circle", "circle-check", "same, typed as words"],
  ["down arrow", "arrow-down", "either order asks the same question"],
  ["AlertCircle", "circle-alert", "the other set's old spelling, mark first"],
  ["Globe02Icon", "globe", "another set's export name, pasted whole"],
  ["CheckmarkCircle02Icon", "circle-check", "same, and `checkmark` is their word"],
  ["FileTextIcon", "file-text", "same, no digits"],

  // Empty searches from the export of 23 Sep 2026, each a drawing the set
  // already had under words the searcher did not use.
  ["human", "user", "5 empty searches while `person` sat on the same drawing"],
  ["human", "boy", "and the whole figures, which carried no person word at all"],
  ["people", "user", "the plural of the same question, which reached only `users`"],
  ["people", "girl", "and the whole figures, same"],
  ["guest", "user", "the signed-out person, same drawing"],
  ["wrong", "circle-x", "the mark for an answer marked wrong"],
  ["thunder", "zap", "`lightning` found it, the other half of the storm did not"],
  ["feedback", "message-square", "the bubble on every feedback button"],
  ["execute", "play", "`run` was there, the formal word was not"],
  ["process", "terminal", "a running process, where it runs"],
]

/**
 * Names whose drawing has to come back FIRST, on all four surfaces.
 *
 * FINDS asks whether a query reaches a drawing at all, which is the right
 * question for a word. A name asks for one drawing, and second place is a
 * miss: the plugin inserts its top hit on Enter, and an agent takes the first
 * result and moves on. So these run through each surface's own ranking, and
 * every row here is a FINDS row too.
 *
 * The rows are the names shadcn/create builds its previews from: the default
 * library's name on every IconPlaceholder, `Icon` stripped, kebab-cased. 182
 * of them at shadcn-ui/ui b0fcb58 (1 Oct 2026). 143 are drawn here under the
 * same name and lead on the exact tier, which the first rows stand for. The
 * other 39 are drawn under this set's own names, 34 matched on a rendered
 * sheet rather than by name and five drawn in 1.5.0 to answer them, and lead
 * through `names` in lib/icon-aliases.json. The note on each says what else
 * answers to it, or what led before its row existed.
 */
const FIRST = [
  // The exact tier. The site's grid was alphabetical under a search too.
  ["x", "x", "the site opened on `airpods-open`"],
  ["user", "user", "the site opened on `at`"],
  ["file", "file", "the site opened on `archive`"],
  ["check", "check", "the site opened on `alarm-clock-check`"],
  ["settings", "settings", "the site opened on `brain-cog`"],
  ["save", "save", "`bookmark`, `download` and `heart` answer to the word too"],
  ["tv", "tv", "`cast` and `monitor` answer to it too"],
  ["frame", "frame", "every `gallery-*` carries `frames`, and the grid matches inside it"],
  ["blocks", "blocks", "`ban` carries `block`, which the plural folds onto"],
  ["star-off", "star-off", "a redirect sent it to `star` until 1.5.0 drew it"],
  ["archive-x", "archive-x", "a redirect sent it to `archive` until 1.5.0 drew it"],
  ["file-chart-column", "file-chart-column", "a redirect sent it to a blank `file`"],

  // Another set's name, drawn here under this set's.
  ["alert-circle", "circle-alert", "led through its words alone"],
  ["alert-triangle", "triangle-alert", "led through its words alone"],
  ["arrow-left-circle", "circle-arrow-left", "the site opened on `circle-arrow-down-left`"],
  ["building-2", "building", "the plugin found nothing"],
  ["check-circle-2", "circle-check", "nothing anywhere: the `2` is theirs and the order is ours"],
  ["circle-help", "circle-question", "led through its words alone"],
  ["circle-user-round", "circle-user", "led with `user`, out of its circle"],
  ["corner-up-left", "reply", "the site and the plugin led with `corner-left-up`"],
  ["corner-up-right", "forward", "the site and the plugin led with `corner-right-up`"],
  ["ellipsis-vertical", "more-vertical", "led through its words alone"],
  ["file-archive", "file-zip", "led with a blank `file`, or `archive`"],
  ["help-circle", "circle-question", "led through its words alone"],
  ["languages", "language", "the site opened on `globe`"],
  ["layout", "panels-top-left", "led with `layout-dashboard`, or `grid-2x2` on the site"],
  ["layout-grid", "grid-squares", "led with `grid-2x2` everywhere"],
  ["life-buoy", "lifebuoy", "led through its words alone"],
  ["loader-2", "loader-circle", "led with `loader`, the spokes rather than the ring"],
  ["lock-keyhole", "lock", "the plugin found nothing"],
  ["log-out", "bracket-arrow-right", "bracket on the left, arrow leaving it: their drawing, which the row had mirrored"],
  ["message-circle", "message", "the plugin found nothing"],
  ["pencil", "pen", "the packages and the plugin led with `pencil-ruler`"],
  ["pie-chart", "chart-pie", "led through its words alone"],
  ["plus-circle", "circle-plus", "the site opened on `circle-dashed-plus`"],
  ["presentation", "easel", "led with `monitor` everywhere"],
  ["settings-2", "sliders-2-horizontal", "the same drawing; three surfaces led with the gear"],
  ["smile", "face-smile", "led through its words alone"],
  ["stop-circle", "circle-stop", "the site opened on `circle-progress-stop`"],
  ["terminal-square", "square-terminal", "led through its words alone"],
  ["trash", "bin", "led through its words alone"],
  ["trash-2", "bin-2", "led through its words alone"],
  ["user-round-x", "user-x", "the plugin found nothing"],
  ["volume-2", "volume", "the site and the plugin led with a slider"],
  ["zoom-in", "search-plus", "led with `fullscreen`, or a bare `search` in the plugin"],
  ["zoom-out", "search-minus", "the site led with `fullscreen-exit`"],

  // Drawn in 1.5.0 for these names, under the set's own spelling.
  ["external-link", "square-arrow-out-up-right", "the word people type; the name says what it draws"],
  ["file-bar-chart", "file-chart-column", "an older name for the same drawing"],
  ["file-warning", "file-alert", "the set calls that mark `alert`"],
  ["message-circle-question", "message-question", "the round bubble is plain `message` here"],
  ["upload-cloud", "cloud-upload", "the older order, with the element last"],

  // Names nothing routed before 1.7.0, read off shadcn/ui's own source and the
  // other set's renames. Each found a drawing through its words, or nothing.
  ["ellipsis", "more-horizontal", "led with `more-vertical`; their ellipsis lies flat"],
  ["check-check", "double-check", "led with a lone `check`"],
  ["face-slightly-smiling", "face-smile", "their rename of `smile`, which found nothing"],
  ["mouse-pointer-2", "cursor", "the same arrowhead; found nothing"],
  ["undo", "arrow-u-turn-left", "led with `eraser`, the u-turn fifth"],
  ["redo", "arrow-u-turn-right", "led with `rotate-cw`, and the undo arrow ahead of it"],
  ["text-align-start", "align-left", "their rename of `align-left`, which found nothing"],
  ["text-align-end", "align-right", "same"],
  ["funnel", "filter", "their rename of `filter`"],
  ["wifi-off", "wifi-x", "a slash shreds the arcs (drawing-a-new-icon.md); the x negates"],
  ["a-large-small", "case-upper", "the same drawing: a capital A beside a small one"],
  ["building-complex", "buildings", "a tall block beside a low one, under our plural"],
  ["audio-waveform", "audio-lines", "the sound's levels, drawn here as bars"],
  ["circle-fading-plus", "circle-progress-plus", "their fading ring is our progress ring, drawn in 1.7.0"],
  ["circle-fading-arrow-up", "circle-progress-arrow-up", "same"],
  ["video-off", "camera-off", "a slash leaves video's reels as a half and a nicked ring; a call's video off is its camera"],
]

/**
 * Queries that must NOT reach a drawing.
 *
 * The other half of a search: every rule that widens one is one row away from
 * answering everything. These are the rows that say where a widening stops.
 *
 * All four here are the same distinction, asked twice in each direction:
 * `arrow` is the single-arrow question and `arrows` is the doubled one. The
 * singular rule collapses every other plural into its family on purpose, and
 * collapsing this one would leave the set with no way to ask either question.
 */
const MISSES = [
  ["arrow", "fullscreen", "the singular must not inherit the plural's drawings"],
  ["arrow", "chevrons-up-down", "same, and this is the pair someone would notice"],
  ["arrows", "arrow-down", "the plural asks for more than one arrowhead"],
  ["arrows", "file-arrow-up", "same, one arrow on a document"],
]

/**
 * Names in `names` that the set also draws, kept on purpose.
 *
 * Another set calls this set's `share` `share-2`, and this set's own `share-2`
 * is a different drawing. The exact name leads as it must; the row puts the
 * drawing that set meant second. Every other drawn name in the table is a
 * redirect a batch forgot to delete, which only ever misfiles the second
 * result, so nothing noticed thirty of them.
 */
const CROSSED = new Set(["share-2"])

const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

/**
 * The words an icon answers to, computed the way each side computes them.
 *
 * `site` follows lib/icon-taxonomy.ts: patterns are applied to the
 * container-stripped base, and the descriptions are read under that base.
 * `packages` follows what pipeline/build-data.mjs baked into the bundle and how
 * `keywordsFor` reads it back out.
 *
 * Two spellings of one idea, which is why they are compared by result rather
 * than as text. If they ever disagree, one of the two files changed and the
 * other did not.
 */
function vocabularies(bundle, described, aliases) {
  const patterns = aliases.map((a) => ({ match: new RegExp(a.match), terms: a.terms }))
  const baseOf = (name) => {
    if (NOT_CONTAINERS.has(name)) return name
    const m = /^(square|circle)-(.+)$/.exec(name)
    return m && bundle.icons[m[2]] ? m[2] : name
  }

  const site = {}
  const packages = {}
  for (const name of Object.keys(bundle.icons)) {
    const base = baseOf(name)
    site[name] = [
      name,
      ...new Set([
        ...(described[base] ?? []),
        ...patterns.filter((a) => a.match.test(base)).flatMap((a) => a.terms),
      ]),
    ].join(" ")
    packages[name] = `${name} ${(bundle.keywords?.[base] ?? []).join(" ")}`
  }
  return { site, packages }
}

async function main() {
  const found = []
  const stems = []
  for (const [file, label] of SOURCES) {
    const src = await readFile(join(ROOT, file), "utf8")
    const m = src.match(BODY)
    if (!m) {
      console.error(
        `  ${c(31, "MISSING")}  ${file}\n` +
          `    No shared search body found. Either this surface stopped using it, in\n` +
          `    which case remove it from SOURCES, or it was reworded and this file has\n` +
          `    to follow.`
      )
      process.exit(1)
    }
    const sing = src.match(SINGULAR)
    const stem = src.match(STEMMED)
    if (!sing || !stem) {
      console.error(
        `  ${c(31, "MISSING")}  ${file}\n` +
          `    No singular rule. Without it a plural only finds the names that carry\n` +
          `    the letter: \`arrows\` came back with \`git-compare-arrows\` and nothing\n` +
          `    else, on the word printed above 66 drawings.`
      )
      process.exit(1)
    }
    stems.push({
      file,
      label,
      singular: sing[1],
      stemmed: stem[1],
      flat: flatten(`${sing[1]} ${stem[1]}`),
    })
    /* Two forms: the original runs, the flattened one compares. Flattening
       strips the newlines that terminate these statements, so the flat form
       is not executable and must never be the thing that runs. */
    found.push({ file, label, code: m[0], flat: flatten(m[0]) })
  }

  /* 1. Agreement. */
  const [first, ...rest] = found
  const drifted = rest.filter((f) => f.flat !== first.flat)

  const stemDrift = stems.slice(1).filter((s) => s.flat !== stems[0].flat)

  /* 2. Behaviour, run on the one they all agree on. */
  const wordsOf = new Function("query", found[0].code)
  /* Wrapped in parentheses on purpose. The lifted body starts on the line after
     the arrow, so `return ${body}` is `return` followed by a newline, which is
     `return undefined` and nothing else. That shipped for one commit: `singular`
     handed back undefined, `stemmed` painted the word "undefined" over every
     haystack, and section 5 below matched all 585 icons for every query it was
     given, which is a table of 23 rows that cannot fail. */
  const singular = new Function("w", `return (${stems[0].singular})`)
  const stemmed = new Function(
    "singular",
    `return (hay) => (${stems[0].stemmed})`
  )(singular)
  const failures = []
  for (const [query, want, why] of CASES) {
    let got
    try {
      got = wordsOf(query)
    } catch (e) {
      failures.push({ query, want, got: `threw: ${e.message}`, why })
      continue
    }
    if (!same(got, want)) failures.push({ query, want, got, why })
  }

  if (json) {
    console.log(
      JSON.stringify(
        {
          surfaces: found.map((f) => f.label),
          drifted: [...drifted, ...stemDrift].map((d) => d.file),
          failures,
        },
        null,
        2
      )
    )
    process.exit(drifted.length || stemDrift.length || failures.length ? 1 : 0)
  }

  if (stemDrift.length) {
    console.error(`  ${c(31, "DRIFTED")}  the singular rule is not the same code\n`)
    for (const d of [stems[0], ...stemDrift]) {
      console.error(`    ${d.label} (${d.file}):`)
      console.error(`      ${d.flat}\n`)
    }
  }

  if (drifted.length) {
    console.error(`  ${c(31, "DRIFTED")}  the four searches are not the same code\n`)
    console.error(`    ${first.label} (${first.file}):`)
    console.error(`      ${first.flat}\n`)
    for (const d of drifted) {
      console.error(`    ${d.label} (${d.file}):`)
      console.error(`      ${d.flat}\n`)
    }
    console.error(
      `    A search fix has to land in all four. This is the third time a change\n` +
        `    reached some of them and not the rest.`
    )
  }

  for (const f of failures) {
    console.error(
      `  ${c(31, "WRONG")}    ${JSON.stringify(f.query)} -> ${JSON.stringify(f.got)}, ` +
        `expected ${JSON.stringify(f.want)}\n           ${f.why}`
    )
  }

  if (drifted.length || stemDrift.length || failures.length) {
    console.error(
      `\n${drifted.length + stemDrift.length ? `${drifted.length + stemDrift.length} surface(s) drifted. ` : ""}` +
        `${failures.length ? `${failures.length} case(s) wrong. ` : ""}`
    )
    process.exit(1)
  }

  /* 3. The haystack helper, which is how a keyword is reached at all. The MCP
     server and the CLI shipped without any keyword support for their whole
     life, so this exists to make its absence loud rather than invisible. */
  const hay = []
  for (const [file, label] of HAYSTACK_FILES) {
    const src = await readFile(join(ROOT, file), "utf8")
    const m = src.match(HAYSTACK)
    if (!m) {
      console.error(
        `  ${c(31, "MISSING")}  ${file}\n` +
          `    No haystackFor. Without it this surface cannot reach a keyword at all,\n` +
          `    which is how "south" found nine icons on the site and none in the CLI.`
      )
      process.exit(1)
    }
    hay.push({ file, label, flat: flatten(m[0]) })
  }
  const hayDrift = hay.slice(1).filter((h) => h.flat !== hay[0].flat)
  if (hayDrift.length) {
    console.error(`  ${c(31, "DRIFTED")}  haystackFor is not the same in every package\n`)
    for (const h of [hay[0], ...hayDrift]) console.error(`    ${h.label}: ${h.flat}`)
    process.exit(1)
  }

  /* 3b. The concept words, on the two surfaces that match substrings. */
  const concepts = []
  for (const [file, label] of CONCEPT_FILES) {
    const src = await readFile(join(ROOT, file), "utf8")
    const m = src.match(CONCEPTS)
    if (!m) {
      console.error(
        `  ${c(31, "MISSING")}  ${file}\n` +
          `    No CONCEPTS. This surface matches inside a word, so without it \`arrow\`\n` +
          `    is handed every drawing keyworded \`arrows\` and the two questions become\n` +
          `    one again.`
      )
      process.exit(1)
    }
    concepts.push({ file, label, source: m[1], flat: flatten(m[1]) })
  }
  const conceptDrift = concepts.slice(1).filter((x) => x.flat !== concepts[0].flat)
  if (conceptDrift.length) {
    console.error(`  ${c(31, "DRIFTED")}  CONCEPTS is not the same in both\n`)
    for (const x of [concepts[0], ...conceptDrift]) console.error(`    ${x.label}: ${x.flat}`)
    process.exit(1)
  }

  /* The rule the two substring surfaces actually run, rebuilt from their own
     source: concept words cut out unless the query asked for one whole, then
     the raw word, then the singular. */
  const conceptsRe = new RegExp(concepts[0].source.slice(1, -2), "g")
  const answers = (haystack, words) => {
    const hay = haystack.replace(conceptsRe, (m, lead, word) =>
      words.includes(word) ? m : lead
    )
    const stem = stemmed(hay)
    return words.every((w) => hay.includes(w) || stem.includes(singular(w)))
  }

  /* 4. The vocabulary itself, which the check above cannot see.

     `haystackFor` being identical in three files says nothing about whether the
     words it looks up are the same words the site looks up. The site derives
     them in TypeScript from a container-stripped base; the packages read them
     out of a bundle baked by build-data.mjs. Same idea, two spellings, so they
     are compared by result. */
  const bundle = JSON.parse(await readFile(join(ROOT, "packages/mcp/icons.json"), "utf8"))
  const { keywords: described } = JSON.parse(
    await readFile(join(ROOT, "lib/icon-keywords.json"), "utf8")
  )
  const { aliases, names } = JSON.parse(
    await readFile(join(ROOT, "lib/icon-aliases.json"), "utf8")
  )
  const vocab = vocabularies(bundle, described, aliases)

  const vocabDrift = []
  for (const name of Object.keys(bundle.icons)) {
    const a = new Set(vocab.site[name].split(" ").filter(Boolean))
    const b = new Set(vocab.packages[name].split(" ").filter(Boolean))
    const onlySite = [...a].filter((w) => !b.has(w))
    const onlyPackages = [...b].filter((w) => !a.has(w))
    if (onlySite.length || onlyPackages.length)
      vocabDrift.push({ name, onlySite, onlyPackages })
  }

  /* 5. Outcomes. The only section that answers "does typing this find it".

     Matched with the shared rule rather than with any one surface's copy of it,
     so a row failing here means the words are missing, not that one file drifted
     — sections 1 and 3 have already ruled that out by this point. Another set's
     name for a drawing is part of that rule: all four answer it whole, before
     any word is read. */
  const foreign = bundle.names ?? {}
  const found2 = (query) => {
    const words = wordsOf(query)
    const q = query.toLowerCase().trim()
    return Object.keys(bundle.icons).filter(
      (n) =>
        foreign[q] === n ||
        n.includes(q) ||
        (words.length && answers(vocab.packages[n], words))
    )
  }

  const missed = []
  for (const [query, want, why] of [...FINDS, ...FIRST]) {
    const hits = found2(query)
    if (!hits.includes(want)) missed.push({ query, want, why, hits: hits.slice(0, 5) })
  }

  /* 6. The rows that must not match, which is the only section that can fail
     by a search getting wider. */
  const overreach = []
  for (const [query, avoid, why] of MISSES) {
    if (found2(query).includes(avoid)) overreach.push({ query, avoid, why })
  }

  /* 7. Leads. The first result, asked of each surface's own code.

     The packages and the plugin are plain JavaScript, so their search is
     lifted out with everything it calls and run on that surface's own bundle.
     The site's ranking lives in four module-level helpers; its matching is the
     shared rule sections 1 to 4 have already pinned to the component, run on
     the site's vocabulary. */
  const ranked = []
  for (const r of RANKED) {
    const src = await readFile(join(ROOT, r.file), "utf8")
    const data = JSON.parse(await readFile(join(ROOT, r.bundle), "utf8"))
    const code = r.lift.map((name) => lift(src, r.file, name)).join("\n")
    const scope = r.scope(data)
    const search = new Function(...Object.keys(scope), `${code}\nreturn search`)(
      ...Object.values(scope)
    )
    ranked.push({ label: r.label, first: (query) => r.ask(search, query)[0] })
  }

  const siteFile = "components/icon-browser.tsx"
  const siteSrc = await readFile(join(ROOT, siteFile), "utf8")
  const CONTAINERS = JSON.parse(
    /export const CONTAINERS = (\[[^\]]*\])/.exec(
      await readFile(join(ROOT, "components/glyph.tsx"), "utf8")
    )[1]
  )
  /* lib/icon-taxonomy.ts's lookup, over the table it reads. */
  const named = Object.fromEntries(
    Object.entries(names ?? {}).flatMap(([icon, list]) => list.map((n) => [n, icon]))
  )
  const iconNamedElsewhere = (query) => named[query.trim().toLowerCase()]
  const site = new Function(
    "CONTAINERS",
    "iconNamedElsewhere",
    `${SITE_RANK.map((name) => untype(lift(siteSrc, siteFile, name))).join("\n")}\n` +
      `return { namedBy, bySearch }`
  )(CONTAINERS, iconNamedElsewhere)
  const gridIcons = Object.keys(bundle.icons).map((name) => {
    const m = NOT_CONTAINERS.has(name) ? null : /^(square|circle)-(.+)$/.exec(name)
    const boxed = m && bundle.icons[m[2]]
    return { name, base: boxed ? m[2] : name, container: boxed ? m[1] : "regular" }
  })
  ranked.unshift({
    label: "site",
    first: (query) => {
      const words = wordsOf(query)
      return gridIcons
        .filter((i) => site.namedBy(i, query) || answers(vocab.site[i.name], words))
        .sort(site.bySearch(query))[0]?.name
    },
  })

  const misled = []
  for (const [query, want, why] of FIRST) {
    const wrong = ranked
      .map((r) => ({ label: r.label, got: r.first(query) }))
      .filter((r) => r.got !== want)
    if (wrong.length) misled.push({ query, want, why, wrong })
  }

  /* 8. The table of other sets' names, which only ever fails quietly: a row
     pointing at a drawing that is gone answers with nothing, a name listed
     twice keeps whichever came last, and a name the set now draws leads with
     its own drawing and drags the old redirect in second. */
  const rows = []
  const filed = new Map()
  for (const [icon, list] of Object.entries(names ?? {})) {
    if (!bundle.icons[icon])
      rows.push(
        `\`${icon}\` is not drawn, so ${list.join(", ")} ` +
          `${list.length === 1 ? "leads" : "lead"} nowhere`
      )
    for (const name of list) {
      if (filed.has(name))
        rows.push(
          `\`${name}\` is under \`${filed.get(name)}\` and \`${icon}\`; ` +
            `the bundles keep one`
        )
      filed.set(name, icon)
      if (bundle.icons[name] && !CROSSED.has(name))
        rows.push(`\`${name}\` is drawn now, so its row under \`${icon}\` is stale`)
    }
  }

  if (vocabDrift.length) {
    console.error(
      `  ${c(31, "DRIFTED")}  the site and the packages know different words\n`
    )
    for (const d of vocabDrift.slice(0, 8)) {
      console.error(
        `    ${d.name}: ${d.onlySite.length ? `site only [${d.onlySite.join(", ")}]` : ""}` +
          `${d.onlyPackages.length ? ` packages only [${d.onlyPackages.join(", ")}]` : ""}`
      )
    }
    if (vocabDrift.length > 8) console.error(`    ...and ${vocabDrift.length - 8} more`)
    console.error(
      `\n    lib/icon-taxonomy.ts and pipeline/build-data.mjs derive this separately.\n` +
        `    Run: node pipeline/build-data.mjs`
    )
  }

  for (const m of missed) {
    console.error(
      `  ${c(31, "LOST")}     ${JSON.stringify(m.query)} does not find \`${m.want}\`\n` +
        `           ${m.why}\n` +
        `           found instead: ${m.hits.length ? m.hits.join(", ") : "nothing"}\n` +
        `           Add the word to lib/icon-aliases.json, then run build-data.mjs.`
    )
  }

  for (const o of overreach) {
    console.error(
      `  ${c(31, "WIDE")}     ${JSON.stringify(o.query)} should not find \`${o.avoid}\`\n` +
        `           ${o.why}`
    )
  }

  for (const m of misled) {
    console.error(
      `  ${c(31, "BEHIND")}   ${JSON.stringify(m.query)} does not lead with \`${m.want}\`\n` +
        `           ${m.why}\n` +
        `           led instead: ${m.wrong.map((w) => `${w.label} ${w.got ?? "nothing"}`).join(", ")}\n` +
        `           One surface: its ranking lost a tier. All four: list the name under\n` +
        `           its drawing in \`names\` in lib/icon-aliases.json, then run build-data.mjs.`
    )
  }

  for (const r of rows) console.error(`  ${c(31, "NAMES")}    ${r}`)
  if (rows.length)
    console.error(
      `           Fix the row in \`names\` in lib/icon-aliases.json, then run build-data.mjs.`
    )

  if (vocabDrift.length || missed.length || overreach.length || misled.length || rows.length) {
    console.error(
      `\n${vocabDrift.length ? `${vocabDrift.length} icon(s) with a split vocabulary. ` : ""}` +
        `${missed.length ? `${missed.length} quer${missed.length === 1 ? "y" : "ies"} found nothing. ` : ""}` +
        `${overreach.length ? `${overreach.length} reached too far. ` : ""}` +
        `${misled.length ? `${misled.length} name(s) led with another drawing. ` : ""}` +
        `${rows.length ? `${rows.length} row(s) in \`names\` wrong. ` : ""}`
    )
    process.exit(1)
  }

  console.log(
    c(32, `The ${found.length} searches agree and pass ${CASES.length} cases`)
  )
  console.log(`  ${found.map((f) => f.label).join(", ")}`)
  console.log(`  haystackFor identical across ${hay.map((h) => h.label).join(", ")}`)
  console.log(`  one singular rule across ${stems.map((s) => s.label).join(", ")}`)
  console.log(`  one concept rule across ${concepts.map((x) => x.label).join(", ")}`)
  console.log(
    `  one vocabulary across ${Object.keys(bundle.icons).length} icons, ${FINDS.length + FIRST.length} queries reach their drawing, ${MISSES.length} stop short of one`
  )
  console.log(
    `  ${FIRST.length} names lead with their drawing on ${ranked.map((r) => r.label).join(", ")}`
  )
  console.log(
    `  ${filed.size} names from other sets, each on one drawing that is there`
  )
}

main()
