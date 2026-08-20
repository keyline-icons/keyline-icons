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
const { icons, styles } = data
const NAMES = Object.keys(icons)
const VERSION = "0.1.0"

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
  const alias = { s: "style", o: "out", l: "limit", h: "help", v: "version" }
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
      else if (argv[i + 1] && !argv[i + 1].startsWith("-"))
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

/* ------------------------------------------------------------------ icons */

function svgFor(name, style) {
  const art = icons[name]?.[style]
  if (!art) return null
  const attrs = Object.entries(art.root)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"${attrs}>${art.body}</svg>\n`
}

/** Kept in step with `@keyline-icons/mcp`, which carries the reasoning. */
function wordsOf(query) {
  const identifier = /[a-z][A-Z]/.test(query)
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
function search(query, style, limit) {
  const q = query.toLowerCase().trim()
  const words = wordsOf(query)
  if (!words.length) return []

  return NAMES.filter(
    (n) =>
      (!style || icons[n][style]) &&
      (n.includes(q) || words.every((w) => n.includes(w)))
  )
    .map((n) => {
      const i = n.indexOf(q)
      const rank =
        i === -1
          ? 4
          : n === q
            ? 0
            : n.startsWith(q)
              ? 1
              : /(^|-)/.test(n[i - 1] ?? "-")
                ? 2
                : 3
      return { n, rank }
    })
    .sort(
      (a, b) =>
        a.rank - b.rank || a.n.length - b.n.length || a.n.localeCompare(b.n)
    )
    .slice(0, limit)
    .map((h) => h.n)
}

/** Only reached when a name misses, so it can afford to walk every name. */
function nearest(name) {
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

function resolveOrDie(name, style) {
  if (!icons[name]) {
    const near = nearest(name)
    die(
      `no icon named \`${name}\`.${near.length ? ` Did you mean: ${near.join(", ")}?` : ""}`
    )
  }
  const svg = svgFor(name, style)
  if (!svg) {
    die(
      `\`${name}\` has no ${style} style. It has: ${Object.keys(icons[name]).join(", ")}.\n` +
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
  -o, --out <dir>    Where \`add\` writes         (default: ./icons)
  -l, --limit <n>    Max results for \`search\`   (default: 25)

${bold("EXAMPLES")}
  keyline-icons search arrow
  keyline-icons search mail --style fill
  keyline-icons show check > check.svg
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
    const names = style ? NAMES.filter((n) => icons[n][style]) : NAMES
    for (const n of names) out(n)
    note(dim(`\n${names.length} icons${style ? ` in ${style}` : ""}`))
  },

  search({ flags, positional }) {
    const query = positional.join(" ")
    if (!query) die("search needs a query. Try: keyline-icons search arrow")
    const style = flags.style ? styleOf(flags) : null
    const limit = Math.min(
      Math.max(parseInt(flags.limit ?? "25", 10) || 25, 1),
      200
    )
    const hits = search(query, style, limit)
    if (!hits.length) {
      const near = nearest(query)
      die(
        `nothing matches \`${query}\`.${near.length ? ` Did you mean: ${near.join(", ")}?` : ""}`
      )
    }
    for (const n of hits) {
      const has = styles.filter((s) => icons[n][s])
      out(`${n}${tty ? "  " + dim(`[${has.join(", ")}]`) : ""}`)
    }
    note(dim(`\n${hits.length} shown${style ? ` in ${style}` : ""}`))
  },

  show({ flags, positional }) {
    const [name] = positional
    if (!name) die("show needs an icon name. Try: keyline-icons show check")
    process.stdout.write(resolveOrDie(name, styleOf(flags)))
  },

  async add({ flags, positional }) {
    if (!positional.length) die("add needs at least one icon name.")
    const style = styleOf(flags)
    const dir = resolve(flags.out === true || !flags.out ? "icons" : flags.out)

    // Every name is resolved before anything is written, so a typo in the
    // third of five does not leave two files on disk and an error.
    const files = positional.map((name) => [name, resolveOrDie(name, style)])

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
        `\n${files.length} ${style} icon${files.length === 1 ? "" : "s"} to ${dir}`
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
  process.exit(positional.length ? 0 : 1)
}

const name = positional.shift()
const cmd = commands[name]
if (!cmd) die(`unknown command \`${name}\`. Try: keyline-icons help`)

await cmd({ flags, positional })
