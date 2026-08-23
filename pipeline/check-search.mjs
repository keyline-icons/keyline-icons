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
 * Four things, and the last is the one that matters:
 *
 *  1. AGREEMENT. The shared expression is lifted out of all four files and
 *     compared with indentation flattened. They have to be the same code. This
 *     catches a fix that lands in three files.
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
 *
 * It reads the source rather than importing it, because none of the four export
 * the function: the site's is a module-private const, the plugin's lives inside
 * a <script> tag in an HTML file, and the MCP server starts a stdio loop the
 * moment it is imported. Reading the text is the only thing that reaches all
 * four, and it is honest about what it is checking, which is that the code in
 * these four files is the same code.
 *
 * Adding a case is one row in CASES, or one row in FINDS for an outcome.
 * Adding a fifth surface is one row in SOURCES, provided it spells the shared
 * part the same way.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
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
  ["CheckCircle2", ["check", "circle"], "lucide's name for circle-check"],
  ["RefreshCw", ["refresh", "cw"], "two words, no digits"],
  ["ArrowDownNarrowWide", ["arrow", "down", "narrow", "wide"], "four words"],
  ["Share2", ["share"], "no case boundary anywhere. This is the one that was wrong"],
  ["Trash2", ["trash"], "same shape as Share2"],
  ["Volume2", ["volume"], "same shape as Share2"],

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
  ["Trash2", "bin", "lucide's name. The drawing is `bin` and nothing said so"],
  ["trash", "bin", "the word most people would type first"],
  ["delete", "bin", "and the word the rest would type"],
  ["gear", "settings", "nobody looks for `settings` before trying this"],
  ["email", "mail", "the other half of the room"],
  ["hamburger", "menu", "what the three lines are called out loud"],
  ["south", "arrow-down", "reached the site alone until the aliases shipped"],
  ["theme", "sun", "the toggle, which neither drawing is named after"],
  ["paste", "copy", "half of a pair where only one half is drawn"],
  ["stats", "bar-chart", "`statistics` was there, the short form was not"],
  ["screen", "monitor", "the word for the object, which the drawing is not named after"],
  ["spinner", "loader", "and the word for the state, same"],
  ["office", "building", "nobody types `building` first"],

  // Word order, which is the other way a name from elsewhere fails to land.
  ["CheckCircle2", "circle-check", "compounds here read base-first"],
  ["check circle", "circle-check", "same, typed as words"],
  ["down arrow", "arrow-down", "either order asks the same question"],
  ["AlertCircle", "circle-alert", "lucide's old spelling, mark first"],
]

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
    /* Two forms: the original runs, the flattened one compares. Flattening
       strips the newlines that terminate these statements, so the flat form
       is not executable and must never be the thing that runs. */
    found.push({ file, label, code: m[0], flat: flatten(m[0]) })
  }

  /* 1. Agreement. */
  const [first, ...rest] = found
  const drifted = rest.filter((f) => f.flat !== first.flat)

  /* 2. Behaviour, run on the one they all agree on. */
  const wordsOf = new Function("query", found[0].code)
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
        { surfaces: found.map((f) => f.label), drifted: drifted.map((d) => d.file), failures },
        null,
        2
      )
    )
    process.exit(drifted.length || failures.length ? 1 : 0)
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

  if (drifted.length || failures.length) {
    console.error(
      `\n${drifted.length ? `${drifted.length} surface(s) drifted. ` : ""}` +
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
  const { aliases } = JSON.parse(
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
     — sections 1 and 3 have already ruled that out by this point. */
  const missed = []
  for (const [query, want, why] of FINDS) {
    const words = wordsOf(query)
    const q = query.toLowerCase().trim()
    const hits = Object.keys(bundle.icons).filter(
      (n) =>
        n.includes(q) ||
        (words.length &&
          (words.every((w) => n.includes(w)) ||
            words.every((w) => vocab.packages[n].includes(w))))
    )
    if (!hits.includes(want)) missed.push({ query, want, why, hits: hits.slice(0, 5) })
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

  if (vocabDrift.length || missed.length) {
    console.error(
      `\n${vocabDrift.length ? `${vocabDrift.length} icon(s) with a split vocabulary. ` : ""}` +
        `${missed.length ? `${missed.length} quer${missed.length === 1 ? "y" : "ies"} found nothing. ` : ""}`
    )
    process.exit(1)
  }

  console.log(
    c(32, `The ${found.length} searches agree and pass ${CASES.length} cases`)
  )
  console.log(`  ${found.map((f) => f.label).join(", ")}`)
  console.log(`  haystackFor identical across ${hay.map((h) => h.label).join(", ")}`)
  console.log(
    `  one vocabulary across ${Object.keys(bundle.icons).length} icons, ${FINDS.length} queries reach their drawing`
  )
}

main()
