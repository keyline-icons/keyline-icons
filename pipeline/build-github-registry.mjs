#!/usr/bin/env node
// The GitHub registry: a root `registry.json` plus one source file per drawing.
//
//   node pipeline/build-github-registry.mjs [--check]
//
// shadcn's GitHub registries (https://ui.shadcn.com/docs/registry/github) read
// a `registry.json` at the repository root and the files that document names.
// They do not call the site. The HTTP registry under `app/r/` inlines the same
// component at request time, which is why `registry/<catalog>/icons/…tsx`
// existed as a path long before anything sat on disk: the CLI was always
// being told a file path. GitHub is what finally needs the file to be there.
//
// The catalog is split with `include`. One file of every drawing is several
// megabytes, and GitHub's Contents API refuses a blob over 5 MiB; eight
// catalogs by style and treatment stay well under that. shadcn requires each
// included registry file to be named `registry.json`, so each catalog has its
// own directory. Item names still match the HTTP registry (`bell`,
// `fill/bell`, `sharp/fill/bell`), so
// `keyline-icons/keyline-icons/sharp/fill/bell` is the GitHub spelling of
// `@keyline/sharp/fill/bell`.
//
// --check writes nothing and exits non-zero if the output would differ.

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const STYLES = ["stroke", "two-tone", "duotone", "fill"]
const CORNERS = ["regular", "sharp"]
const SITE = "https://keylineicons.com"
const SCHEMA = "https://ui.shadcn.com/schema/registry.json"
const check = process.argv.includes("--check")
const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const ATTR = /([\w-]+)="([^"]*)"/g
const ROOT_DROP = new Set(["width", "height", "xmlns", "viewBox"])

const pascal = (name) =>
  name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")

const itemName = (name, style, corners) =>
  [corners === "sharp" ? "sharp" : null, style === "stroke" ? null : style, name]
    .filter(Boolean)
    .join("/")

const catalogKey = (style, corners) =>
  corners === "sharp" ? `sharp-${style}` : style

/** Same rewrite `registryComponent` in `lib/icon-code.ts` applies. */
const camelizeAttrs = (markup) =>
  markup.replace(/\b([a-z]+(?:-[a-z]+)+)=/g, (_, attr) =>
    attr.replace(/-([a-z])/g, (__, ch) => ch.toUpperCase()).concat("=")
  )

/**
 * Split the way `toStyleArt` in `lib/icons.ts` does, on purpose: the HTTP
 * registry used to emit from that parse, and a GitHub install that reformats
 * the drawing is a silent redo of every file already in someone's project.
 */
function parse(svg) {
  const open = svg.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  const root = {}
  for (const [, k, v] of open.matchAll(ATTR)) {
    if (!ROOT_DROP.has(k)) root[k] = v
  }
  const body = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim()
  return { root, body }
}

function emitComponent(name, { root, body }) {
  const Name = pascal(name)
  const attrs = Object.entries(root)
    .map(([key, value]) => {
      const jsx = camelizeAttrs(`${key}=`).slice(0, -1)
      return /^-?\d+(\.\d+)?$/.test(value)
        ? `      ${jsx}={${value}}`
        : `      ${jsx}="${value}"`
    })
    .join("\n")
  const jsxBody = camelizeAttrs(body)
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => `      ${line.trim()}`)
    .join("\n")

  return `import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ${Name}({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
${attrs}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
${jsxBody}
    </svg>
  )
}
`
}

function describe(name, style, corners, styles) {
  return (
    `${pascal(name)}, the ${style} drawing of ${name} on a ` +
    `24×24 grid, with ${corners === "sharp" ? "squared" : "rounded"} corners. ` +
    `Available in ${styles.join(", ")}.`
  )
}

function targetOf(name, style, corners) {
  return (
    `@components/icons/` +
    `${corners === "sharp" ? "sharp/" : ""}${style === "stroke" ? "" : `${style}/`}` +
    `${name}.tsx`
  )
}

async function walkFiles(dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, ent.name)
    if (ent.isDirectory()) out.push(...(await walkFiles(path)))
    else out.push(path)
  }
  return out
}

const icons = {}
for (const corners of CORNERS) {
  for (const style of STYLES) {
    const dir = join(
      ROOT,
      corners === "sharp" ? join("icons", "sharp", style) : join("icons", style)
    )
    if (!existsSync(dir)) continue
    for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()) {
      const name = file.slice(0, -4)
      icons[name] ??= { regular: {}, sharp: {} }
      icons[name][corners][style] = parse(await readFile(join(dir, file), "utf8"))
    }
  }
}

const names = Object.keys(icons).sort()
const files = new Map()
const catalogs = new Map()

for (const corners of CORNERS) {
  for (const style of STYLES) {
    const key = catalogKey(style, corners)
    const items = []
    for (const name of names) {
      const art = icons[name][corners][style]
      if (!art) continue
      const id = itemName(name, style, corners)
      const rel = `registry/${key}/icons/${name}.tsx`
      files.set(join(ROOT, rel), emitComponent(name, art))
      const styles = STYLES.filter((s) => icons[name][corners][s])
      items.push({
        name: id,
        type: "registry:component",
        title: pascal(name),
        description: describe(name, style, corners, styles),
        docs: `Every style and both corners of ${name}: ${SITE}/icons/${name}`,
        files: [
          {
            path: `icons/${name}.tsx`,
            type: "registry:component",
            target: targetOf(name, style, corners),
          },
        ],
      })
    }
    catalogs.set(key, items)
  }
}

const include = [...catalogs.keys()].map((key) => `registry/${key}/registry.json`)
const rootJson = `${JSON.stringify(
  {
    $schema: SCHEMA,
    name: "keyline",
    homepage: SITE,
    include,
  },
  null,
  2
)}\n`

files.set(join(ROOT, "registry.json"), rootJson)
for (const [key, items] of catalogs) {
  files.set(
    join(ROOT, "registry", key, "registry.json"),
    `${JSON.stringify({ $schema: SCHEMA, items }, null, 2)}\n`
  )
}

const owned = new Set(files.keys())
const registryDir = join(ROOT, "registry")

if (check) {
  let drift = false
  for (const [path, text] of files) {
    const prev = existsSync(path) ? await readFile(path, "utf8") : null
    if (prev === text) continue
    const label = relative(ROOT, path)
    const why = prev === null ? "does not exist" : "is out of sync with icons/"
    console.error(`  ${c(33, "DRIFT")} ${label} ${why}`)
    drift = true
  }
  for (const path of await walkFiles(registryDir)) {
    if (owned.has(path)) continue
    console.error(`  ${c(33, "DRIFT")} ${relative(ROOT, path)} is not generated`)
    drift = true
  }
  if (drift) {
    console.error(`\nRun: node pipeline/build-github-registry.mjs`)
    process.exit(1)
  }
  const drawings = [...catalogs.values()].reduce((n, items) => n + items.length, 0)
  console.log(
    c(
      32,
      `GitHub registry in sync with icons/ (${drawings} items, ${catalogs.size} catalogs)`
    )
  )
} else {
  for (const [path, text] of files) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, text, "utf8")
  }
  let removed = 0
  for (const path of await walkFiles(registryDir)) {
    if (owned.has(path)) continue
    await rm(path)
    removed++
  }
  const drawings = [...catalogs.values()].reduce((n, items) => n + items.length, 0)
  console.log(
    `Wrote ${drawings} registry components in ${catalogs.size} catalogs` +
      (removed ? ` (removed ${removed} stale)` : "")
  )
}
