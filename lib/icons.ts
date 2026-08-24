import { readdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

import history from "@/lib/icon-history.json"
import notContainers from "@/lib/icon-not-containers.json"
import badges from "@/lib/icon-badges.json"

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

export type Release = {
  version: string
  date: string
  label: string
  /** True for the oldest tag only. The one entry that gets the first-cut copy. */
  initial: boolean
  /** What the set held at that tag, not what it holds today. */
  count: number
  names: string[]
  /** Drawings that already existed and were redrawn in this release. */
  updatedNames: string[]
}

const NOT_CONTAINERS = new Set<string>(notContainers.names)

const HISTORY = history as {
  version: string
  released: boolean
  releasedVersion?: string
  releasedAt?: string
  previousReleasedVersion?: string
  previousReleasedAt?: string
  previousReleasedLabel?: string
  releases?: Release[]
  releasedLabel?: string
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
 * When the current version was tagged, and how to say it.
 *
 * The tag's own date, which is not the newest drawing's: v0.1.0 was cut on 20
 * August and drawings have landed since. Anything added after this is in the
 * tree but not in a release, which is what `isNewSince` reads and what the
 * changelog's second entry is.
 */
export const SET_RELEASED_AT = HISTORY.releasedAt ?? ""
export const SET_RELEASED_LABEL = HISTORY.releasedLabel ?? ""
/** The version that tag cut. Not `SET_VERSION` once the next one is underway. */
export const SET_RELEASED_VERSION = HISTORY.releasedVersion ?? HISTORY.version

/**
 * When the release *before* this one was cut, which is what "new" is measured
 * against. Falls back to the current release while there is only one.
 */
export const SET_PREVIOUS_RELEASED_AT =
  HISTORY.previousReleasedAt ?? SET_RELEASED_AT

/** The version that release cut. What the current entry is measured against. */
export const SET_PREVIOUS_RELEASED_VERSION =
  HISTORY.previousReleasedVersion ?? SET_RELEASED_VERSION

export const SET_PREVIOUS_RELEASED_LABEL =
  HISTORY.previousReleasedLabel ?? SET_RELEASED_LABEL

/**
 * Every release, newest first, with what each one added.
 *
 * The scalars above describe two releases, and a changelog is not two releases.
 * Built from them, the page dropped the oldest entry every time a new one was
 * cut and promoted whatever was left to "Initial release" — v0.1.2 deleted
 * v0.1.0 and announced v0.1.1 as the first cut of the set. Read this instead
 * and the page rebuilds every entry that has ever been published, which is the
 * only shape a changelog is allowed to have.
 */
export const SET_RELEASES: Release[] = HISTORY.releases ?? []

/**
 * Whether a drawing still carries its New badge.
 *
 * Derived rather than listed — a hand-kept list of what is new is a list
 * someone has to remember to empty — but derived from a floor that is *chosen*
 * rather than computed.
 *
 * It used to measure against the previous release, so cutting one cleared the
 * badges of the release before it with no one deciding that. v0.1.2 took the
 * badge off all 24 of v0.1.1's drawings the moment it was tagged. **Only Zafar
 * decides when badges drop, explicitly, every time**, so the floor lives in
 * `lib/icon-badges.json` and no build step writes it. Badges accumulate until
 * they are deliberately cleared, which fails in the direction someone will
 * notice.
 */
const BADGES_CLEARED_THROUGH = badges.clearedThrough
const BADGES_CLEARED_AT =
  SET_RELEASES.find((r) => r.version === BADGES_CLEARED_THROUGH)?.date ?? ""

export const isNewSince = (icon: Icon) =>
  Boolean(
    BADGES_CLEARED_AT &&
      icon.history &&
      icon.history.added > BADGES_CLEARED_AT
  )

/**
 * A `square-`/`circle-` prefix alone does not make a container variant. Twenty-
 * six icons wear one without being a wrapper around anything: circle-half and
 * square-dashed are shapes in their own right, and there is no `half` or
 * `dashed` for them to contain. Counting them as containers inflated the Square
 * and Circle sections and filed standalone shapes as variants of nothing, so
 * the base has to actually exist before the prefix means anything.
 *
 * And existing is still not sufficient. `square-pen` is a pen drawn over a
 * square — the conventional edit mark — not the `pen` glyph inside a square
 * container, and `pen` does exist, so the rule above folded both it and
 * `circle-pen` into a family they are not part of. The Figma file always had
 * these as three separate component sets, which is why it counted 440 icons
 * where this counted 438, and why one surface's catalogue had two more rows
 * than the other's.
 *
 * The exceptions live in `lib/icon-not-containers.json` because five other
 * places resolve a base name the same way — build-paper, build-data,
 * build-keywords, check-search — and a rule that only half of them know is how
 * the counts drifted apart in the first place.
 */
const containerOf = (name: string, exists: (base: string) => boolean) => {
  if (NOT_CONTAINERS.has(name)) return "regular"
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
