#!/usr/bin/env node
// Regenerate everything, verify it, commit it, then fix the dates and fold them in.
//
//   pnpm ship -m "Draw sun"
//   pnpm ship                  # opens $EDITOR for the message, like git
//
// This exists for one reason, and it is not tidiness. `history:build` has to run
// *after* the commit: the commit that changes a drawing is the same commit that
// makes its date stale, so running it before produces a file that is wrong the
// moment it lands. That ordering is a rule nobody follows reliably by hand, and
// getting it wrong is visible on every icon page rather than in a failing check.
// A script can hold the order; discipline cannot.
//
// Deliberately NOT here, and each for its own reason:
//
//   keywords:build   needs a Figma dump pasted back in. Two steps, no API token.
//   brand:build      headless Chrome, and the logo changes about once a year.
//   icons:figma      needs the design file, and writing to it needs the plugin
//                    API, which a node script has no door to. Figma stays the
//                    one surface `ship` can only warn about.
//
// Those are manual because they cannot be otherwise, not because nobody got
// round to them. Adding them here would make `ship` fail on machines where it
// should have worked.
//
// Paper used to be on that list and is not any more. It reads as an app you
// need, but Paper Desktop is a local HTTP server, so the import is reachable
// from here whenever the app happens to be open, and when it is not, that is a
// skipped step with a warning rather than a failed ship.

import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const argv = process.argv.slice(2)

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`
const step = (s) => console.log(`\n${c(1, "▶")} ${c(1, s)}`)
const ok = (s) => console.log(`  ${c(32, "✓")} ${s}`)
const warn = (s) => console.log(`  ${c(33, "!")} ${s}`)

function die(msg, hint) {
  console.error(`\n${c(31, "✗")} ${msg}`)
  if (hint) console.error(`  ${hint}`)
  process.exit(1)
}

/** Runs a command, inheriting stdio so the child's own output is the report. */
function run(cmd, args, { quiet = false, env } = {}) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
    env: env ? { ...process.env, ...env } : process.env,
  })
  return { code: r.status ?? 1, out: (r.stdout ?? "") + (r.stderr ?? "") }
}

const git = (...args) => run("git", args, { quiet: true })
const node = (script, ...args) => run("node", [`pipeline/${script}`, ...args])

/**
 * The paths the pipeline owns, staged explicitly rather than with `git add -A`.
 *
 * A blanket add sweeps in whatever else happens to be sitting in the working
 * tree, and there is usually something: a scratch HTML file, a half-finished
 * package. Naming the paths means `ship` can only ever commit its own output
 * plus the drawings that produced it. Anything else you want in the commit,
 * stage yourself first; it is kept.
 */
const OWNED = [
  "raw",
  "icons",
  "components/icons",
  "packages/react/src",
  "packages/mcp/icons.json",
  "packages/cli/icons.json",
  "packages/figma-plugin/icons.json",
  "previews",
  "lib/icon-history.json",
  "README.md",
  "packages/react/README.md",
  /* The other two files `check-readmes --fix` rewrites. It is run above, by
     `ship` itself, so leaving these out does not merely fail to stage work
     someone else did: it edits them and then walks past them, and the counts
     land in the *next* commit that happens to touch the plugin, or in none.
     That went out three times before it was noticed. Anything --fix writes
     belongs here; `check-readmes`'s CLAIMS list is the set. */
  "packages/figma-plugin/README.md",
  "packages/figma-plugin/LISTING.md",
]

/* ------------------------------------------------------------ preflight */

if (git("rev-parse", "--is-inside-work-tree").code !== 0) die("not a git repository")

const branch = git("rev-parse", "--abbrev-ref", "HEAD").out.trim()
if (branch === "HEAD") die("detached HEAD", "Check out a branch before shipping.")

/* ----------------------------------------------------------- regenerate */

step("Regenerate")
for (const [script, label] of [
  ["build.mjs", "icons/"],
  ["build-react.mjs", "React modules"],
  ["build-data.mjs", "data bundles"],
]) {
  if (node(script).code !== 0) die(`${label} failed to build`)
}

// The cover embeds the icon count, so it goes stale whenever the set grows. Its
// --check is pure string comparison and needs nothing; only rebuilding needs
// Chrome. So ask first and rasterise only when the answer is yes, which keeps
// `ship` working on a machine without Chrome for every commit that does not
// touch the cover.
if (node("build-cover.mjs", "--check").code !== 0) {
  if (node("build-cover.mjs").code !== 0) {
    die(
      "the cover is stale and could not be rebuilt",
      "It rasterises through headless Chrome. Set CHROME=/path/to/chrome, or run `pnpm cover:build` on a machine that has one."
    )
  }
} else {
  ok("cover already current")
}

// `--fix`, not a bare check. Every README states the set's counts, so drawing a
// single icon makes all eleven of them stale by definition. Verifying here would
// mean `ship` failing on precisely the change it exists to serve, which is the
// same shape of mistake as running the dates before the commit. CI still runs
// the bare check, so bypassing `ship` is still caught.
if (node("check-readmes.mjs", "--fix").code !== 0) die("README counts could not be rewritten")

/* --------------------------------------------------------------- verify */

step("Verify")
if (node("lint.mjs").code !== 0) die("the icon linter found errors")
if (node("check-demos.mjs").code !== 0) die("a demo references an icon that is not in the set")
// Both are in `icons:ci` too, and both are here because what they catch is a
// batch that added something: a new category label with no icon to draw it
// with, which is a 500 on /icons rather than a missing row, or a new name the
// four searches no longer agree about. Learning that from CI one push later is a
// second commit for what is a one-line fix while the drawing is still open.
if (node("check-categories.mjs").code !== 0) {
  die("a category label has no icon, which is a 500 on /icons")
}
if (node("check-search.mjs").code !== 0) die("the four searches disagree")

const tsc = run("npx", ["tsc", "--noEmit"])
if (tsc.code !== 0) die("typecheck failed")
ok("typecheck clean")

/* --------------------------------------------------------------- commit */

step("Commit")
// Whatever was already staged is kept: `ship` adds to the index, never resets
// it, so `git add` of anything outside OWNED still lands in this commit.
const staged = git("diff", "--cached", "--name-only").out.trim()

// Only the paths that exist. `git add -- a b missing` stages *nothing* and
// exits non-zero, so one absent path silently loses the whole commit, and the
// absent path is normal: `previews/paper/` and the plugin's bundle are not in
// every checkout. Filtering is what makes the list safe to extend.
const present = OWNED.filter((p) => existsSync(join(ROOT, p)))
const add = git("add", "--", ...present)
if (add.code !== 0) die("could not stage the generated files", add.out.trim())

if (!git("diff", "--cached", "--name-only").out.trim()) {
  console.log(`  nothing to commit; the tree already matches the generators`)
  process.exit(0)
}

const files = git("diff", "--cached", "--name-only").out.trim().split("\n")
console.log(`  ${files.length} file${files.length === 1 ? "" : "s"} staged`)
if (staged) ok(`kept ${staged.split("\n").length} you had staged already`)

// Passed straight through, so `-m`, `--no-verify`, `-S` and the rest behave
// exactly as they do with git. With no arguments git opens $EDITOR, which is
// the behaviour anyone running this already expects.
if (run("git", ["commit", ...argv]).code !== 0) die("commit failed or was aborted")

/* -------------------------------------------------------------- history */

step("Dates and boards")
// The whole reason this file exists. The commit above is what makes the dates
// stale, so this runs now and is folded back into it.
if (node("build-history.mjs").code !== 0) die("history rebuild failed")

// Paper reads `lib/icon-history.json`, so it has to follow the rebuild rather
// than sit with the other generators. Built before the commit it bakes in the
// dates as they were one commit ago, and `paper:check` then fails in CI on a
// commit that `ship` itself produced. Found by running it, not by reading it.
if (node("build-paper.mjs").code !== 0) die("Paper boards failed to build")

const after = ["lib/icon-history.json", "previews/paper"].filter((p) =>
  existsSync(join(ROOT, p))
)
const addAfter = git("add", "--", ...after)
if (addAfter.code !== 0) die("could not stage the rebuilt dates", addAfter.out.trim())

if (git("diff", "--cached", "--name-only").out.trim()) {
  // The committer date is pinned across the amend, and without it this never
  // settles: `build-history` reads that date, so amending moves it and the file
  // just written is stale by however long the amend took. Measured at one
  // second, on the three rows the commit added. The displayed labels are day
  // granularity and were unaffected either way, but a `--check` compares
  // strings, and a check that cannot pass is a check nobody runs.
  const committed = git("log", "-1", "--format=%cI").out.trim()
  const amend = run("git", ["commit", "--amend", "--no-edit", "--no-verify"], {
    env: { GIT_COMMITTER_DATE: committed },
  })
  if (amend.code !== 0) die("could not fold the dates into the commit")
  ok("dates and boards rebuilt, amended into the commit")
} else {
  ok("dates and boards unchanged")
}

/* ---------------------------------------------------------------- done */

const head = git("log", "-1", "--format=%h %s").out.trim()
console.log(`\n${c(32, "shipped")}  ${head}`)

// Paper is a two-part loop: `paper:build` writes the sheets, and someone writes
// the sheets into the file. The second half runs here now, because Paper Desktop
// is a local HTTP server rather than a tool only a session can reach. See
// `import-paper.mjs`. It is attempted rather than required: the app is either
// open or it is not, and a shipped commit should not fail over which.
const shipped = git("show", "--name-only", "--format=", "HEAD").out.split("\n")
const touchedPaper = shipped.some((f) => f.startsWith("previews/paper/"))

if (touchedPaper) {
  step("Paper")
  // `--changed HEAD` on top of the importer's own selection: it compares the
  // file to the sheets and cannot see a drawing redrawn under the same name in
  // the same place, which is exactly what a redraw commit is.
  const imported = node("import-paper.mjs", "--changed", "HEAD")

  if (imported.code === 0) {
    // Verify rather than trust the writes: the check reads the file back, and
    // the importer only knows what the tool calls answered.
    if (node("check-paper.mjs").code !== 0) {
      warn("the import ran but the file still does not match previews/paper/")
    }
  } else if (imported.code === 2) {
    // Unreachable, not broken. This is the ordinary case on a machine without
    // Paper open, and it is a warning for the same reason the cover asks before
    // rasterising: `ship` should still work there.
    warn("the Paper sheets changed, so the paper.design file is now behind")
    console.log(`    ${c(2, "open the file in Paper Desktop, then:  pnpm paper:import")}`)
    console.log(`    ${c(2, "confirm with:  pnpm paper:verify")}`)
  } else {
    warn("the Paper import did not finish, so the file is behind")
    console.log(`    ${c(2, "re-run it with:  pnpm paper:import")}`)
  }
}

// Figma cannot be reached from a script at all: writing drawings into the file
// is the plugin API, and the REST API will not carry a vector. So the most that
// can be done here is to say it, in the same breath as everything else that
// moved, rather than leaving it to be remembered.
const touchedRaw = shipped.some((f) => f.startsWith("raw/"))

if (touchedRaw) {
  warn("raw/ changed, so Figma is behind: it is authored there, not generated")
  console.log(`    ${c(2, "swap the vectors in the existing variants through the plugin API,")}`)
  console.log(`    ${c(2, "then confirm with:  pnpm icons:figma")}`)
}

console.log(`  ${c(2, `push when ready:  git push origin ${branch}`)}`)
