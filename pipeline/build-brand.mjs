#!/usr/bin/env node
/**
 * public/logo/logo.svg  ->  app/icon.svg, app/favicon.ico, app/apple-icon.png
 *                       ->  public/logo/icon-192.png, public/logo/icon-512.png
 *                       ->  packages/figma-plugin/icon.png
 *
 * Every one of these is the same mark wearing different constraints, and before
 * this the app icons were three hand-made artifacts with nothing tying them to
 * the logo or to each other. Redraw the mark and they drift silently, because
 * nothing type-checks a favicon.
 *
 * The plugin icon joined them for the same reason and a sharper one: it is
 * uploaded to a Figma Community listing by hand and then lives outside this
 * repository entirely, where no check can ever reach it again.
 *
 *   node pipeline/build-brand.mjs [--check]
 *
 * --check writes nothing and exits non-zero if output would differ. It is
 * deliberately NOT in icons:ci, for the same reason icons:figma is not: it
 * needs something the CI box does not have. Rasterising needs a browser, and
 * two Chrome versions can disagree by a pixel on the same input, so in CI this
 * would fail on the renderer rather than on the mark. Run it after touching
 * the logo, not on every push.
 *
 * No dependencies, per pipeline/README.md — but rasterising a vector is the one
 * thing plain Node cannot do. Rather than take on a native image dependency for
 * three files that change once a year, this shells out to headless Chrome and
 * says exactly what to do when it cannot find one.
 */

import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { execFile } from "node:child_process"
import { inflateSync } from "node:zlib"
import { promisify } from "node:util"
import { tmpdir } from "node:os"
import { join, relative, resolve } from "node:path"

const run = promisify(execFile)

const ROOT = resolve(import.meta.dirname, "..")
const SRC = join(ROOT, "public", "logo", "logo.svg")
const APP = join(ROOT, "app")
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/**
 * The primary token pair, resolved to literals. Neither a favicon nor an
 * apple-touch-icon can read the site's theme class, so the tokens cannot come
 * along; if `--primary` ever moves, these move with it by hand.
 */
const LIGHT = { tile: "#171717", glyph: "#fafafa" }
const DARK = { tile: "#e5e5e5", glyph: "#171717" }

/** The .ico carries every size a browser or OS might ask it for. */
const ICO_SIZES = [16, 32, 48, 64, 128, 256]

/** What Apple asks for: iPhone @3x of a 60pt slot. */
const APPLE_SIZE = 180

/**
 * The two icons `app/manifest.ts` links, which is what makes the site
 * installable on Android. Chrome asks for both: 192 for the home screen and
 * 512 for the splash and the install dialog, and it will not offer to install
 * a site missing either.
 *
 * They land in `public/` rather than in `app/`, and that is forced rather than
 * chosen. Next's app-icon convention matches `icon` and `icon<N>` only, so a
 * file named for its size matches nothing, and a file in `app/` that matches
 * no convention is not served at all — the manifest would link a 404. `public/`
 * gives them a stable path the manifest can name. Not `public/icons/`, which
 * would sit on top of the `/icons/[name]` route.
 *
 * Bled and opaque like the apple icon, for a second reason as well as Apple's:
 * the manifest declares them `maskable`, and Android crops a maskable icon to
 * a circle 80% of the width. The glyph runs 11.5–28.5 across a 40 viewBox once
 * its 3-unit stroke is counted, so it sits about 13.4 from the centre against
 * that circle's 16 — inside the safe zone, which is what lets one rendering
 * serve `any` and `maskable` both. Redraw the mark wider than that and they
 * have to become two files.
 */
const MANIFEST_SIZES = [192, 512]

/**
 * The Figma plugin's Community icon, which the publish dialog asks for at
 * 128×128 and which cannot be referenced from `manifest.json`: it is uploaded
 * by hand, once, and then lives in Figma rather than in the repository.
 *
 * That is exactly why it is generated here rather than exported by hand. An
 * icon nobody can regenerate is an icon that silently stops being the mark the
 * moment the mark changes, and this one is going to sit in a Community listing
 * where nothing about the repository can reach it.
 *
 * Bled like the apple-touch-icon rather than transparent: Figma draws it on
 * both light and dark chrome, and a transparent mark disappears into one of
 * them.
 */
const PLUGIN_ICON_SIZE = 128

const CHROME_CANDIDATES = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean)

function findChrome() {
  const hit = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (hit) return hit
  console.error(
    `${c(31, "No Chrome found.")} Rasterising needs one. Set CHROME=/path/to/chrome,\n` +
      `or install Google Chrome. Looked in:\n` +
      CHROME_CANDIDATES.map((p) => `  ${p}`).join("\n"),
  )
  process.exit(1)
}

/**
 * Pull the mark out of the source file rather than restating it here, so the
 * logo stays the one place the shape is defined. Two paths, tile then glyph —
 * anything else means the file was redrawn into a shape this does not
 * understand, and guessing would quietly ship a wrong icon.
 */
function readMark(svg) {
  const paths = [...svg.matchAll(/<path\b([^>]*?)\/?>/g)].map((m) => m[1])
  if (paths.length !== 2) {
    throw new Error(
      `expected exactly 2 <path> elements in public/logo/logo.svg (tile, then glyph), found ${paths.length}`,
    )
  }
  const attr = (s, n) => (s.match(new RegExp(`\\b${n}="([^"]*)"`)) || [])[1]
  const viewBox = attr(svg.match(/<svg\b([^>]*)>/)[1], "viewBox")
  const mark = {
    viewBox,
    tile: attr(paths[0], "d"),
    glyph: attr(paths[1], "d"),
    strokeWidth: attr(paths[1], "stroke-width") ?? "3",
    strokeLinecap: attr(paths[1], "stroke-linecap") ?? "round",
  }
  for (const [k, v] of Object.entries(mark)) {
    if (!v) throw new Error(`could not read ${k} from public/logo/logo.svg`)
  }
  return mark
}

/**
 * The tab icon. Keeps its own rounded corners and swaps on prefers-color-scheme
 * — the only theme signal a favicon gets.
 *
 * Note the comment below carries a warning rather than the token's name: SVG is
 * XML, a double hyphen is illegal inside an XML comment, and writing a CSS
 * custom property by name there is enough to make the file fail to parse and
 * render as a broken image in every tab.
 */
const iconSvg = (m) => `<svg width="40" height="40" viewBox="${m.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
<!--
  GENERATED by pipeline/build-brand.mjs from public/logo/logo.svg. Do not edit.

  Careful editing this comment: SVG is parsed as XML, and a double hyphen is
  illegal inside one. Writing a CSS custom property here by name is enough to
  make the whole file fail to parse and render as a broken image.
-->
<style>
  .tile { fill: ${LIGHT.tile} }
  .glyph { fill: ${LIGHT.glyph}; stroke: ${LIGHT.glyph} }
  @media (prefers-color-scheme: dark) {
    .tile { fill: ${DARK.tile} }
    .glyph { fill: ${DARK.glyph}; stroke: ${DARK.glyph} }
  }
</style>
<path class="tile" d="${m.tile}"/>
<path class="glyph" d="${m.glyph}" stroke-width="${m.strokeWidth}" stroke-linecap="${m.strokeLinecap}"/>
</svg>
`

/**
 * A single fixed rendering, for the formats that cannot carry two.
 *
 * `bleed` squares off the tile and fills it edge to edge. That is the
 * apple-touch-icon: iOS masks the icon with its own superellipse, so shipping
 * our rounded corners inside its rounded corners reads as a shrunken logo with
 * a dark rim. iOS also discards alpha and composites onto black, which is why
 * the bled version has no transparent pixel anywhere.
 */
const flatSvg = (m, size, { bleed = false } = {}) =>
  `<svg width="${size}" height="${size}" viewBox="${m.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">` +
  (bleed
    ? `<rect width="100%" height="100%" fill="${LIGHT.tile}"/>`
    : `<path d="${m.tile}" fill="${LIGHT.tile}"/>`) +
  `<path d="${m.glyph}" fill="${LIGHT.glyph}" stroke="${LIGHT.glyph}" stroke-width="${m.strokeWidth}" stroke-linecap="${m.strokeLinecap}"/>` +
  `</svg>`

async function rasterize(chrome, dir, svg, size, name) {
  const src = join(dir, `${name}.svg`)
  const out = join(dir, `${name}.png`)
  await writeFile(src, svg)
  await run(chrome, [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    // Transparent, so the tile's rounded corners stay cut out. The bled
    // apple icon paints its own opaque ground and never relies on this.
    "--default-background-color=00000000",
    `--screenshot=${out}`,
    `--window-size=${size},${size}`,
    `file://${src}`,
  ]).catch((e) => {
    // Chrome chatters on stderr about macOS task policy even on success.
    if (!existsSync(out)) throw e
  })
  if (!existsSync(out)) throw new Error(`Chrome produced no PNG for ${name}`)
  const png = await readFile(out)
  const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]
  if (w !== size || h !== size) {
    throw new Error(`${name}: expected ${size}x${size}, Chrome gave ${w}x${h}`)
  }
  return png
}

/**
 * Wrap PNGs in an ICO container. The format is a 6-byte header, then one
 * 16-byte directory entry per image, then the payloads — and a width or height
 * byte of 0 means 256, which is the only reason 256 fits in one byte.
 */
function buildIco(pngs) {
  const dirLen = 6 + 16 * pngs.length
  const head = Buffer.alloc(dirLen)
  head.writeUInt16LE(0, 0) // reserved
  head.writeUInt16LE(1, 2) // type: icon
  head.writeUInt16LE(pngs.length, 4)
  let off = dirLen
  pngs.forEach(({ size, png }, i) => {
    const o = 6 + 16 * i
    head.writeUInt8(size === 256 ? 0 : size, o)
    head.writeUInt8(size === 256 ? 0 : size, o + 1)
    head.writeUInt16LE(1, o + 4) // colour planes
    head.writeUInt16LE(32, o + 6) // bits per pixel
    head.writeUInt32LE(png.length, o + 8)
    head.writeUInt32LE(off, o + 12)
    off += png.length
  })
  return Buffer.concat([head, ...pngs.map((p) => p.png)])
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`No source mark at ${SRC}`)
    process.exit(1)
  }
  const mark = readMark(await readFile(SRC, "utf8"))
  const chrome = findChrome()
  const dir = await mkdtemp(join(tmpdir(), "brand-"))

  let outputs
  try {
    const icoParts = []
    for (const size of ICO_SIZES) {
      icoParts.push({
        size,
        png: await rasterize(chrome, dir, flatSvg(mark, size), size, `ico-${size}`),
      })
    }
    const apple = await rasterize(
      chrome,
      dir,
      flatSvg(mark, APPLE_SIZE, { bleed: true }),
      APPLE_SIZE,
      "apple",
    )
    assertOpaque(apple)

    const pluginIcon = await rasterize(
      chrome,
      dir,
      flatSvg(mark, PLUGIN_ICON_SIZE, { bleed: true }),
      PLUGIN_ICON_SIZE,
      "plugin",
    )
    assertOpaque(pluginIcon, "figma-plugin/icon.png")

    const manifestIcons = []
    for (const size of MANIFEST_SIZES) {
      const png = await rasterize(
        chrome,
        dir,
        flatSvg(mark, size, { bleed: true }),
        size,
        `manifest-${size}`,
      )
      assertOpaque(png, `icon-${size}.png`)
      manifestIcons.push([join(ROOT, "public", "logo", `icon-${size}.png`), png])
    }

    // Full paths, because these no longer all land in app/.
    outputs = [
      [join(APP, "icon.svg"), Buffer.from(iconSvg(mark))],
      [join(APP, "favicon.ico"), buildIco(icoParts)],
      [join(APP, "apple-icon.png"), apple],
      ...manifestIcons,
      [join(ROOT, "packages", "figma-plugin", "icon.png"), pluginIcon],
    ]
  } finally {
    await rm(dir, { recursive: true, force: true })
  }

  let drift = 0
  let written = 0
  for (const [dest, next] of outputs) {
    const label = relative(ROOT, dest)
    const prev = existsSync(dest) ? await readFile(dest) : null
    if (prev && prev.equals(next)) continue
    if (check) {
      console.error(`  ${c(33, "DRIFT")} ${label}`)
      drift++
    } else {
      await writeFile(dest, next)
      console.log(`  ${c(32, "WROTE")} ${label}  (${next.length}B)`)
      written++
    }
  }

  if (check) {
    if (drift) {
      console.error(
        `\n${drift} file(s) out of sync — run: node pipeline/build-brand.mjs`,
      )
      process.exit(1)
    }
    console.log(c(32, "app icons are in sync with public/logo/logo.svg"))
    return
  }
  console.log(written ? `Wrote ${written} changed file(s).` : "Already up to date.")
}

/**
 * iOS throws the alpha channel away and composites the rest onto black, so a
 * stray transparent pixel becomes a black one. Cheaper to catch here than on a
 * home screen, so walk the decoded image rather than trusting the source.
 */
function assertOpaque(png, label = "apple-icon") {
  const { width, height, rows, channels } = decodePng(png)
  // Chrome drops the alpha channel entirely when nothing is translucent, so
  // three channels is itself the proof — there is no alpha left to be wrong.
  if (channels === 4) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (rows[y][x * 4 + 3] !== 255) {
          throw new Error(`${label} has a transparent pixel at ${x},${y}`)
        }
      }
    }
  }
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ]
  for (const [x, y] of corners) {
    const hex =
      "#" +
      [0, 1, 2]
        .map((i) => rows[y][x * channels + i].toString(16).padStart(2, "0"))
        .join("")
    if (hex !== LIGHT.tile) {
      throw new Error(
        `${label} corner ${x},${y} is ${hex}, expected a full bleed of ${LIGHT.tile}`,
      )
    }
  }
}

/** Enough of a PNG reader to check pixels: inflate the IDATs, then unfilter. */
function decodePng(png) {
  const width = png.readUInt32BE(16)
  const height = png.readUInt32BE(20)
  const colourType = png.readUInt8(25)
  // 2 = RGB, 6 = RGBA. Chrome picks whichever the image actually needs.
  if (colourType !== 2 && colourType !== 6) {
    throw new Error(`unsupported PNG colour type ${colourType} from Chrome`)
  }
  const bpp = colourType === 6 ? 4 : 3
  const idat = []
  for (let i = 8; i < png.length; ) {
    const len = png.readUInt32BE(i)
    const type = png.toString("ascii", i + 4, i + 8)
    if (type === "IDAT") idat.push(png.subarray(i + 8, i + 8 + len))
    i += 12 + len
  }
  const raw = inflateSync(Buffer.concat(idat))
  const stride = width * bpp
  const rows = []
  let prev = Buffer.alloc(stride)
  let pos = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[pos]
    const line = Buffer.from(raw.subarray(pos + 1, pos + 1 + stride))
    pos += 1 + stride
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? line[x - bpp] : 0
      const b = prev[x]
      const cc = x >= bpp ? prev[x - bpp] : 0
      if (filter === 1) line[x] = (line[x] + a) & 255
      else if (filter === 2) line[x] = (line[x] + b) & 255
      else if (filter === 3) line[x] = (line[x] + ((a + b) >> 1)) & 255
      else if (filter === 4) {
        const p = a + b - cc
        const pa = Math.abs(p - a)
        const pb = Math.abs(p - b)
        const pc = Math.abs(p - cc)
        line[x] = (line[x] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : cc)) & 255
      }
    }
    rows.push(line)
    prev = line
  }
  return { width, height, rows, channels: bpp }
}

main().catch((e) => {
  console.error(e.message ?? e)
  process.exit(1)
})
