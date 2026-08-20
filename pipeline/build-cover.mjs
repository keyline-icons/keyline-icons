// Compose the Figma Community cover, then rasterise it.
//
//   node pipeline/build-cover.mjs [--check]
//
// Writes two covers: previews/figma-cover.{svg,png} at 1920x1080, the size
// Figma asks for on a Community file, and previews/social-preview.{svg,png} at
// 1280x640 for a repository's social preview. The two aspects differ, which is
// why there are two compositions rather than one drawing at two scales.
//
// The icons on them are read out of icons/stroke/ rather than pasted in, so a
// cover cannot end up advertising a glyph that has since been redrawn or
// renamed.
//
// Like build-brand.mjs, this shells out to headless Chrome, because plain Node
// cannot rasterise a vector. It carries its own copy of the Chrome lookup
// rather than importing one: the two scripts are the only callers, and a
// pipeline/lib/chrome.mjs holding nine lines used twice is worth doing on the
// day a third caller appears, not before.
//
// --check re-composes the SVG and compares it, so a renamed icon fails here
// rather than being noticed on the Community page. It deliberately does not
// diff the PNG: two Chrome versions disagree by a pixel on identical input,
// which is the same reason brand:check stays out of CI.

import { execFile } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"
import { fileURLToPath } from "node:url"

const run = promisify(execFile)
const ROOT = fileURLToPath(new URL("..", import.meta.url))
const SRC = join(ROOT, "icons", "stroke")
const OUT = join(ROOT, "previews")
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const W = 1920
const PAD = 100

/**
 * The light theme's tokens resolved to literals, exactly as the social card
 * resolves them. A cover is a static image on someone else's page: there is no
 * viewer theme to read, and Figma puts it on its own surface.
 */
const BG = "#ffffff"
const PRIMARY = "#171717"
const ON_PRIMARY = "#fafafa"
const INK = "#0a0a0a"
const MUTED = "#737373"
const HAIRLINE = "#e5e5e5"

/** The mark, at the proportions components/brand-mark.tsx draws it. */
const TILE =
  "M31.916 0H8.07899C3.61455 0 0 3.615 0 8.08V31.925C0 36.385 3.61455 40 8.07899 40H31.921C36.3805 40 40 36.385 40 31.92V8.08C39.995 3.615 36.3805 0 31.916 0Z"
const PENNANT =
  "M13 28.3445V11.6597C13 11.3284 13.3162 11.0887 13.6351 11.1783L26.6351 14.8269C26.8509 14.8874 27 15.0842 27 15.3083V24.7811C27 25.0064 26.8494 25.2038 26.6322 25.2634L13.6322 28.8267C13.314 28.9139 13 28.6745 13 28.3445Z"

/**
 * The glyphs the cover leads with, in reading order.
 *
 * Curated rather than sampled, because the first row is the one anyone
 * actually looks at and an alphabetical slice opens on four align-offsets. Any
 * name that no longer exists is dropped and the grid tops up from the set, so
 * a rename degrades the cover instead of breaking the build.
 */
const WISHLIST = [
  // Row 1: the glyphs every set is judged on.
  "check", "x", "plus", "search", "user", "settings", "mail", "calendar",
  "file", "folder",
  // Row 2: the next tier of universals.
  "home", "bell", "lock", "globe", "play", "download", "upload", "bin",
  "copy", "clock",
  // Row 3: range, so the cover is not thirty variations on a rectangle.
  "smartphone", "shopping-cart", "credit-card", "map-pin", "git-branch",
  "terminal", "bar-chart", "tag", "arrow-right", "menu",
  // Row 4, which the Figma cover added when it went to 16:9. It was briefly
  // filled by the alphabetical top-up and ended on `align-offset-bottom`,
  // `-left` and `-right`: three near-identical glyphs closing the one image
  // most people judge the set by.
  "link", "package", "bookmark", "share", "gift", "heart", "star", "eye",
  "image", "code",
  // Spares. The list is longer than the grid so a rename is absorbed here
  // rather than by the alphabetical top-up, which opens on align-offset.
  "chevron-down", "cloud", "sun", "wifi", "filter", "database",
]

const COLS = 10
const CELL = (W - PAD * 2) / COLS
const GLYPH = 64

/**
 * The two covers, which are no longer one drawing at two scales.
 *
 * They were, on the belief that Figma wanted 1920×960 and GitHub 1280×640, both
 * 2:1. Figma's publish dialog asks for **1920×1080**, so the shared aspect never
 * held and the cover sat 120px short inside the frame with the composition
 * floating in it. GitHub's social preview really is 2:1, so the fix is a second
 * composition rather than one aspect for both.
 *
 * The 120px is exactly one glyph row, which is why the Figma cover carries four
 * rows and the social preview three. Nothing else moves: the header is
 * identical, and the footer is measured from the bottom edge so both sit the
 * same distance from it.
 */
const COVERS = [
  { svg: "figma-cover.svg", png: "figma-cover.png", h: 1080, rows: 4, raster: [1920, 1080] },
  { svg: "social-preview.svg", png: "social-preview.png", h: 960, rows: 3, raster: [1280, 640] },
]

/** Enough glyphs for the tallest cover; each composition takes what it needs. */
const MAX_ROWS = Math.max(...COVERS.map((c) => c.rows))

const ATTR = /([\w-]+)="([^"]*)"/g
const ROOT_DROP = new Set(["width", "height", "xmlns", "viewBox"])

/** An icon's root presentation attributes and its body, ready to nest in a <g>. */
async function readGlyph(name) {
  const svg = await readFile(join(SRC, `${name}.svg`), "utf8")
  const open = svg.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  const attrs = [...open.matchAll(ATTR)]
    .filter(([, k]) => !ROOT_DROP.has(k))
    .map(([, k, v]) => `${k}="${v}"`)
    .join(" ")
  const body = svg.replace(/^[\s\S]*?<svg\b[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "")
  return { attrs, body: body.trim() }
}

const available = new Set(
  (await readdir(SRC)).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4))
)

const want = COLS * MAX_ROWS
const picked = WISHLIST.filter((n) => available.has(n)).slice(0, want)
for (const n of [...available].sort()) {
  if (picked.length >= want) break
  if (!picked.includes(n)) picked.push(n)
}

/** Every glyph the tallest cover needs, positioned. A shorter one takes a slice. */
const glyphs = []
for (const [i, name] of picked.entries()) {
  const { attrs, body } = await readGlyph(name)
  // The glyph is drawn on a 24 grid, so the scale carries its stroke with it:
  // 2 units at 24 is the same weight as 5.33 at 64. Scaling is what makes an
  // enlarged keyline look drawn rather than hairline.
  const s = GLYPH / 24
  const x = PAD + (i % COLS) * CELL + (CELL - GLYPH) / 2
  const y = 490 + Math.floor(i / COLS) * 120
  glyphs.push(
    `<g transform="translate(${x.toFixed(2)} ${y}) scale(${s})" ${attrs}>${body}</g>`
  )
}

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

const total = available.size
const styles = ["stroke", "duotone", "fill"]

/**
 * One cover at a given height, with the glyph grid cut to `rows`.
 *
 * The header is fixed: the mark, the title and the rule under it sit the same
 * distance from the top on both, so the two covers read as the same object. The
 * footer is measured from the bottom edge instead, which is what lets one
 * composition serve two heights without a second set of tuned numbers.
 */
const compose = (h, rows) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">` +
  `<rect width="${W}" height="${h}" fill="${BG}"/>` +
  // The mark, scaled off its own 40-unit box.
  `<g transform="translate(${PAD} 96) scale(2.6)">` +
  `<path d="${TILE}" fill="${PRIMARY}"/>` +
  `<path d="${PENNANT}" fill="${ON_PRIMARY}" stroke="${ON_PRIMARY}" stroke-width="3" stroke-linecap="round"/>` +
  `</g>` +
  `<text x="${PAD}" y="322" font-family="${FONT}" font-size="96" font-weight="600" letter-spacing="-3" fill="${INK}">Keyline Icons</text>` +
  `<text x="${PAD}" y="378" font-family="${FONT}" font-size="34" fill="${MUTED}">Built for shadcn/ui · An icon set made entirely with AI</text>` +
  `<line x1="${PAD}" y1="430" x2="${W - PAD}" y2="430" stroke="${HAIRLINE}" stroke-width="2"/>` +
  `<g fill="none" stroke="${INK}">${glyphs.slice(0, COLS * rows).join("")}</g>` +
  `<line x1="${PAD}" y1="${h - 114}" x2="${W - PAD}" y2="${h - 114}" stroke="${HAIRLINE}" stroke-width="2"/>` +
  `<text x="${PAD}" y="${h - 60}" font-family="${FONT}" font-size="30" fill="${INK}">${total} free icons</text>` +
  `<text x="${W - PAD}" y="${h - 60}" text-anchor="end" font-family="${FONT}" font-size="30" fill="${MUTED}">${styles.join(" · ")}  |  24 × 24  |  MIT</text>` +
  `</svg>\n`

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean)

function findChrome() {
  const hit = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (hit) return hit
  throw new Error(
    `${c(31, "No Chrome found.")} Rasterising needs one. Set CHROME=/path/to/chrome,\n` +
      `or install one of:\n` +
      CHROME_CANDIDATES.map((p) => `  ${p}`).join("\n")
  )
}

/** Each cover's finished SVG, keyed by the file it is written to. */
const built = COVERS.map((cover) => ({ ...cover, text: compose(cover.h, cover.rows) }))

if (check) {
  // Both covers are reported before exiting. Bailing on the first would hide a
  // stale second behind it, so the fix looks complete after one rebuild.
  let drift = false
  for (const { svg: file, text } of built) {
    const path = join(OUT, file)
    const prev = existsSync(path) ? await readFile(path, "utf8") : null
    if (prev === text) continue
    const why = prev === null ? "does not exist" : "is out of sync with icons/stroke/"
    console.error(`  ${c(33, "DRIFT")} previews/${file} ${why}`)
    drift = true
  }
  if (drift) {
    console.error(`\nRun: node pipeline/build-cover.mjs`)
    process.exit(1)
  }
  const sizes = built.map((b) => `${b.raster[0]}×${b.raster[1]}`).join(", ")
  console.log(
    c(32, `previews/ covers are in sync with icons/stroke/ (${sizes}, ${picked.length} glyphs)`)
  )
} else {
  await mkdir(OUT, { recursive: true })

  const chrome = findChrome()
  for (const { svg: file, png: pngFile, text, raster } of built) {
    const svgPath = join(OUT, file)
    await writeFile(svgPath, text, "utf8")

    const [w, h] = raster
    const pngPath = join(OUT, pngFile)
    await run(chrome, [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      `--screenshot=${pngPath}`,
      `--window-size=${w},${h}`,
      `file://${svgPath}`,
    ]).catch((e) => {
      // Chrome chatters on stderr about macOS task policy even on success.
      if (!existsSync(pngPath)) throw e
    })
    if (!existsSync(pngPath)) throw new Error(`Chrome produced no PNG for ${pngFile}`)

    const png = await readFile(pngPath)
    const [gotW, gotH] = [png.readUInt32BE(16), png.readUInt32BE(20)]
    if (gotW !== w || gotH !== h) {
      throw new Error(`${pngFile}: expected ${w}x${h}, Chrome gave ${gotW}x${gotH}`)
    }
    console.log(`Wrote previews/${pngFile} (${w}×${h})`)
  }

  console.log(`${built.length} covers, ${picked.length} glyphs`)
}
