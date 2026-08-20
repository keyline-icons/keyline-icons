import { readdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

import history from "@/lib/icon-history.json"

export const STYLES = ["stroke", "duotone", "fill"] as const
export type Style = (typeof STYLES)[number]

/**
 * A style's markup plus the root attributes it needs.
 *
 * The root attributes are NOT the same for every icon and can't be hardcoded at
 * render time. A stroke icon puts `stroke="currentColor"` on the root and leaves
 * its paths bare, so they inherit it. A pure-fill icon has no stroke at all —
 * and applying one anyway paints a 2px outline over every path, which closes up
 * thin knockouts (the arrow inside `fill/circle-arrow-down` disappears entirely).
 */
export type StyleArt = {
  body: string
  root: Record<string, string>
}

/**
 * When a drawing arrived, when it last moved, and the version it ships in.
 *
 * Read off git at build time by `pipeline/build-history.mjs`, because git is
 * not in the deployed image. The labels are preformatted there too — a date
 * formatted on both sides of hydration is a mismatch waiting for a visitor in
 * another locale.
 */
export type GitAuthor = { name: string; email: string }

export type IconHistory = {
  added: string
  addedLabel: string
  updated: string
  updatedLabel: string
  version: string
  /**
   * Everyone whose commits touched the drawing, newest first.
   *
   * Stored in the JSON as indices into one shared list — the same author on 414
   * icons should be written down once — and resolved here, so nothing
   * downstream has to carry the list around to read a name off it.
   */
  by: GitAuthor[]
}

export type Icon = {
  /** Icon name as it appears on disk, e.g. `square-arrow-down`. */
  name: string
  /** Container prefix stripped off, e.g. `arrow-down`. Groups the three forms together. */
  base: string
  container: "regular" | "square" | "circle"
  art: Partial<Record<Style, StyleArt>>
  /** Absent only for a drawing that has never been committed. */
  history?: IconHistory
}

const ATTR = /([\w-]+)="([^"]*)"/g

/** Root attributes of a normalized icon, minus the ones the renderer supplies. */
function rootAttrs(svg: string): Record<string, string> {
  const open = svg.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  const out: Record<string, string> = {}
  for (const m of open.matchAll(ATTR)) {
    const [, k, v] = m
    if (k === "width" || k === "height" || k === "xmlns" || k === "viewBox")
      continue
    out[k] = v
  }
  return out
}

const ICONS_DIR = join(process.cwd(), "icons")

const HISTORY = history as {
  version: string
  released: boolean
  people: GitAuthor[]
  icons: Record<string, Omit<IconHistory, "by"> & { by: number[] }>
}

/** The generated entry, with its author indices swapped for the authors. */
const historyFor = (name: string): IconHistory | undefined => {
  const entry = HISTORY.icons[name]
  if (!entry) return undefined
  return {
    ...entry,
    by: entry.by.map((i) => HISTORY.people[i]).filter(Boolean),
  }
}

/** The version the set currently ships at, and whether anything is out yet. */
export const SET_VERSION = HISTORY.version
export const SET_RELEASED = HISTORY.released

/**
 * A `square-`/`circle-` prefix alone does not make a container variant. Twenty-
 * six icons wear one without being a wrapper around anything: circle-half and
 * square-dashed are shapes in their own right, and there is no `half` or
 * `dashed` for them to contain. Counting them as containers inflated the Square
 * and Circle sections and filed standalone shapes as variants of nothing, so
 * the base has to actually exist before the prefix means anything.
 */
const containerOf = (name: string, exists: (base: string) => boolean) => {
  const m = /^(square|circle)-(.+)$/.exec(name)
  return m && exists(m[2]) ? (m[1] as "square" | "circle") : "regular"
}

/**
 * Read every icon off disk and group by name.
 *
 * The wrapper is stripped here rather than at render: it is byte-identical for
 * every icon, so shipping ~200 copies of it to the client is pure waste. The
 * page re-adds it once per rendered icon.
 */
/**
 * Held for the life of the process.
 *
 * Reading the settings cookie makes the page render per request, and the icons
 * are ~840 files on disk that never change while the server is up. Without this
 * every request would walk all three style folders again.
 */
let loaded: Promise<Icon[]> | null = null

export function loadIcons(): Promise<Icon[]> {
  loaded ??= readIcons()
  return loaded
}

async function readIcons(): Promise<Icon[]> {
  const byName = new Map<string, Icon>()

  for (const style of STYLES) {
    const dir = join(ICONS_DIR, style)
    if (!existsSync(dir)) continue
    for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg"))) {
      const name = file.slice(0, -4)
      const src = await readFile(join(dir, file), "utf8")
      const body = src
        .replace(/^[\s\S]*?<svg[^>]*>/, "")
        .replace(/<\/svg>\s*$/, "")
        .trim()

      let icon = byName.get(name)
      if (!icon) {
        // container and base are settled below, once every name is known.
        icon = { name, base: name, container: "regular", art: {} }
        byName.set(name, icon)
      }
      icon.art[style] = { body, root: rootAttrs(src) }
    }
  }

  // Second pass: a prefix only counts once the whole name set is in hand.
  const names = new Set(byName.keys())
  for (const icon of byName.values()) {
    icon.history = historyFor(icon.name)
    icon.container = containerOf(icon.name, (base) => names.has(base))
    icon.base =
      icon.container === "regular"
        ? icon.name
        : icon.name.slice(icon.container.length + 1)
  }

  return [...byName.values()].sort((a, b) =>
    a.base === b.base
      ? a.container.localeCompare(b.container)
      : a.base.localeCompare(b.base)
  )
}

/** Root attributes every icon shares — kept in one place so they can't drift. */
export const SVG_ROOT_ATTRS = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** Reassemble a full standalone SVG document, for copy-to-clipboard and download. */
export function toSvgDocument(body: string, size = 24) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round">\n  ${body}\n</svg>\n`
  )
}
