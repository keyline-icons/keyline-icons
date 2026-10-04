import { readdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"

import history from "@/lib/icon-history.json"
import notContainers from "@/lib/icon-not-containers.json"
import badges from "@/lib/icon-badges.json"

export const STYLES = ["stroke", "two-tone", "duotone", "fill"] as const
export type Style = (typeof STYLES)[number]

/* Imported and re-exported rather than passed straight through, because
   `Redraw` below names the type: a bare `export … from` binds nothing here. */
import { CORNERS, type Corners } from "@/components/glyph"
export { CORNERS, type Corners }

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
  /** The release it shipped in, or null while no tag covers it yet. */
  version: string | null
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
  /**
   * The same styles again, drawn with squared corners.
   *
   * `icons/sharp/<style>/<name>.svg` on disk. A second field rather than a
   * second dimension on `art`, because every existing reader of `art[style]`
   * means the rounded drawing and should go on meaning it; `artOf` in
   * `components/glyph.tsx` is what anything treatment-aware asks instead.
   */
  sharp?: Partial<Record<Style, StyleArt>>
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

/**
 * A whole SVG document split the way `Glyph` wants it.
 *
 * The same two lines `readIcons` runs over a file on disk, lifted out so that a
 * drawing recovered from git — a changelog's "before" — is taken apart by the
 * same code as the drawing beside it. Two parsers is how one tile ends up
 * rendering with a stroke the other does not have.
 */
export const toStyleArt = (svg: string): StyleArt => ({
  body: svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim(),
  root: rootAttrs(svg),
})

/**
 * A drawing that was redrawn, carrying both versions of itself.
 *
 * Baked by `pipeline/build-history.mjs` out of the two refs that bound the
 * release window, so a published entry keeps showing the pair it was published
 * with even after the same icon is redrawn again. Whole SVG documents, exactly
 * as those refs carried them, because every surface that prints them parses an
 * icon file already and none of them should learn a second shape.
 *
 * `style` is the style the change is visible in, and it is null — with both
 * documents null — where a commit touched the drawing without moving it. The
 * surfaces then name the icon rather than printing two identical tiles.
 *
 * `corners` is the treatment those two documents came out of, and every
 * surface that prints a pair prints it. A change can be confined to the sharp
 * half — the diagonal end cut moved 315 drawings and not one rounded one — and
 * a sharp pair shown unlabelled reads as a correction to the rounded drawing
 * the reader already knows, which is the opposite of what happened. Rounded is
 * still what a pair is by default: `redrawn` looks there first.
 */
export type Redraw = {
  name: string
  style: Style | null
  corners: Corners | null
  before: string | null
  after: string | null
}

/**
 * One sentence of a release and the drawings it is about.
 *
 * From `lib/icon-release-topics.json`, so an entry reads topic, its tiles, the
 * next topic, its tiles, rather than every sentence first and every tile after.
 * `text` is null only on the last group, which holds whatever no topic claimed.
 */
export type ReleaseTopic = {
  /** The shelf, titled as the category rail titles it. Null on the last group. */
  title: string | null
  /** A drawing from the set, by name, for the chip. Chips only. */
  icon: string | null
  /** A platform's own mark in place of the drawing, by key: `react`. Chips only. */
  logo?: string
  /** The link fragment, `v1.0.0-people` or `v1.0.0-redrawn-files`. Null untitled. */
  anchor: string | null
  text: string | null
  names: string[]
  updatedNames: string[]
  /** Drawings the release took out of the set. Absent before 1.6.0. */
  removedNames?: string[]
  /** Sections inside this one: the `Redrawn` section's shelves. */
  sections: ReleaseTopic[]
}

/**
 * A drawing a release took out of the set, as the release before it had it.
 *
 * Carried whole because nothing else can supply it: the name no longer has a
 * file in `icons/`, so a surface that only had the name could print it and
 * nothing more.
 */
export type Removal = {
  name: string
  /** The stroke drawing at the previous tag. */
  before: string | null
}

export type Release = {
  version: string
  date: string
  label: string
  /**
   * A hand-written sentence about the release, from `lib/icon-release-notes.json`.
   *
   * Null for most of them, which is the resting state: a release that added
   * drawings describes itself out of the lists below. This is for the ones that
   * did something a count cannot say, like adding a corner treatment across the
   * whole set without adding a name to it.
   */
  note: string | null
  /** True for the oldest tag only. The one entry that gets the first-cut copy. */
  initial: boolean
  /** What the set held at that tag, not what it holds today. */
  count: number
  /**
   * Drawings at that tag and at the one before it, across all of `icons/`.
   *
   * `count` is names, and the two moved together until the corners axis: v0.3.0
   * added 1,497 drawings and no name at all, so a surface holding only `count`
   * could not tell it from a release that added nothing, and announced the
   * largest release the set has had as "No new drawings".
   */
  files: number
  previousFiles: number
  names: string[]
  /** The release's headline, from `lib/icon-release-topics.json`. */
  title?: string | null
  /** The entry read topic by topic, or null where it has no topics. */
  topics?: ReleaseTopic[] | null
  /**
   * Drawings that already existed and were redrawn in this release, in either
   * corner treatment. A name appears once however many of its six files moved;
   * `updated` carries the one pair that is being shown for it.
   */
  updatedNames: string[]
  /** The same drawings, before and after. Never narrower than `updatedNames`. */
  updated: Redraw[]
  /** What the release took out of the set. Absent where it took nothing. */
  removed?: Removal[]
}

/**
 * Drawings that have landed since the newest tag and are in no release yet.
 *
 * Not a `Release`, and deliberately shaped differently: it has no version and
 * no date, because it is not a thing that happened. Giving it a version was the
 * old bug — the newest release window was left open at the top, so a drawing
 * made after the tag was announced as part of a release that shipped without
 * it.
 */
export type Unreleased = {
  /**
   * A hand-written sentence about the release, from `lib/icon-release-notes.json`.
   *
   * Null for most of them, which is the resting state: a release that added
   * drawings describes itself out of the lists below. This is for the ones that
   * did something a count cannot say, like adding a corner treatment across the
   * whole set without adding a name to it.
   */
  note: string | null
  /** The tag this is measured from. */
  since: string | null
  sinceDate: string | null
  sinceLabel: string | null
  /** What the set holds now, which is what a reader of this is asking. */
  count: number
  names: string[]
  /** The release's headline, from `lib/icon-release-topics.json`. */
  title?: string | null
  /** The entry read topic by topic, or null where it has no topics. */
  topics?: ReleaseTopic[] | null
  updatedNames: string[]
  updated: Redraw[]
  removed?: Removal[]
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
  unreleased?: Unreleased | null
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
 * What has been drawn since the newest tag, or null when the tag is current.
 *
 * Null is the resting state and the surfaces print nothing for it. A section
 * that says "nothing yet" on a freshly cut release is a section that has to be
 * read to learn there is nothing to read.
 */
export const SET_UNRELEASED: Unreleased | null = HISTORY.unreleased ?? null

/**
 * Whether a drawing still carries its New badge.
 *
 * **The badge measures age, not releases.** A drawing is new for
 * `newForDays` days after it was drawn, and cutting a release does not touch
 * it either way.
 *
 * It was tied to a version twice and was wrong in both directions. Measured
 * against the previous release it cleared the badges of the drawings the
 * release was announcing: v0.1.2 took the badge off all 24 of v0.1.1's the
 * moment it was tagged. Moved to a hand-set floor it stopped doing that, but
 * the floor was still a version, so the answer to "how long does a badge last"
 * was "until someone remembers" — and on a set that shipped four versions in
 * three days, any release-shaped rule gives a drawing roughly a day in the
 * light. Neither is what the badge is for. It is there to tell a returning
 * reader what has appeared since they last looked, and that is a question about
 * time.
 *
 * `clearedBefore` stays as the manual override, so "drop them all now" is one
 * timestamp. No build step writes either value.
 */
/** Exported so the copy that explains the badge cannot drift from the rule. */
export const NEW_FOR_DAYS: number = badges.newForDays ?? 14
const BADGES_CLEARED_BEFORE: string = badges.clearedBefore ?? ""
/** Drawings the floor skips; the window still applies. See the file's comment. */
const BADGES_CLEARED_EXCEPT = new Set<string>(badges.clearedExcept ?? [])

/**
 * Compared as instants, never as strings.
 *
 * Git writes `2026-08-25T17:11:41+05:00` and a window computed from the clock
 * comes out as `...Z`, so the two sort against each other by the shape of their
 * offset rather than by when they happened. The old floor was a git date
 * compared with a git date, which is why string comparison held there and does
 * not here.
 */
const at = (iso: string) => (iso ? Date.parse(iso) : 0)
const CLEARED_AT = at(BADGES_CLEARED_BEFORE)

export const isNewSince = (icon: Icon) =>
  Boolean(
    icon.history &&
      at(icon.history.added) >
        Math.max(
          BADGES_CLEARED_EXCEPT.has(icon.name) ? 0 : CLEARED_AT,
          Date.now() - NEW_FOR_DAYS * 86_400_000
        )
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
 * Reading the settings cookie makes the icon routes render per request, and
 * the drawings are 9,736 files in eight folders that never change while the
 * server is up. Without this every request would read all of them again.
 */
let loaded: Promise<Icon[]> | null = null

export function loadIcons(): Promise<Icon[]> {
  loaded ??= readIcons()
  return loaded
}

/**
 * How many drawings are read at once.
 *
 * One at a time was 1.6 s of every cold start on the routes that render per
 * request, measured on 28 Sep 2026; 64 at a time is 180 ms. Not all of them at
 * once: that holds 9,736 file descriptors open together, which is how a
 * serverless function runs out of them, and it measured slower than 64 anyway.
 */
const READ_CONCURRENCY = 64

/** `fn` over `items` with at most `limit` in flight, results in input order. */
async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const out = new Array<R>(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      out[i] = await fn(items[i])
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  )
  return out
}

/**
 * Every drawing in one treatment, one folder per style, as
 * `{ style, name, src }`.
 *
 * In `STYLES` order and then directory order, which is the order the
 * one-at-a-time loop read them in, so the map below fills the same way it did.
 * `keep` filters by name before anything is read.
 *
 * Every path is spelled out from `ICONS_DIR` at the call it is used in, and
 * that is load-bearing. The bundler traces which files a server function
 * reads from these expressions; handed a folder through a parameter, it
 * cannot tell, and ships the whole repository, `raw/` and `previews/`
 * included, with every route. That happened on the first draft of this.
 */
async function readTreatment(
  sharp: boolean,
  keep: (name: string) => boolean = () => true
) {
  const jobs = (
    await Promise.all(
      STYLES.map(async (style) => {
        const dir = sharp
          ? join(ICONS_DIR, "sharp", style)
          : join(ICONS_DIR, style)
        if (!existsSync(dir)) return []
        return (await readdir(dir))
          .filter((file) => file.endsWith(".svg"))
          .map((file) => ({ style, name: file.slice(0, -4) }))
          .filter(({ name }) => keep(name))
      })
    )
  ).flat()

  return mapLimit(jobs, READ_CONCURRENCY, async ({ style, name }) => ({
    style,
    name,
    src: await readFile(
      sharp
        ? join(ICONS_DIR, "sharp", style, `${name}.svg`)
        : join(ICONS_DIR, style, `${name}.svg`),
      "utf8"
    ),
  }))
}

async function readIcons(): Promise<Icon[]> {
  const byName = new Map<string, Icon>()

  for (const { style, name, src } of await readTreatment(false)) {
    let icon = byName.get(name)
    if (!icon) {
      // container and base are settled below, once every name is known.
      icon = { name, base: name, container: "regular", art: {}, sharp: {} }
      byName.set(name, icon)
    }
    icon.art[style] = toStyleArt(src)
  }

  /*
   * The sharp half, read second so a treatment can never invent a name.
   *
   * An icon exists because it has a rounded drawing; a sharp file with no
   * rounded sibling is drift rather than a new icon, and it is dropped here
   * with the coverage check in `pipeline/lint.mjs` left to report it. Reading
   * both passes into the same map would let one silently create the other.
   */
  const sharp = await readTreatment(true, (name) => byName.has(name))
  for (const { style, name, src } of sharp) {
    const icon = byName.get(name)
    if (icon) (icon.sharp ??= {})[style] = toStyleArt(src)
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

/**
 * Reassemble a full standalone SVG document, for copy-to-clipboard and download.
 *
 * The cap is a parameter because it is the sharp treatment: squared caps are
 * half of what makes a sharp drawing sharp, and the geometry carries only the
 * other half. Hardcoded round, a copied sharp icon pastes as something between
 * the two, with nothing in the markup to say which.
 */
export function toSvgDocument(body: string, size = 24, linecap = "round") {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="${linecap}" stroke-linejoin="round">\n  ${body}\n</svg>\n`
  )
}
