// Bundle icons/ into the JSON the CLI and the MCP server read.
//
//   node pipeline/build-data.mjs [--check]
//
// Both of those ship to npm, where `icons/` does not exist: an installed
// package has only what is inside it. So the set is flattened into one JSON
// file per package, generated here and committed, the same contract every
// other generated artefact in this repo has.
//
// One file per package rather than a shared `@keyline-icons/data` dependency.
// A third package would be the tidier graph and is the wrong trade here: it
// cannot be installed or tested without pnpm, which does not run on this
// machine, and it buys nothing a consumer can see. Two copies of 400KB is a
// cost paid once at publish; a broken workspace link is a cost paid forever.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
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
const STYLES = ["stroke", "duotone", "fill"]
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const OUTS = [
  ["packages/mcp/icons.json", join(ROOT, "packages", "mcp", "icons.json")],
  ["packages/cli/icons.json", join(ROOT, "packages", "cli", "icons.json")],
  // The plugin's copy is not only bundled, it is the file the plugin fetches at
  // runtime off jsDelivr, so this path is a published URL and moving it breaks
  // every installed copy.
  [
    "packages/figma-plugin/icons.json",
    join(ROOT, "packages", "figma-plugin", "icons.json"),
  ],
]

/**
 * The plugin's fetch URL has to name the repository this file is published from.
 *
 * `ui.html` cannot import `SET_REPO_SLUG`: it is a standalone document loaded
 * into Figma's sandbox with no bundler and no access to the app, so the slug is
 * written out by hand there and nothing has connected the two until now.
 *
 * Worth a check because of what the failure costs. The URL is compiled into
 * every installed copy of the plugin, so a slug that no longer matches shows an
 * empty grid to every user, and it cannot be corrected from this side: it takes
 * a new version through Figma's review queue. Renaming the repository or moving
 * it between owners is the ordinary edit that causes it, and nothing else in the
 * repo would notice.
 *
 * The ref is deliberately not checked. `@main` is the default and a release may
 * legitimately pin `@v1.2.0` instead, which the plugin's README suggests. What
 * must agree is the owner, the repository, and the path to this file.
 */
async function checkPluginUrl() {
  const ui = join(ROOT, "packages", "figma-plugin", "ui.html")
  if (!existsSync(ui)) return

  const slug = (await readFile(join(ROOT, "lib", "site-chrome.ts"), "utf8")).match(
    /SET_REPO_SLUG\s*=\s*"([^"]+)"/
  )?.[1]
  if (!slug) throw new Error("SET_REPO_SLUG not found in lib/site-chrome.ts")

  const url = (await readFile(ui, "utf8")).match(
    /https:\/\/cdn\.jsdelivr\.net\/gh\/([^@"]+)@[^/"]+\/([^"]+)/
  )
  if (!url) {
    console.error(`  ${c(31, "✗")} packages/figma-plugin/ui.html has no jsDelivr URL`)
    process.exit(1)
  }

  const [, owner, path] = url
  const want = "packages/figma-plugin/icons.json"
  if (owner !== slug || path !== want) {
    console.error(`  ${c(31, "✗")} the plugin fetches from the wrong place`)
    if (owner !== slug) console.error(`      owner: ui.html says ${owner}, SET_REPO_SLUG says ${slug}`)
    if (path !== want) console.error(`      path:  ui.html says ${path}, this script writes ${want}`)
    console.error(`\n  Fix the URL in packages/figma-plugin/ui.html. It is compiled into every`)
    console.error(`  installed copy, so a wrong one needs a Figma review to correct.`)
    process.exit(1)
  }
}

const ATTR = /([\w-]+)="([^"]*)"/g
/** Supplied by whatever renders these, so they are not worth storing 1,059 times. */
const DROP = new Set(["width", "height", "xmlns", "viewBox"])

function parse(svg) {
  const open = svg.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  const root = {}
  for (const [, k, v] of open.matchAll(ATTR)) if (!DROP.has(k)) root[k] = v
  const body = svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "")
    .replace(/\s+/g, " ")
    .trim()
  return { root, body }
}

const icons = {}
for (const style of STYLES) {
  const dir = join(ROOT, "icons", style)
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()) {
    const name = file.slice(0, -4)
    icons[name] ??= {}
    icons[name][style] = parse(await readFile(join(dir, file), "utf8"))
  }
}

// Keys sorted, so the file is a stable diff rather than a reshuffle every time
// the filesystem hands the folders back in a different order.
const sorted = Object.fromEntries(
  Object.keys(icons)
    .sort()
    .map((k) => [k, icons[k]])
)

const base = {
  $comment: "GENERATED BY pipeline/build-data.mjs — DO NOT EDIT.",
  styles: STYLES,
  count: Object.keys(sorted).length,
  icons: sorted,
}

/**
 * The searchable words for each base name, from both places they are written.
 *
 * Keyed by base name, exactly as `lib/icon-keywords.json` stores it: one
 * component set in Figma covers all three containers, so the consumer resolves
 * `square-arrow-down` back to `arrow-down` itself.
 *
 * Two sources, because they answer different questions. Figma's descriptions
 * are curated per icon by whoever drew it. The aliases in
 * `lib/icon-aliases.json` are patterns covering whole families at once, for the
 * drawings nobody has described yet, and they are where "hamburger" reaches
 * `menu` and "trash" reaches `bin`.
 *
 * Both used to reach the site alone. The MCP server and the CLI shipped with
 * neither, so `south` found nine icons in the browser and none in the tool an
 * agent actually calls, and the plugin had Figma's half and not this one. That
 * is the reason this is merged here rather than in any one consumer.
 */
const { keywords: described } = JSON.parse(
  await readFile(join(ROOT, "lib", "icon-keywords.json"), "utf8")
)
const { aliases } = JSON.parse(
  await readFile(join(ROOT, "lib", "icon-aliases.json"), "utf8")
)

/* Every matching pattern contributes, the way `aliasesFor` in
   lib/icon-taxonomy.ts applies them: a drawing's family and each modifier hung
   off it both have something to say. `bell-x` is a notification and a
   dismissal. */
const patterns = aliases.map((a) => ({ match: new RegExp(a.match), terms: a.terms }))
const keywords = {}
for (const name of Object.keys(sorted)) {
  /* Containered names are skipped rather than written and ignored. Every
     consumer resolves `circle-check` back to `check` before looking a name up,
     exactly as `aliasesFor` does on the site, so an entry under the containered
     name is unreachable by construction. Twelve of them were being written and
     shipped in all three bundles, which is harmless and reads as though the
     lookup considers them. */
  const container = NOT_CONTAINERS.has(name)
    ? null
    : /^(square|circle)-(.+)$/.exec(name)
  if (container && sorted[container[2]]) continue

  const words = new Set([
    ...(described[name] ?? []),
    ...patterns.filter((p) => p.match.test(name)).flatMap((p) => p.terms),
  ])
  if (words.size) keywords[name] = [...words]
}

const CONTENT = JSON.stringify({ ...base, keywords }, null, 0) + "\n"

const names = Object.keys(sorted).length

if (check) {
  let drift = false
  for (const [label, path] of OUTS) {
    const prev = existsSync(path) ? await readFile(path, "utf8") : null
    if (prev === CONTENT) continue
    console.error(
      `  ${c(33, "DRIFT")} ${label} ${prev === null ? "does not exist" : "is out of sync with icons/"}`
    )
    drift = true
  }
  if (drift) {
    console.error(`\nRun: node pipeline/build-data.mjs`)
    process.exit(1)
  }
  await checkPluginUrl()
  console.log(c(32, `${OUTS.length} data bundles in sync with icons/ (${names} names)`))
} else {
  await checkPluginUrl()
  for (const [label, path] of OUTS) {
    const out = CONTENT
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, out, "utf8")
    console.log(`Wrote ${names} names to ${label} (${(out.length / 1024).toFixed(0)}KB)`)
  }
}
