#!/usr/bin/env node
// The Keyline Icons CLI.
//
//   npx @keyline-icons/cli search arrow
//   npx @keyline-icons/cli add circle-arrow-down --style fill --out src/icons
//   npx @keyline-icons/cli show check | pbcopy
//
// No dependencies. An argument parser and a colour helper are twenty lines
// each, and a CLI whose whole job is copying files out of a bundle should not
// pull a dependency tree in to do it.
//
// `show` and `list` write only their payload to stdout, so they pipe. Every
// heading, count and hint goes to stderr, which is what keeps
// `keyline-icons show check > check.svg` from writing a file with a banner
// stuck to the top of it.

import { mkdir, writeFile } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { existsSync } from "node:fs"

const data = JSON.parse(
  await readFile(new URL("../icons.json", import.meta.url), "utf8")
)
// `corners` defaults for a bundle generated before the axis existed, so an
// older icons.json still runs rather than reading `undefined.includes`.
const { icons, styles, corners = ["regular"], keywords = {} } = data
const NAMES = Object.keys(icons)
const VERSION = "0.3.0"

/** Colour only when a human is looking. Piped output stays clean. */
const tty = process.stdout.isTTY
const c = (n, s) => (tty ? `\x1b[${n}m${s}\x1b[0m` : s)
const dim = (s) => c(2, s)
const bold = (s) => c(1, s)
const red = (s) => c(31, s)
const green = (s) => c(32, s)

const out = (s) => process.stdout.write(s + "\n")
const note = (s) => process.stderr.write(s + "\n")

function die(msg) {
  note(`${red("error")} ${msg}`)
  process.exit(1)
}

/* ------------------------------------------------------------------- args */

/**
 * Supports `--style fill`, `--style=fill` and `-s fill`. Anything left over is
 * positional, which is what lets `add a b c --style fill` work in any order.
 */
function parseArgs(argv) {
  const alias = { s: "style", c: "corners", o: "out", l: "limit", h: "help", v: "version" }
  const flags = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--") {
      positional.push(...argv.slice(i + 1))
      break
    }
    if (a.startsWith("--") || (a.startsWith("-") && a.length === 2)) {
      const raw = a.replace(/^--?/, "")
      const [k, inline] = raw.includes("=")
        ? raw.split(/=(.*)/)
        : [raw, undefined]
      const key = alias[k] ?? k
      if (inline !== undefined) flags[key] = inline
      else if (key === "help" || key === "version") flags[key] = true
      else if (
        argv[i + 1] &&
        // A bare negative number is a value, not a flag. Without this `-l -3`
        // read `-3` as its own short flag, left `limit` set to `true`, and fell
        // back to the default, so it showed 25 results while `--limit=-3`
        // clamped to 1. No name in the set starts with a digit, so nothing else
        // can be caught by it.
        (!argv[i + 1].startsWith("-") || /^-\d+(\.\d+)?$/.test(argv[i + 1]))
      )
        flags[key] = argv[++i]
      else flags[key] = true
    } else positional.push(a)
  }
  return { flags, positional }
}

const styleOf = (flags) => {
  const s = flags.style ?? "stroke"
  if (!styles.includes(s))
    die(`unknown style \`${s}\`. One of: ${styles.join(", ")}`)
  return s
}

const cornersOf = (flags) => {
  const k = flags.corners ?? "regular"
  if (!corners.includes(k))
    die(`unknown corner treatment \`${k}\`. One of: ${corners.join(", ")}`)
  return k
}

/* ------------------------------------------------------------------ icons */

/**
 * A drawing in one style and one treatment.
 *
 * The rounded half sits at `icons[name][style]` where it has always sat, and
 * the sharp half one level down under `sharp`, so a project pinned to an older
 * bundle reads the same shape it read before.
 */
function svgFor(name, style, corners = "regular") {
  const art =
    corners === "sharp" ? icons[name]?.sharp?.[style] : icons[name]?.[style]
  if (!art) return null
  const attrs = Object.entries(art.root)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"${attrs}>${art.body}</svg>\n`
}

/** Kept in step with `@keyline-icons/mcp`, which carries the reasoning. */
function wordsOf(query) {
  const identifier =
    /[a-z][A-Z]/.test(query) || /^[A-Z][A-Za-z]*\d+$/.test(query)
  const split = identifier
    ? query
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    : query
  return split
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !(identifier && /^\d+$/.test(w)))
}

/**
 * Matched whole first, then word by word, so a name in another set's word order
 * still lands: compounds here read base-first, and lucide's `CheckCircle2` asks
 * for "check-circle" when the icon is `circle-check`. Kept in step with the
 * copy in `@keyline-icons/mcp`, which carries the full reasoning.
 */
/**
 * The words a name can be found by: the name itself, plus whatever is written
 * about it.
 *
 * Keywords are keyed by base name, because one component set in Figma covers
 * all three containers, so `square-arrow-down` reads `arrow-down`'s words. The
 * prefix only counts when that base exists: `circle-half` is a shape in its own
 * right and there is no `half` for it to contain.
 *
 * Searched as one string rather than as a separate tier, which is what lets a
 * query take a word from each: "help circle" finds `circle-question` because
 * `circle` is in the name and `help` is in the words. Matching the whole query
 * against one keyword, which is what this used to do, could never do that.
 */
function keywordsFor(name) {
  const m = /^(square|circle)-(.+)$/.exec(name)
  return keywords[m && icons[m[2]] ? m[2] : name] || []
}

const haystackFor = (name) => `${name} ${keywordsFor(name).join(" ")}`

/**
 * What another set calls a drawing here: `message-square` for `message`,
 * `arrow-big-up` for `arrow-up`, `loader-2` for `loader`.
 *
 * Matched against the whole query and never split into words, which is the
 * entire reason it is a map of its own rather than more keywords. Folded into
 * the vocabulary instead, `message-square` puts "square" in the message icon's
 * words, and a search for `square` answers with every message in the set —
 * measured on the site's own grid, where the first row of a `square` search
 * came back holding no squares at all.
 */
const foreign = data.names ?? {}

/**
 * Whether `hay` carries `needle` as a whole word, hyphen or space delimited.
 *
 * The rule here used to be a plain substring, and a substring lands inside
 * words that have nothing to do with the query: `box` matched `inbox`, `ad`
 * matched `upload`, `car` matched `caret-up`, `monitor` matched `activity`
 * through its words. Run another set's 1775 names through this and 140 came back
 * holding an icon that shares no word with what was asked for. That reads as a
 * hit, which is worse than an empty result twice over: it hides the gap from
 * anyone counting, and it hands the caller a drawing they did not ask for.
 *
 * The site keeps the looser rule on purpose. It answers every keystroke, and
 * someone typing `arro` has not finished the word yet. Nothing types here. An
 * agent sends a whole name, and the honest answer to a name this set does not
 * have is nothing at all.
 */
const wholeWord = (hay, needle) => {
  for (let i = hay.indexOf(needle); i !== -1; i = hay.indexOf(needle, i + 1)) {
    const before = hay[i - 1] ?? "-"
    const after = hay[i + needle.length] ?? "-"
    if ((before === "-" || before === " ") && (after === "-" || after === " "))
      return true
  }
  return false
}

function search(query, style, limit, corners = "regular") {
  const q = query.toLowerCase().trim()
  const words = wordsOf(query)
  if (!words.length) return []

  return NAMES.filter(
    (n) =>
      (!style || svgFor(n, style, corners)) &&
      (foreign[q] === n ||
        wholeWord(n, q) ||
        words.every((w) => wholeWord(n, w)) ||
        words.every((w) => wholeWord(haystackFor(n), w)))
  )
    .map((n) => {
      const rank =
        n === q
          ? 0
          : foreign[q] === n
            ? 1
            : n.startsWith(q + "-")
              ? 2
              : wholeWord(n, q)
                ? 3
                : words.every((w) => wholeWord(n, w))
                  ? 4
                  : 5
      return { n, rank }
    })
    .sort(
      (a, b) =>
        a.rank - b.rank || a.n.length - b.n.length || a.n.localeCompare(b.n)
    )
    .slice(0, limit)
    .map((h) => h.n)
}

/**
 * The longest query worth answering. Kept in step with `@keyline-icons/mcp`,
 * which carries the reasoning: `nearest` costs O(query x name) per name, so the
 * caller sets the price, and a 200KB query took ten seconds here too.
 */
const MAX_QUERY = 200

/** Only reached when a name misses, so it can afford to walk every name. */
function nearest(name) {
  if (name.length > MAX_QUERY) return []
  const q = name.toLowerCase()
  const hit = search(q, null, 5)
  if (hit.length) return hit
  const d = (a, b) => {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]
      for (let j = 1; j <= b.length; j++)
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        )
      prev = cur
    }
    return prev[b.length]
  }
  const head = q.split("-")[0]
  return NAMES.map((n) => ({
    n,
    d: Math.min(d(q, n), d(head, n.split("-")[0]) + 0.5),
  }))
    .filter(({ d }) => d <= 2)
    .sort((a, b) => a.d - b.d || a.n.length - b.n.length)
    .slice(0, 5)
    .map((h) => h.n)
}

function resolveOrDie(name, style, corners = "regular") {
  if (!icons[name]) {
    const near = nearest(name)
    die(
      `no icon named \`${name}\`.${near.length ? ` Did you mean: ${near.join(", ")}?` : ""}`
    )
  }
  const svg = svgFor(name, style, corners)
  if (!svg) {
    // `Object.keys` would list `sharp` here as though it were a fourth style,
    // which is the axis leaking into a sentence about coverage.
    const has = styles.filter((s) => svgFor(name, s, corners))
    die(
      `\`${name}\` has no ${style} style. It has: ${has.join(", ")}.\n` +
        `      Duotone and fill need a fillable region, and this glyph has none.`
    )
  }
  return svg
}

/* --------------------------------------------------------------- commands */

const HELP = `${bold("keyline-icons")} ${dim(VERSION)}  ${data.count} icons, MIT licensed

${bold("USAGE")}
  keyline-icons <command> [options]

${bold("COMMANDS")}
  search <query>     Find icons by name
  show <name>        Print one icon's SVG to stdout
  add <name...>      Write icons into a directory
  list               Print every icon name
  help               This

${bold("OPTIONS")}
  -s, --style <s>    ${styles.join(" | ")}   (default: stroke)
  -c, --corners <c>  ${corners.join(" | ")}          (default: regular)
  -o, --out <dir>    Where \`add\` writes         (default: ./icons)
  -l, --limit <n>    Max results for \`search\`   (default: 25)

${bold("EXAMPLES")}
  keyline-icons search arrow
  keyline-icons search mail --style fill
  keyline-icons show check --corners sharp > check-sharp.svg
  keyline-icons add circle-arrow-down bell --out src/icons
  keyline-icons list | grep chart

${dim("Every icon takes its colour from currentColor.")}
${dim("https://keylineicons.com")}
`

const commands = {
  help: () => note(HELP),

  version: () => out(VERSION),

  list({ flags }) {
    const style = flags.style ? styleOf(flags) : null
    const treatment = cornersOf(flags)
    const names = style ? NAMES.filter((n) => svgFor(n, style, treatment)) : NAMES
    for (const n of names) out(n)
    note(dim(`\n${names.length} icons${style ? ` in ${style}` : ""}`))
  },

  search({ flags, positional }) {
    const query = positional.join(" ")
    if (!query) die("search needs a query. Try: keyline-icons search arrow")
    if (query.length > MAX_QUERY)
      die(
        `that query is ${query.length} characters. The longest name in the set ` +
          `is under 40, so anything over ${MAX_QUERY} is refused.`
      )
    const style = flags.style ? styleOf(flags) : null
    /* `|| 25` turned every falsy limit into the default, which swallowed `0`
       along with the genuinely unusable ones: `--limit=0` should clamp up to 1,
       the way `--limit=-3` does, rather than quietly show 25. Only a value that
       is not a number at all earns the default. */
    const raw = parseInt(flags.limit ?? "25", 10)
    const limit = Math.min(Math.max(Number.isNaN(raw) ? 25 : raw, 1), 200)
    const hits = search(query, style, limit, cornersOf(flags))
    if (!hits.length) {
      const near = nearest(query)
      die(
        `nothing matches \`${query}\`.${near.length ? ` Did you mean: ${near.join(", ")}?` : ""}`
      )
    }
    for (const n of hits) {
      const has = styles.filter((s) => svgFor(n, s, cornersOf(flags)))
      out(`${n}${tty ? "  " + dim(`[${has.join(", ")}]`) : ""}`)
    }
    note(dim(`\n${hits.length} shown${style ? ` in ${style}` : ""}`))
  },

  show({ flags, positional }) {
    const [name] = positional
    if (!name) die("show needs an icon name. Try: keyline-icons show check")
    process.stdout.write(resolveOrDie(name, styleOf(flags), cornersOf(flags)))
  },

  async add({ flags, positional }) {
    if (!positional.length) die("add needs at least one icon name.")
    const style = styleOf(flags)
    const treatment = cornersOf(flags)
    const dir = resolve(flags.out === true || !flags.out ? "icons" : flags.out)

    // The treatment rides in the filename, for the reason the style does not:
    // two treatments of one drawing are the same name and the same style, so
    // adding both would otherwise write one file twice and leave whichever ran
    // last. Rounded keeps the bare name, which is what everyone means by it.
    const suffix = treatment === "regular" ? "" : `-${treatment}`

    // Every name is resolved before anything is written, so a typo in the
    // third of five does not leave two files on disk and an error.
    const files = positional.map((name) => [
      `${name}${suffix}`,
      resolveOrDie(name, style, treatment),
    ])

    await mkdir(dir, { recursive: true })
    for (const [name, svg] of files) {
      const path = join(dir, `${name}.svg`)
      const existed = existsSync(path)
      await writeFile(path, svg, "utf8")
      note(
        `  ${existed ? c(33, "overwrote") : green("wrote")}  ${join(dirname(path), `${name}.svg`)}`
      )
    }
    note(
      dim(
        `\n${files.length} ${treatment === "sharp" ? "sharp " : ""}${style} ` +
          `icon${files.length === 1 ? "" : "s"} to ${dir}`
      )
    )
  },
}

/* ------------------------------------------------------------------- main */

const argv = process.argv.slice(2)
const { flags, positional } = parseArgs(argv)

if (flags.version) {
  commands.version()
  process.exit(0)
}
if (flags.help || !positional.length) {
  commands.help()
  // Both print the same text and only one of them is a failure. Asking for help
  // succeeded; running with no command did not. `--help` exiting non-zero stops
  // any `set -e` script that offers its own usage line.
  process.exit(flags.help ? 0 : 1)
}

const name = positional.shift()
const cmd = commands[name]
if (!cmd) die(`unknown command \`${name}\`. Try: keyline-icons help`)

await cmd({ flags, positional })
