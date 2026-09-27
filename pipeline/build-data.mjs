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
import { categories, OTHER, shelfGlyphs } from "./lib/taxonomy.mjs"

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
const STYLES = ["stroke", "two-tone", "duotone", "fill"]

/**
 * The corner treatments, declared so a consumer can enumerate the axis rather
 * than discovering it by finding a `sharp` key it did not expect.
 */
const CORNERS = ["regular", "sharp"]
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

/**
 * Every drawing the plugin's own chrome asks for by name has to be in the set.
 *
 * The panel draws its search mark, its style samples and its corner toggle from
 * the bundle rather than carrying copies, so a rename here changes what every
 * installed copy renders the next time the CDN refreshes, with no plugin update
 * and no review in between. `CHROME` in `ui.html` is the list; this reads it the
 * way `checkPluginUrl` reads the URL, and fails before the bundle is published
 * rather than after.
 *
 * Checked in every style and both treatments, because that is how the panel
 * asks: the style samples draw one name in each style, and the corner toggle
 * draws one in each treatment.
 */
async function checkPluginGlyphs(icons) {
  const ui = join(ROOT, "packages", "figma-plugin", "ui.html")
  if (!existsSync(ui)) return

  /* To the object's own closing line, comments stripped, and every key must
     yield a quoted name: the same count guard the taxonomy parse uses, so an
     entry written some other way fails here instead of going unchecked. */
  const src = await readFile(ui, "utf8")
  const start = src.indexOf("const CHROME = {")
  const end = src.indexOf("\n  }\n", start)
  const block =
    start < 0 || end < 0
      ? ""
      : src
          .slice(start + "const CHROME = {".length, end)
          .replace(/\/\*[\s\S]*?\*\//g, "")
          .replace(/\/\/[^\n]*/g, "")
  const keys = [...block.matchAll(/^\s*\w+\s*:/gm)].length
  const names = [...block.matchAll(/^\s*\w+\s*:\s*"([^"]+)",?\s*$/gm)].map((m) => m[1])
  if (!keys || keys !== names.length) {
    console.error(`  ${c(31, "✗")} packages/figma-plugin/ui.html: read ${names.length} of ${keys} CHROME names`)
    console.error(`\n  Each entry is \`key: "name",\` on its own line. Fix the entry or this parse.`)
    process.exit(1)
  }
  const missing = names
    .filter(
      (name) =>
        !STYLES.every((s) => icons[name]?.[s] && icons[name].sharp?.[s])
    )
  if (missing.length) {
    console.error(`  ${c(31, "✗")} the plugin's chrome draws ${missing.join(", ")}, not in every style and treatment`)
    console.error(`\n  Rename it in CHROME in packages/figma-plugin/ui.html too. Installed copies`)
    console.error(`  keep the old name until a plugin update clears review, so keep the old`)
    console.error(`  drawing reachable until then.`)
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

/*
 * The sharp half, nested under one key rather than spread across six.
 *
 * `icons[name][style]` goes on meaning the rounded drawing, which is what every
 * consumer already reads and what a stored query in someone's project already
 * expects. `icons[name].sharp[style]` is the second treatment, the same shape
 * one level down, mirroring both `icons/sharp/<style>/` on disk and `Icon.sharp`
 * on the site so the three cannot describe the axis three different ways.
 *
 * Read after the rounded pass and only into names it already found: a sharp
 * file with no rounded sibling is drift, and inventing an icon here would put a
 * name in the CLI that the site has never heard of.
 */
for (const style of STYLES) {
  const dir = join(ROOT, "icons", "sharp", style)
  if (!existsSync(dir)) continue
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()) {
    const name = file.slice(0, -4)
    if (!icons[name]) continue
    ;(icons[name].sharp ??= {})[style] = parse(await readFile(join(dir, file), "utf8"))
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
  corners: CORNERS,
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
const { aliases, names: foreign } = JSON.parse(
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

/* The other direction of the same idea, and deliberately not merged into the
   words above. A name another set uses — `message-square` for this set's
   `message` — is matched whole, because splitting it into words puts
   "square" in the message icon's vocabulary and a search for `square` then
   answers with every message in the set. Keyed by the query rather than by the
   drawing, since that is the direction every consumer reads it. */
const foreignNames = {}
for (const [icon, list] of Object.entries(foreign ?? {}))
  for (const name of list) foreignNames[name] = icon

/*
 * The site's shelves, so the plugin can browse the set the way the rail does
 * instead of as one alphabetical run of 1,114.
 *
 * Carried as data rather than written into the plugin, for the reason the
 * styles are: a shelf the site opens reaches every installed copy on the next
 * push, where anything written into `ui.html` waits for Figma's review. Each
 * shelf lists its own names, containered ones included, resolved by base name
 * exactly as the site files them, and carries the glyph the rail draws it with.
 *
 * Alphabetical with Other last, the rail's order, and only shelves that hold
 * something: the review shelf sits empty between batches and an empty heading
 * in the panel is a dead end.
 */
const TAXONOMY = await categories(ROOT)
const GLYPHS = await shelfGlyphs(ROOT, Object.keys(sorted))
const shelfOf = (name) => {
  const container = NOT_CONTAINERS.has(name) ? null : /^(square|circle)-(.+)$/.exec(name)
  const base = container && sorted[container[2]] ? container[2] : name
  return TAXONOMY.find((t) => t.match.test(base))?.label ?? OTHER
}
const shelves = [
  ...TAXONOMY.map((t) => t.label).sort((a, b) => a.localeCompare(b)),
  OTHER,
]
  .map((label) => ({
    label,
    glyph: GLYPHS[label],
    names: Object.keys(sorted).filter((name) => shelfOf(name) === label),
  }))
  .filter((shelf) => shelf.names.length)

const unglyphed = shelves.filter((shelf) => !shelf.glyph).map((shelf) => shelf.label)
if (unglyphed.length) {
  console.error(`  ${c(31, "✗")} no rail glyph for ${unglyphed.join(", ")}`)
  console.error(`\n  Add a row to CATEGORY_ICONS in components/icon-browser.tsx.`)
  process.exit(1)
}

/**
 * Old names that still resolve: the renames from 1.0.0 on in
 * `lib/icon-renames.json`, for the reason given there. The CLI's `add` and the
 * MCP server's lookups follow one of these before giving up, so `add rocket-2`
 * installs the drawing it always did and says what it is called now.
 */
const renamed = Object.fromEntries(
  JSON.parse(await readFile(join(ROOT, "lib", "icon-renames.json"), "utf8"))
    .renames.filter(({ version, to }) => Number(version.split(".")[0]) >= 1 && sorted[to])
    .map(({ from, to }) => [from, to])
)

const CONTENT =
  JSON.stringify(
    { ...base, keywords, names: foreignNames, renames: renamed, categories: shelves },
    null,
    0
  ) + "\n"

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
  await checkPluginGlyphs(sorted)
  console.log(c(32, `${OUTS.length} data bundles in sync with icons/ (${names} names)`))
} else {
  await checkPluginUrl()
  await checkPluginGlyphs(sorted)
  for (const [label, path] of OUTS) {
    const out = CONTENT
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, out, "utf8")
    console.log(`Wrote ${names} names to ${label} (${(out.length / 1024).toFixed(0)}KB)`)
  }
}
