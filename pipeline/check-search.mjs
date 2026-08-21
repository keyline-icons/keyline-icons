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
 * Two things, and the second is the one that matters:
 *
 *  1. AGREEMENT. The shared expression is lifted out of all four files and
 *     compared with indentation flattened. They have to be the same code. This
 *     catches a fix that lands in three files.
 *  2. BEHAVIOUR. That expression is run against the table below. This catches a
 *     fix that lands in all four and is wrong in all four.
 *
 * It reads the source rather than importing it, because none of the four export
 * the function: the site's is a module-private const, the plugin's lives inside
 * a <script> tag in an HTML file, and the MCP server starts a stdio loop the
 * moment it is imported. Reading the text is the only thing that reaches all
 * four, and it is honest about what it is checking, which is that the code in
 * these four files is the same code.
 *
 * Adding a case is one row in CASES. Adding a fifth surface is one row in
 * SOURCES, provided it spells the shared part the same way.
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

const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

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

  console.log(
    c(32, `The ${found.length} searches agree and pass ${CASES.length} cases`)
  )
  console.log(`  ${found.map((f) => f.label).join(", ")}`)
}

main()
