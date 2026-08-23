// Compose the set as HTML sheets, ready to write into a paper.design file.
//
//   node pipeline/build-paper.mjs [--check]
//
// Writes previews/paper/*.html plus a manifest, one sheet per catalogue
// section, and each sheet is one artboard's worth of markup.
//
// **Why HTML and not SVG.** Paper's canvas is HTML and CSS rather than a scene
// graph, and the only write its MCP server exposes is `write_html`. So the unit
// a Paper file imports is a document, not a folder of assets: there is no
// "import 1,231 SVGs" call to aim at, and a sheet of inline drawings is what
// the tool actually accepts. That is also why this generator exists at all
// rather than pointing the migration at `icons/`.
//
// **These are fragments, not documents, and every rule is inline.** No doctype,
// no `<html>`, and no `<style>` block: what `write_html` wants is markup to
// place inside a node, and it parses inline styles only. The first import that
// carried a stylesheet arrived as one unstyled column of drawings, which is the
// note under SHEET below. A browser wraps a fragment on its own, so these still
// open locally for review.
//
// **Sheets are chunked by bytes, not by category.** Arrows alone is 220
// drawings and over 100KB of path data, which is more than one MCP call should
// carry. Pages break on a block boundary and never inside one, so an icon's
// variants always land on the same artboard as each other.
//
// **The manifest is the import script's input.** Driving the migration means a
// `create_artboard` and a `write_html` per sheet, in order, with a name for
// each; that list is exactly `manifest.json`, so the loop reads it rather than
// re-deriving the grouping from filenames.
//
// --check re-composes everything and compares, the same contract as
// build-cover.mjs and build-data.mjs: a redrawn icon or a renamed category
// fails here rather than being noticed as a Paper file that no longer matches
// the set.

import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const ICONS = join(ROOT, "icons")
const OUT = join(ROOT, "previews", "paper")
const STYLES = ["stroke", "duotone", "fill"]
const CONTAINERS = ["regular", "square", "circle"]
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/**
 * How much drawing one sheet may carry, measured on the tiles rather than the
 * whole file so the section wrapper and its heading are not part of the budget.
 *
 * 40KB is a judgement call about what a single MCP write should move, not a
 * limit anything enforces. Raising it makes fewer, heavier artboards; the
 * failure it guards against is a call that times out halfway through a
 * category, which leaves a Paper file nobody can tell is incomplete.
 */
const BUDGET = 40 * 1024

/**
 * Measured off the Figma catalogue's own cards, not resolved from the site's
 * tokens, because the two surfaces are meant to be the same drawing and Figma
 * is the one that decides. That is why the ink is `#111111` rather than the
 * site's `#0a0a0a`: a hair lighter, and the difference is visible when the two
 * are put side by side, which is exactly what this file is for.
 */
const BG = "#ffffff"
const INK = "#111111"
const MUTED = "#737373"
const HAIRLINE = "#e5e5e5"
const STRIPE = "#f5f5f5"

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

/**
 * Read the site's own category table out of lib/icon-taxonomy.ts.
 *
 * Parsed rather than duplicated, because a second copy of eighteen regexes is a
 * second thing to keep in step, and the one that drifts is always the copy
 * nobody renders. check-demos.mjs reads lib/*.ts the same way and for the same
 * reason.
 *
 * The guard is the label count: every entry declares a `label`, so a `match`
 * this parse fails to pick up shows as a pair count short of the labels, and
 * the script stops. Without it a regex written across two lines would silently
 * hand its whole category to Other, which looks like a grouping decision rather
 * than a broken read.
 */
async function categories() {
  const src = await readFile(join(ROOT, "lib", "icon-taxonomy.ts"), "utf8")
  const start = src.indexOf("export const CATEGORIES")
  if (start < 0) throw new Error("lib/icon-taxonomy.ts: no CATEGORIES export")
  const block = src
    .slice(start, src.indexOf("\n]", start))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "")

  const labels = [...block.matchAll(/label:\s*"([^"]+)"/g)].length
  const pairs = [
    ...block.matchAll(
      /label:\s*"([^"]+)",\s*match:\s*(\/(?:[^/\\\n]|\\.)+\/),\s*blurb:\s*"([^"]+)"/g
    ),
  ].map(([, label, re, blurb]) => ({ label, match: new RegExp(re.slice(1, -1)), blurb }))

  if (pairs.length !== labels) {
    throw new Error(
      `lib/icon-taxonomy.ts: read ${pairs.length} of ${labels} categories. ` +
        `A match pattern has moved off its label's line; fix this parse rather ` +
        `than letting the difference fall into Other.`
    )
  }
  return pairs
}

const ATTR = /([\w-]+)="([^"]*)"/g
/** Re-declared on the tile, so the file's own copies are 1,231 times redundant. */
const DROP = new Set(["width", "height", "xmlns"])

/** One drawing, split into the attributes it needs and the paths it draws. */
function parse(svg) {
  const open = svg.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  const attrs = [...open.matchAll(ATTR)]
    .filter(([, k]) => !DROP.has(k))
    .map(([, k, v]) => `${k}="${v}"`)
    .join(" ")
  const body = svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "")
    .replace(/\s+/g, " ")
    .trim()
  return { attrs, body }
}

const byName = new Map()
for (const style of STYLES) {
  const dir = join(ICONS, style)
  if (!existsSync(dir)) continue
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg"))) {
    const name = file.slice(0, -4)
    if (!byName.has(name)) byName.set(name, { name, art: {} })
    byName.get(name).art[style] = parse(await readFile(join(dir, file), "utf8"))
  }
}

/**
 * A `square-`/`circle-` prefix only means a container once the base it claims to
 * wrap exists. This is `containerOf` in lib/icons.ts, and the reasoning there is
 * the one to read: twenty-six names wear a prefix without wrapping anything,
 * and counting `circle-half` as a variant of a `half` that was never drawn
 * files a standalone shape as a variant of nothing.
 */
const names = new Set(byName.keys())
const containerOf = (name) => {
  const m = /^(square|circle)-(.+)$/.exec(name)
  return m && names.has(m[2]) ? m[1] : "regular"
}

const CATEGORIES = await categories()
const OTHER = "Other"

/**
 * The release, read from the same file the site's changelog page reads.
 *
 * `lib/icon-history.json` is built from `git log` by `build-history.mjs`, so the
 * version, the date and the counts here are the ones `/changelog` prints. That
 * is the whole reason the changelog surface is generated rather than typed: the
 * Figma file carries this page written by hand, and the note on
 * `app/changelog/page.tsx` says an edit to one is an edit to the other. A third
 * hand-written copy is a third thing to forget.
 */
const HISTORY = JSON.parse(
  await readFile(join(ROOT, "lib", "icon-history.json"), "utf8")
)

/*
 * Drawn after the tag, so in the tree but not in a release.
 *
 * Derived from the dates rather than listed, the same way `lib/icons.ts`
 * derives it: a hand-kept list of what is new is one someone has to remember to
 * empty. Declared up here because `row` reads it and the rows are composed a
 * long way above where the release object is assembled.
 */
const since = Object.entries(HISTORY.icons ?? {})
  .filter(([, h]) => HISTORY.releasedAt && h.added > HISTORY.releasedAt)
  .sort(([a], [b]) => a.localeCompare(b))
const NEW_NAMES = new Set(since.map(([name]) => name))

/**
 * One block per base icon, which is one component set in Figma and one row in
 * its catalogue. Grouping by name rather than by style is what makes the sheet
 * legible as the set: a designer comparing `check`, `square-check` and
 * `circle-check` has them side by side, and the three style folders on disk are
 * an export detail rather than how anyone reads the library.
 */
const blocks = new Map()
for (const icon of byName.values()) {
  const container = containerOf(icon.name)
  const base =
    container === "regular" ? icon.name : icon.name.slice(container.length + 1)
  if (!blocks.has(base)) {
    blocks.set(base, {
      base,
      category: CATEGORIES.find((x) => x.match.test(base))?.label ?? OTHER,
      variants: [],
    })
  }
  for (const style of STYLES) {
    if (icon.art[style]) {
      blocks.get(base).variants.push({ name: icon.name, container, style, art: icon.art[style] })
    }
  }
}

for (const block of blocks.values()) {
  block.variants.sort(
    (a, b) =>
      CONTAINERS.indexOf(a.container) - CONTAINERS.indexOf(b.container) ||
      STYLES.indexOf(a.style) - STYLES.indexOf(b.style)
  )
}

/** Sections in the site's own order, with the leftovers last. */
/**
 * The shelves, alphabetically. There is no leftovers shelf.
 *
 * **Sorted here and never in `lib/icon-taxonomy.ts`.** That array's order is not
 * a presentation choice, it is the resolution order: the first pattern to match
 * wins, so Files has to be asked before Shapes or `circle-pen` files itself as a
 * circle, and Media before Layout or `list-music` files itself as a list. Sorting
 * that array alphabetically would silently refile icons. Sorting a copy of it for
 * display cannot.
 *
 * **Other is not published.** It used to sit last and render whenever something
 * matched no pattern, which made an unfiled drawing look like a filing decision.
 * It is out of the release along with Figma's New band, and what replaces it is
 * the assertion below: an icon with no shelf fails the build by name. That is the
 * behaviour worth keeping, because the failure mode it prevents is silent, a
 * drawing that ships everywhere except the surfaces that list it.
 */
const SECTIONS = [...CATEGORIES]
  .sort((a, b) => a.label.localeCompare(b.label))
  .map(({ label, blurb }) => ({
    label,
    blurb,
    blocks: [...blocks.values()]
      .filter((b) => b.category === label)
      .sort((a, b) => a.base.localeCompare(b.base)),
  }))
  .filter((s) => s.blocks.length)

const unfiled = [...blocks.values()].filter((b) => b.category === OTHER)
if (unfiled.length) {
  throw new Error(
    `${unfiled.length} icons match no category: ${unfiled.map((b) => b.base).join(", ")}\n` +
      `Add a pattern in lib/icon-taxonomy.ts. There is no Other shelf to fall into.`
  )
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-")

/**
 * Drawn at 24, which is the size the icons are drawn at.
 *
 * Enlarging them here would make a prettier sheet and a wrong file: what lands
 * in Paper is the geometry at native size, so a stroke is 2 units of a 24 grid
 * exactly as it is everywhere else in this repo, and whoever scales an instance
 * scales it from the size the set is specified at.
 */
const SIZE = 24

/**
 * Every rule written on the element it applies to, because a `<style>` block
 * does not survive the import.
 *
 * This was a stylesheet with eight `kl-` classes first, on the reasoning that
 * Paper is an HTML and CSS canvas so a style block is what it is built to read.
 * The first sheet written into a real file came back as a single column of
 * unstyled drawings: `write_html` parses inline styles and drops the block, so
 * every class matched nothing. The drawings themselves arrived perfectly, which
 * is what makes it worth writing down, since nothing about the result says the
 * cause was the CSS rather than the SVG.
 *
 * **The numbers are Figma's, measured off `Category / Core Interface`.** A card
 * is 742 wide with 28 of padding and a 14 corner; its rows are 38 tall on a 10
 * corner, padded 7 and 10, with the base drawing, then the name, then the rest
 * of the variants pushed right. Every one of those was read out of the file
 * rather than chosen here, because the two surfaces are supposed to be
 * indistinguishable and only one of them gets to decide.
 */
const CARD =
  `box-sizing:border-box;width:742px;padding:28px;background:${BG};color:${INK};` +
  `font-family:${FONT};border-radius:14px;display:flex;flex-direction:column;gap:12px`
const HEADER = "display:flex;align-items:baseline;justify-content:space-between;gap:16px"
const TITLE = "margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px"
const COUNT = `font-size:15px;font-weight:500;color:${MUTED};white-space:nowrap`
const BLURB = `margin:0;font-size:16px;color:${MUTED}`
const DIVIDER = `height:1px;background:${HAIRLINE}`
const ROWS = "display:flex;flex-direction:column"
const LABEL = `font-size:14px;font-weight:500;color:${INK};white-space:nowrap`
/* Sized off the row's 38px rather than the label's line, so a badged row is the
   same height as an unbadged one and the stripe stays a straight edge. */
const BADGE =
  `flex-shrink:0;padding:2px 7px;border-radius:999px;background:${INK};color:#ffffff;` +
  `font-size:10px;font-weight:600;letter-spacing:0.3px;line-height:16px;white-space:nowrap`
const GROUP = "display:flex;align-items:center;gap:6px"

/** A row's own line, striped on the even ones exactly as the Figma card is. */
const rowStyle = (index) =>
  `display:flex;align-items:center;gap:10px;height:38px;padding:7px 10px;` +
  `box-sizing:border-box;border-radius:10px` +
  (index % 2 === 0 ? `;background:${STRIPE}` : "")

/** One drawing, named twice: once for the layer tree, once for a reader. */
const tile = (v) =>
  `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg" ` +
  `role="img" aria-label="${v.name} ${v.style}" data-icon="${v.name}" ` +
  `data-style="${v.style}" ${v.art.attrs}>${v.art.body}</svg>`

/**
 * One icon, as Figma draws it: the bare drawing, its name, then every other
 * variant of it pushed to the right edge.
 *
 * The first tile is the regular stroke where there is one, which is the drawing
 * the name refers to. Everything else is the variant group, in container then
 * style order, so a row reads left to right as "this icon, and these are the
 * forms it takes".
 */
function row(block, index) {
  const [lead, ...rest] = block.variants
  const isNew = NEW_NAMES.has(block.base)
  return (
    `<div style="${rowStyle(index)}" data-icon-set="${block.base}"` +
      (isNew ? ` data-new="true"` : "") + `>` +
      tile(lead) +
      `<div style="${LABEL}">${block.base}</div>` +
      (isNew ? `<span style="${BADGE}">New</span>` : "") +
      /* The spacer, not the label, is what pushes the variants right. The label
         used to carry `flex:1` and a badge next to it then sat against the far
         edge instead of against the name it badges. */
      `<div style="flex:1"></div>` +
      `<div style="${GROUP}">${rest.map(tile).join("")}</div>` +
    `</div>`
  )
}

/**
 * A category card: header, blurb, rule, rows.
 *
 * One card per category rather than the several boards this used to cut each
 * one into. Figma has one card per shelf and the two are meant to match, so the
 * split now happens on the wire only: the first part carries the card and its
 * empty rows container, and every part after it appends rows into that
 * container. Nothing about the result says it arrived in pieces.
 */
/**
 * The header states two numbers because the surfaces were counting two things
 * and calling both "icons".
 *
 * A card lists one row per *set*, the drawing family, so Arrows is 60 rows. The
 * site's rail lists one tile per *name*, and `circle-arrow-down` is its own
 * name, so the same shelf is 104 there. Neither is wrong and neither can be
 * dropped: a board labelled 104 visibly holds 60 rows, and a rail labelled 60
 * visibly holds 104 tiles. So each surface counts what it displays and says
 * which it counted.
 */
function card({ label, blurb, icons, names, rows }) {
  return (
    `<div style="${CARD}" data-category="${label}">` +
      `<div style="${HEADER}">` +
        `<h2 style="${TITLE}">${label}</h2>` +
        `<span style="${COUNT}">${icons} ${icons === 1 ? "icon" : "icons"} · ${names} names</span>` +
      `</div>` +
      `<p style="${BLURB}">${blurb}</p>` +
      `<div style="${DIVIDER}"></div>` +
      `<div style="${ROWS}" data-rows="${label}">${rows}</div>` +
    `</div>\n`
  )
}

/**
 * The catalogue surface: what the set *is*, rather than everything in it.
 *
 * Head and variant specimen, and nothing else. It carried an index of the 18
 * categories under those, with each shelf's weight and eight of its drawings,
 * until the boards beside it made the point better: they are the categories,
 * laid out ten to a row on the same canvas, each with its own count on it. An
 * index of things the reader can already see is a second answer to a question
 * that was not asked twice.
 *
 * This replaces a catalogue that listed all 397 icons with all their variants,
 * one row each, the way the Figma file's Catalog page does. That was deleted on
 * sight and the reason is worth keeping: Figma's catalogue is a page of
 * *instances*, so it stays true on its own and is worth its length. Paper has no
 * components and no instances, so the same page would be 1,289 copies that go
 * stale the moment a drawing changes, sitting beside 33 boards that already show
 * every one of them. An inventory nothing can keep honest is worse than no
 * inventory.
 *
 * What survives is the part the boards cannot say: the variant system itself,
 * one specimen showing every treatment of one drawing, and an index of the
 * categories with their weights. One card, and it fits on a screen.
 *
 * The dark head is the Figma catalogue's, at the user's request, and it is the
 * only surface here that inverts. That is the point of it: a cover is a
 * different kind of object from the sheets it covers, and on a canvas of 33
 * white boards the one that states the totals should not be a 34th white board.
 */
/**
 * Where the set lives, read from `lib/seo.ts` rather than typed here.
 *
 * A Community or Paper file travels: someone duplicates it and it is theirs,
 * detached from the listing that described it and from whatever links sat
 * beside the listing. A file that does not say where it came from is an orphan
 * the moment it is copied, which is what both covers were until now.
 *
 * Parsed out of the same constant the canonical URLs are built from, so it
 * cannot name a different origin than the site does. The protocol is dropped
 * for display only: a cover states an address, it does not link to one.
 */
const SITE = (await readFile(join(ROOT, "lib", "seo.ts"), "utf8")).match(
  /SITE_URL\s*=\s*"([^"]+)"/
)?.[1]
if (!SITE) throw new Error("SITE_URL not found in lib/seo.ts")
const SITE_LABEL = SITE.replace(/^https?:\/\//, "")

const HEAD_BG = "#0a0a0a"
const HEAD_INK = "#ffffff"
const HEAD_MUTED = "#a3a3a3"

/**
 * A label and its value, right-aligned in the dark head.
 *
 * `white-space:nowrap` on both halves and `flex-shrink:0` on the column, all
 * three load-bearing. A browser gave this row its natural width and the head
 * looked right locally; Paper laid the same markup out against the space left
 * over by the title and wrapped every value, so a version read "0.1." over "0"
 * and the date sat on top of its own label. Nothing about the local render
 * predicted it, which is the argument for screenshotting the imported artboard
 * rather than the file it came from.
 */
const meta = (label, value) =>
  `<div style="display:flex;gap:10px;align-items:baseline;justify-content:flex-end;white-space:nowrap">` +
    `<span style="font-size:14px;color:${HEAD_MUTED};white-space:nowrap">${label}</span>` +
    `<span style="font-size:14px;font-weight:600;color:${HEAD_INK};white-space:nowrap">${value}</span>` +
  `</div>`

/**
 * One treatment of the specimen drawing, as a chip.
 *
 * Container then style, and within a container fill, duotone, stroke, which is
 * the order the requested design puts them in rather than the repo's own
 * stroke-first order. It is a specimen of the axis, so it follows the drawing
 * that specified it.
 */
function chip(icons, name, style, label) {
  const art = icons.get(name)?.art[style]
  if (!art) return ""
  return (
    `<div style="display:flex;align-items:center;gap:10px;padding:8px 14px 8px 10px;` +
      `border-radius:10px;background:#f5f5f5">` +
      `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg" role="img" ` +
      `aria-label="${name} ${style}" data-icon="${name}" data-style="${style}" ${art.attrs}>${art.body}</svg>` +
      `<span style="font-size:12px;color:${MUTED};white-space:nowrap">${label}</span>` +
    `</div>`
  )
}

function catalogSheet(icons, totals, release) {
  const specimen = [
    ["arrow-down", "stroke", "regular"],
    ["square-arrow-down", "fill", "square-fill"],
    ["square-arrow-down", "duotone", "square-duotone"],
    ["square-arrow-down", "stroke", "square-stroke"],
    ["circle-arrow-down", "fill", "circle-fill"],
    ["circle-arrow-down", "duotone", "circle-duotone"],
    ["circle-arrow-down", "stroke", "circle-stroke"],
  ].map(([name, style, label]) => chip(icons, name, style, label))

  return (
    `<section style="box-sizing:border-box;width:1224px;background:${BG};color:${INK};` +
      `font-family:${FONT};border-radius:24px;overflow:hidden" data-surface="catalog">` +

      `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;` +
        `padding:48px;background:${HEAD_BG}">` +
        `<div>` +
          `<h1 style="margin:0;font-size:48px;font-weight:600;letter-spacing:-1.5px;color:${HEAD_INK}">Keyline Icons</h1>` +
          `<p style="margin:10px 0 0;font-size:16px;color:${HEAD_MUTED}">Organized category catalog / 24px icon system</p>` +
        `</div>` +
        `<div style="display:flex;flex-direction:column;gap:8px">` +
          /* All three quantities, because "icons" alone meant a different
             number on every surface: 396 sets, 503 importable names and 1,286
             files. The boards below count sets and say so; this counts the lot
             and says so. The site's headline of 503 is the middle one, which is
             what a reader downloads.

             This line has been wrong twice, in both directions, which is the
             argument for spelling it out rather than picking one word. */
          meta(
            "Icons:",
            `${blocks.size} icons · ${icons.size} names · ` +
              `${[...blocks.values()].reduce((n, b) => n + b.variants.length, 0)} variants`
          ) +
          meta("Last updated:", release.updatedLabel) +
          meta("Version:", release.version) +
          meta("Site:", SITE_LABEL) +
        `</div>` +
      `</div>` +

      `<div style="padding:48px">` +
        `<h2 style="margin:0;font-size:24px;font-weight:600;letter-spacing:-0.4px">Variant specimen</h2>` +
        `<p style="margin:8px 0 20px;font-size:14px;color:${MUTED}">` +
          `One drawing in every treatment the set offers: two container shapes ` +
          `against three styles, plus the bare glyph.` +
        `</p>` +
        `<div style="display:flex;flex-wrap:wrap;gap:12px">${specimen.join("")}</div>` +

      `</div>` +
    `</section>\n`
  )
}

/**
 * The changelog, word for word from the page that owns the words.
 *
 * `app/changelog/page.tsx` is one heading and three sentences with every
 * countable thing counted, and this is the same sentences off the same data. It
 * is short enough for one write, so it is one file and one artboard.
 */
function changelogSheet(icons, release) {
  const styles = STYLES.map((style) => `${style} (${release.styles[style]})`)
  const list =
    styles.slice(0, -1).join(", ") + " and " + styles[styles.length - 1]

  return (
    `<section style="box-sizing:border-box;width:768px;background:${BG};color:${INK};` +
      `font-family:${FONT};border-radius:24px;overflow:hidden" data-surface="changelog">` +

      /* The catalogue surface's head at this surface's width, so the two covers
         in the file are one device rather than two. */
      `<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;` +
        `padding:40px;background:${HEAD_BG}">` +
        `<div>` +
          `<h1 style="margin:0;font-size:36px;font-weight:600;letter-spacing:-0.8px;color:${HEAD_INK}">Changelog</h1>` +
          `<p style="margin:10px 0 0;font-size:15px;color:${HEAD_MUTED}">` +
            `Releases, new drawings and announcements, newest first.` +
          `</p>` +
        `</div>` +
        `<div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">` +
          meta("Version:", release.version) +
          meta("Site:", SITE_LABEL) +
        `</div>` +
      `</div>` +

      `<div style="padding:40px">` +
        /* Newest first, so anything unreleased sits above the release it is not
           in yet. The site's page is the same two entries in the same order. */
        (release.since.names.length
          ? `<h2 style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.3px">${release.version}</h2>` +
            `<p style="margin:8px 0 0;font-size:13px;color:${MUTED}">` +
              `Unreleased &middot; ${release.since.label}` +
            `</p>` +
            `<p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:${MUTED}">` +
              `${release.since.names.length} drawings added since ${release.releasedVersion}, ` +
              `and badged New in the catalogue until the next release:` +
            `</p>` +
            /* The drawings, not their names. Named only, a reader has to go
               and look them up, which is the one thing this surface is here to
               save them. Drawn at grid size: they are being identified rather
               than admired, and 24 is the size the set is built at. */
            `<div style="display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 0">` +
              release.since.names.map((name) => {
                const art = icons.get(name)?.art?.stroke
                if (!art) return ""
                return (
                  `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;` +
                    `width:104px;padding:12px 4px;box-sizing:border-box;border-radius:10px;` +
                    `background:${STRIPE}">` +
                    `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg" ` +
                    `role="img" aria-label="${name} stroke" data-icon="${name}" ` +
                    `data-style="stroke" ${art.attrs}>${art.body}</svg>` +
                    `<span style="font-size:11px;line-height:1.2;color:${MUTED};` +
                      `text-align:center">${name}</span>` +
                  `</div>`
                )
              }).join("") +
            `</div>` +
            `<div style="${DIVIDER};margin:32px 0"></div>`
          : "") +
        `<h2 style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.3px">${release.releasedVersion}</h2>` +
        `<p style="margin:8px 0 0;font-size:13px;color:${MUTED}">` +
          `Initial release &middot; ${release.label}` +
        `</p>` +
        `<p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:${MUTED}">` +
          `The first cut of the set: ${release.count} drawings on one 24 × 24 grid, ` +
          `at a 2px keyline, built for shadcn/ui and free under the MIT licence. ` +
          `Every icon is drawn in ${list}, and ships as an SVG, a JSX snippet ` +
          `and a React component.` +
        `</p>` +
      `</div>` +
    `</section>\n`
  )
}

/**
 * One card per category, cut into parts only for the wire.
 *
 * A part closes when the next row would take it past the budget. The first
 * carries the card, its header and an empty rows container; the rest are bare
 * rows that the importer appends into that container, so the artboard ends up
 * holding one card however many calls built it.
 *
 * Rows are numbered across the whole card rather than per part, or the stripe
 * would restart at every boundary and the seam would be visible.
 */
const files = new Map()
const entries = []

for (const section of SECTIONS) {
  const rows = section.blocks.map((block, i) => row(block, i))

  const parts = []
  let current = []
  let size = 0
  for (const html of rows) {
    if (current.length && size + html.length > BUDGET) {
      parts.push(current)
      current = []
      size = 0
    }
    current.push(html)
    size += html.length
  }
  if (current.length) parts.push(current)

  for (const [i, part] of parts.entries()) {
    const name = `${slug(section.label)}${parts.length > 1 ? `-${i + 1}` : ""}.html`
    const html =
      i === 0
        ? card({
            label: section.label,
            blurb: section.blurb,
            icons: section.blocks.length,
            names: section.blocks.reduce(
              (n, b) => n + new Set(b.variants.map((v) => v.name)).size,
              0
            ),
            rows: part.join(""),
          })
        : part.join("") + "\n"

    files.set(name, html)
    entries.push({
      file: name,
      artboard: section.label,
      category: section.label,
      part: i + 1,
      parts: parts.length,
      /* Where this part is written. The first makes the artboard; the rest are
         rows and belong inside the card's rows container, not beside it. */
      into: i === 0 ? "artboard" : "rows",
      width: 742,
      icons: i === 0 ? section.blocks.length : 0,
      variants: part.reduce(
        (n, html) => n + (html.match(/<svg /g) ?? []).length,
        0
      ),
      bytes: html.length,
    })
  }
}

/**
 * The release the two prose surfaces date themselves by.
 *
 * The tag's date, not the newest drawing's. Both surfaces used to print the
 * latter, which made the catalogue's "Released:" line wrong as soon as a
 * release was cut on a different day from the last edit: the last drawing
 * changed on 19 August and v0.1.0 was tagged on the 20th, so the boards claimed
 * a release date a day before it happened.
 *
 * These boards describe one released version rather than a working tree, so
 * both lines answer the same question, "as of when". The newest drawing date is
 * still the honest answer before anything is tagged, which is the fallback.
 *
 * The label is baked by `build-history.mjs` rather than formatted here: a date
 * formatted at render is formatted in the reader's locale, and these two
 * surfaces have to agree with the site.
 */
const dated = Object.values(HISTORY.icons ?? {}).filter((h) => h.updated)
const newest = dated.reduce((a, b) => (a && a.updated > b.updated ? a : b), dated[0])


const release = {
  version: HISTORY.version,
  releasedVersion: HISTORY.releasedVersion ?? HISTORY.version,
  label: HISTORY.releasedLabel ?? newest?.updatedLabel ?? "",
  /* "Last updated" is the last day a drawing moved, which is not the day the
     tag was cut. Handing it `label` printed the release date under a heading
     that promises the opposite, and it went stale in the other direction: the
     boards said 20 August while three days of drawings sat in them. */
  updatedLabel: newest?.updatedLabel ?? HISTORY.releasedLabel ?? "",
  since: {
    names: since.map(([name]) => name),
    label: since.reduce((a, [, h]) => (h.added > a.added ? h : a), since[0]?.[1] ?? {})
      ?.addedLabel ?? "",
  },
  /* The page counts drawings that carry a history entry, which is names rather
     than base icons and lags `icons/` until `history:build` runs. Both are true
     of `/changelog` as well, so mirroring the number is what keeps the two
     surfaces saying the same thing. */
  count: dated.length,
  styles: Object.fromEntries(
    STYLES.map((style) => [
      style,
      [...byName.values()].filter((icon) => icon.art[style]).length,
    ])
  ),
}

/* Counted before the catalogue is composed, because the cover prints them. */
const counted = {
  icons: blocks.size,
  variants: entries.reduce((n, e) => n + e.variants, 0),
}

{
  const html = catalogSheet(byName, counted, release)
  files.set("catalog.html", html)
  entries.push({
    file: "catalog.html",
    artboard: "Catalog surface",
    surface: "catalog",
    part: 1,
    parts: 1,
    /* The cover lists no icons now that the category index is gone: what it
       draws is the seven specimen chips, and reporting 396 here would have the
       manifest claim a surface carries the set. */
    icons: 0,
    /* The specimen and the category samples, not the set: this surface draws a
       little over a hundred of the 1,289 and the manifest should not imply it
       carries them all. */
    variants: (html.match(/<svg /g) ?? []).length,
    bytes: html.length,
  })
}

{
  const html = changelogSheet(byName, release)
  files.set("changelog.html", html)
  entries.push({
    file: "changelog.html",
    artboard: "Changelog",
    surface: "changelog",
    part: 1,
    parts: 1,
    icons: 0,
    variants: 0,
    bytes: html.length,
  })
}

const totals = {
  icons: counted.icons,
  names: byName.size,
  /* The catalogue draws every variant a second time, so the set's own total is
     the boards' and nothing else. Counting `entries` here would report 2,578. */
  variants: counted.variants,
  count: entries.length,
}

files.set(
  "manifest.json",
  JSON.stringify(
    {
      $comment: "GENERATED BY pipeline/build-paper.mjs — DO NOT EDIT.",
      target: "paper.design",
      /* How to spend this file, so the next session does not have to re-derive
         it: one artboard per sheet, in this order, `write_html` with the file's
         contents. Paper's MCP server is local and needs the desktop app open. */
      how: [
        "Open the target file in Paper Desktop so its MCP server is listening.",
        "First import: for each sheet in order, create_artboard named `artboard`, then write_html with the file's contents.",
        "Re-import of a board that already exists: do NOT delete it. get_children on the artboard, then write_html with mode: 'replace' targeting its single child. The artboard keeps its id, its name and its canvas position; delete + create_artboard loses the position, and nothing records it.",
        "Only the sheets that changed need re-importing. `git show --stat -- previews/paper` names them.",
        "Sheets are fragments: write them as-is, do not wrap them in a document.",
        "An artboard clips rather than hugs, so after the writes set height: fit-content on it with update_styles and it takes the height of what it holds.",
        "update_styles takes updates: [{ nodeIds: [...], styles }] — nodeIds, plural, an array. Handed a singular nodeId it answers with a schema error in the tool result rather than throwing, so a caller that does not read isError sees a call that reported nothing and changed nothing, and reads it as the property being unsettable.",
        "Paper names every node it parses after its type, so the file arrives as Frame holding SVG. Rename from the sheets: each svg carries data-icon and data-style in document order.",
        "The drawings to rename are the createdNodes with component === 'SVG'. Do not match on the name or on /svg/i — the nested paths come back as SVGVisualElement and a loose filter catches those too, which is 18 candidates on the catalogue sheet where there are 7 drawings.",
        "rename_nodes takes updates: [{ nodeId, name }] — nodeId singular here, unlike update_styles, which takes nodeIds as an array. The two are inconsistent and each rejects the other's shape.",
      ],
      icons: totals.icons,
      names: totals.names,
      variants: totals.variants,
      sheets: entries,
    },
    null,
    2
  ) + "\n"
)

if (check) {
  let drift = false
  const seen = existsSync(OUT)
    ? (await readdir(OUT)).filter((f) => f.endsWith(".html") || f === "manifest.json")
    : []

  for (const [name, want] of files) {
    const path = join(OUT, name)
    const prev = existsSync(path) ? await readFile(path, "utf8") : null
    if (prev === want) continue
    const why = prev === null ? "does not exist" : "is out of sync with icons/"
    console.error(`  ${c(33, "DRIFT")} previews/paper/${name} ${why}`)
    drift = true
  }
  /* An orphan is the failure a per-file diff cannot see: rename a category and
     the old sheet stays on disk, still valid, still imported by anyone reading
     the directory rather than the manifest. */
  for (const name of seen) {
    if (files.has(name)) continue
    console.error(`  ${c(33, "ORPHAN")} previews/paper/${name} is no longer generated`)
    drift = true
  }

  if (drift) {
    console.error(`\nRun: node pipeline/build-paper.mjs`)
    process.exit(1)
  }
  console.log(
    c(32, `previews/paper/ is in sync with icons/ (${totals.count} sheets, ${totals.variants} variants)`)
  )
} else {
  await mkdir(OUT, { recursive: true })
  for (const [name, html] of files) await writeFile(join(OUT, name), html, "utf8")

  for (const name of await readdir(OUT)) {
    if (files.has(name)) continue
    if (!name.endsWith(".html") && name !== "manifest.json") continue
    await unlink(join(OUT, name))
    console.log(`Removed previews/paper/${name} (no longer generated)`)
  }

  const kb = [...files.values()].reduce((n, s) => n + s.length, 0) / 1024
  console.log(
    `Wrote ${totals.count} sheets to previews/paper/ ` +
      `(${totals.icons} icons, ${totals.variants} variants, ${kb.toFixed(0)}KB)`
  )
  for (const e of entries) {
    console.log(`  ${e.file.padEnd(24)} ${String(e.icons).padStart(3)} ${e.icons === 1 ? "icon " : "icons"}  ${String(e.variants).padStart(3)} variants  ${(e.bytes / 1024).toFixed(0)}KB`)
  }
}
