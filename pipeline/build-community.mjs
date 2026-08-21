// Compose the six Figma Community carousel sheets, then rasterise them.
//
//   node pipeline/build-community.mjs [--check]
//
// Writes previews/community/*.png at 1920x1080, the size Figma asks for on a
// Community listing's carousel. Three sheets argue for the set itself (styles,
// containers, range) and three show it inside FigJam, which is where a plugin
// insert behaves differently enough to be worth its own frames.
//
// Every drawing is read out of icons/ rather than exported from the Figma file.
// That is the whole reason this exists as a build target: the first version of
// these sheets was exported by hand, and one of them shipped with no icons on
// it at all because nobody could re-run it to look again.
//
// Like build-cover.mjs, this shells out to headless Chrome, because plain Node
// cannot rasterise. It composes HTML rather than SVG, because the FigJam sheets
// want stickies, shadows and rotation, and CSS does those in a line each.
//
// --check composes all six without rasterising and fails on any icon name that
// is no longer in icons/, which is the failure this guards against: a rename
// leaves a hole in a sheet and nothing on the Community page says so. It
// deliberately does not diff the PNGs. Two Chrome versions disagree by a pixel
// on identical input, the same reason cover:check compares the SVG instead.
//
// The PNGs stay out of git. They are large, they are regenerated from this
// file, and previews/.gitignore keeps generated images from sitting next to
// committed ones looking equally authoritative.

import { execFile } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile, unlink } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"
import { fileURLToPath } from "node:url"

const run = promisify(execFile)
const ROOT = fileURLToPath(new URL("..", import.meta.url))
const ICONS = join(ROOT, "icons")
const OUT = join(ROOT, "previews", "community")
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const W = 1920
const H = 1080

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

/* ── reading a drawing ─────────────────────────────────────────────────── */

const ATTR = /([\w-]+)="([^"]*)"/g
/** Dropped so the caller's own size and the inline context take over. */
const DROP = new Set(["width", "height", "xmlns"])
/** Each shape with its own attributes, so paint can be matched to how it paints. */
const SHAPE_TAG = /<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)(\/?)>/g

/** Names a sheet asked for, and the subset icons/ could not supply. */
const used = new Set()
const missing = new Set()

/**
 * Split a drawing into the root attributes worth keeping and its body.
 *
 * A miss is recorded and returns null rather than throwing, so one rename does
 * not hide the other five behind it.
 */
async function read(style, name) {
  used.add(`${style}/${name}`)
  let src
  try {
    src = await readFile(join(ICONS, style, `${name}.svg`), "utf8")
  } catch (e) {
    if (e.code !== "ENOENT") throw e
    missing.add(`${style}/${name}`)
    return null
  }
  const open = src.match(/<svg\b([^>]*)>/)?.[1] ?? ""
  return {
    attrs: [...open.matchAll(ATTR)]
      .filter(([, k]) => !DROP.has(k))
      .map(([, k, v]) => `${k}="${v}"`)
      .join(" "),
    body: src
      .replace(/^[\s\S]*?<svg\b[^>]*>/, "")
      .replace(/<\/svg>[\s\S]*$/, "")
      .replace(/\s+/g, " ")
      .trim(),
  }
}

/** One drawing at a px size, colour inherited from whatever is in scope. */
async function glyph(style, name, size) {
  const parts = await read(style, name)
  if (!parts) return `<svg width="${size}" height="${size}"></svg>`
  return `<svg width="${size}" height="${size}" ${parts.attrs}>${parts.body}</svg>`
}

/** The same, wrapped so `currentColor` resolves to one chosen colour. */
const inked = async (style, name, size, colour) =>
  `<span style="color:${colour}">${await glyph(style, name, size)}</span>`

/**
 * One drawing with a colour per path.
 *
 * The override has to match how the path is painted, which is the whole trick.
 * In a fill drawing the shape carries `fill="currentColor" stroke="none"` and
 * the badge carries nothing at all, inheriting `fill="none" stroke="currentColor"`
 * from the root: one is filled, the next is stroked. Setting `fill` on both
 * leaves every badge black, and setting both on both fattens the shape and
 * closes the knockouts a fill drawing relies on, which turned `package` into a
 * plain hexagon. So each element is read first and given the one it uses.
 */
async function perPath(style, name, size, colours) {
  const parts = await read(style, name)
  if (!parts) return `<svg width="${size}" height="${size}"></svg>`

  let i = 0
  const painted = parts.body.replace(SHAPE_TAG, (whole, tag, rest, close) => {
    // A colour per path, and the last one carries on past the end of the list,
    // so a three-path drawing does not leave its third element unpainted.
    const colour = colours[i] ?? colours[colours.length - 1]
    i++
    if (!colour) return whole
    const filled = /fill="(?!none)/.test(rest)
    const prop = filled ? "fill" : "stroke"
    // Replaced rather than appended. A second `fill=` on one element is a
    // duplicate attribute and the parser keeps the first, so appending left
    // every filled shape on its original currentColor and only the badges,
    // which carry no attribute of their own, ever changed.
    const cleaned = rest.replace(new RegExp(`\\s${prop}="[^"]*"`, "g"), "")
    return `<${tag}${cleaned} ${prop}="${colour}"${close}>`
  })

  return `<svg width="${size}" height="${size}" ${parts.attrs}>${painted}</svg>`
}

/* ── the two page shells ───────────────────────────────────────────────── */

/** A plain sheet: header, then whatever the sheet lays out below it. */
const shell = (bg, ink, inner) =>
  `<!doctype html><meta charset="utf-8"><style>` +
  `html,body{margin:0;padding:0}` +
  `body{width:${W}px;height:${H}px;background:${bg};color:${ink};` +
  `font-family:${FONT};box-sizing:border-box;overflow:hidden;` +
  `display:flex;flex-direction:column}` +
  `h1{margin:0;font-size:44px;font-weight:600;letter-spacing:-1.2px}` +
  `p{margin:10px 0 0;font-size:22px;opacity:.55}` +
  `</style>${inner}`

/** FigJam's own palette, read off the picker in the editor. */
const FJ = {
  bg: "#f5f5f5",
  dot: "#d4d4d4",
  ink: "#1e1e1e",
  red: "#e92626",
  orange: "#f5a623",
  yellow: "#f5d327",
  green: "#4caf50",
  teal: "#2ec4b6",
  blue: "#2196f3",
  purple: "#7b61ff",
  pink: "#ff5c9e",
  // Sticky fills, which are the pastel row rather than the vivid one.
  sYellow: "#fff5b1",
  sGreen: "#c6f0c2",
  sBlue: "#bfe3ff",
  sPink: "#ffd1e3",
  sOrange: "#ffdcb8",
  sPurple: "#e0d8ff",
}

/** The dotted canvas FigJam draws behind everything, plus its furniture. */
const board = (inner, extraCss = "") =>
  `<!doctype html><meta charset="utf-8"><style>` +
  `html,body{margin:0;padding:0}` +
  `body{width:${W}px;height:${H}px;box-sizing:border-box;overflow:hidden;` +
  `font-family:${FONT};color:${FJ.ink};background:${FJ.bg};` +
  `background-image:radial-gradient(${FJ.dot} 2px, transparent 2px);` +
  `background-size:44px 44px;background-position:14px 14px;position:relative}` +
  `.abs{position:absolute}` +
  `h1{margin:0;font-size:46px;font-weight:600;letter-spacing:-1.2px}` +
  `.sub{margin:10px 0 0;font-size:22px;opacity:.55}` +
  // A FigJam sticky: square-ish, soft corner, a hair of shadow.
  `.sticky{border-radius:8px;padding:22px;box-sizing:border-box;` +
  `box-shadow:0 2px 0 rgba(0,0,0,.06);display:flex;flex-direction:column;gap:12px}` +
  `.sticky .t{font-size:23px;line-height:1.32;font-weight:500}` +
  `.row{display:flex;align-items:center;gap:10px}` +
  `.pill{display:inline-flex;align-items:center;gap:9px;background:#fff;` +
  `border-radius:999px;padding:10px 18px 10px 14px;font-size:20px;font-weight:500;` +
  `box-shadow:0 2px 0 rgba(0,0,0,.06)}` +
  `svg{display:block}` +
  `${extraCss}</style>${inner}`

/* ── sheet 1: the three styles ─────────────────────────────────────────── */

const STYLES = ["stroke", "duotone", "fill"]

/** Chosen because all twenty-five exist in all three styles, which is the point. */
const STYLE_ICONS = [
  "bell", "bookmark", "calendar", "camera", "cloud",
  "file", "folder", "heart", "lock", "mail",
  "star", "tag", "user", "shopping-cart", "image",
  "archive", "bin", "credit-card", "gift", "map-pin",
  "message", "package", "pen", "play", "sun",
]

async function sheetStyles() {
  let cols = ""
  for (const style of STYLES) {
    let cells = ""
    for (const name of STYLE_ICONS) {
      cells += `<div class="c">${await glyph(style, name, 78)}</div>`
    }
    cols += `<section><div class="lab">${style}</div><div class="grid">${cells}</div></section>`
  }

  return {
    name: "1-styles",
    html: shell(
      "#ffffff",
      "#0a0a0a",
      `<style>
        body{padding:64px 72px 56px}
        .head{margin-bottom:36px}
        .row{display:flex;gap:52px;flex:1;min-height:0}
        section{flex:1;display:flex;flex-direction:column;min-height:0}
        .lab{font-size:19px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
             opacity:.38;margin-bottom:18px}
        .grid{display:grid;grid-template-columns:repeat(5,1fr);
              grid-template-rows:repeat(5,1fr);gap:6px;
              border-top:2px solid #e5e5e5;padding-top:20px;flex:1;min-height:0}
        .c{display:flex;align-items:center;justify-content:center}
        svg{display:block}
      </style>
      <div class="head">
        <h1>Three styles, one drawing</h1>
        <p>Stroke for all of them. Duotone and fill where the glyph has a region to fill.</p>
      </div>
      <div class="row">${cols}</div>`
    ),
  }
}

/* ── sheet 2: the container system ─────────────────────────────────────── */

const CONTAINED = ["arrow-down", "check", "play", "plus", "x", "chevron-right", "menu"]
const COMBOS = [
  ["regular", "stroke", ""],
  ["square", "stroke", "square-"],
  ["square", "duotone", "square-"],
  ["square", "fill", "square-"],
  ["circle", "stroke", "circle-"],
  ["circle", "duotone", "circle-"],
  ["circle", "fill", "circle-"],
]

async function sheetContainers() {
  const head = COMBOS.map(
    ([container, style]) =>
      `<div class="h"><span class="k">${container}</span><span class="s">${style}</span></div>`
  ).join("")

  let rows = ""
  for (const name of CONTAINED) {
    for (const [, style, prefix] of COMBOS) {
      rows += `<div class="c">${await glyph(style, `${prefix}${name}`, 84)}</div>`
    }
  }

  return {
    name: "2-containers",
    html: shell(
      "#ffffff",
      "#0a0a0a",
      `<style>
        body{padding:64px 72px 56px}
        .head{margin-bottom:32px}
        .cols{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;
              padding-bottom:16px;border-bottom:2px solid #e5e5e5}
        .h{display:flex;flex-direction:column;gap:4px;align-items:center}
        .k{font-size:19px;font-weight:600}
        .s{font-size:15px;letter-spacing:.1em;text-transform:uppercase;opacity:.38}
        .grid{display:grid;grid-template-columns:repeat(7,1fr);
              grid-auto-rows:1fr;gap:8px;flex:1;min-height:0;padding-top:12px}
        .c{display:flex;align-items:center;justify-content:center}
        svg{display:block}
      </style>
      <div class="head">
        <h1>Square and circle, without a second drawing</h1>
        <p>One component set per icon, with Container and Style as variant properties.</p>
      </div>
      <div class="cols">${head}</div>
      <div class="grid">${rows}</div>`
    ),
  }
}

/* ── sheet 3: range, on dark ───────────────────────────────────────────── */

const RANGE_COLS = 14
const RANGE_ROWS = 7

/**
 * Spread across the set rather than an alphabetical slice, which would be
 * ninety variations on an arrow. Anything here that has since been renamed
 * drops out quietly and the grid tops up from the rest, so this list is a
 * preference and not a claim: it is the one place in the file that may name an
 * icon which no longer exists without that being a failure.
 */
const RANGE_LEAD = [
  "activity","airplay","alarm-clock","anchor","aperture","award","battery","bluetooth",
  "book","briefcase","brush","bug","building-columns","cake","calculator","chef-hat",
  "clapperboard","coffee","compass","cpu","crown","database","dice-5","dna",
  "droplet","dumbbell","feather","flame","flask","gamepad","gauge","graduation-cap",
  "guitar","hammer","headphones","joystick","key","lamp","leaf","lightbulb",
  "magnet","medal","microscope","music","palette","paperclip","parachute","piano",
  "pill","plane","plug","puzzle","rocket","ruler","scissors","shield",
  "shirt","snowflake","speaker","sprout","stethoscope","swords","telescope","tent",
  "thermometer","ticket","trophy","umbrella","utensils","wallet","wand","watch",
  "waves","webcam","wheat","wind","wine","wrench","zap","anvil",
]

async function sheetRange(total) {
  const available = new Set(
    (await readdir(join(ICONS, "stroke")))
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.slice(0, -4))
  )

  const want = RANGE_COLS * RANGE_ROWS
  const picked = RANGE_LEAD.filter((n) => available.has(n)).slice(0, want)

  /*
    Top up by stepping through the rest rather than slicing, so the filler is
    spread over the alphabet instead of landing on ninety align- offsets.
    Container variants are sheet 2's subject, and stepping through them here
    puts whole rows of circle- and square- families on the grid, which reads as
    repetition rather than range. Base drawings only.
  */
  const rest = [...available]
    .sort()
    .filter((n) => !picked.includes(n) && !/^(square|circle)-/.test(n))
  const step = Math.max(1, Math.floor(rest.length / Math.max(1, want - picked.length)))
  for (let i = 0; picked.length < want && i < rest.length; i += step) picked.push(rest[i])

  let cells = ""
  for (const name of picked) cells += `<div class="c">${await glyph("stroke", name, 60)}</div>`

  return {
    name: "3-range",
    html: shell(
      "#0a0a0a",
      "#fafafa",
      `<style>
        body{padding:64px 72px 56px}
        .head{margin-bottom:34px}
        p{opacity:.5}
        .grid{display:grid;grid-template-columns:repeat(${RANGE_COLS},1fr);
              grid-auto-rows:1fr;gap:10px;flex:1;min-height:0;
              border-top:2px solid #262626;padding-top:26px}
        .c{display:flex;align-items:center;justify-content:center}
        svg{display:block}
      </style>
      <div class="head">
        <h1>${total} icons on one 24 × 24 grid</h1>
        <p>Every drawing takes its colour from currentColor, so it inherits whatever is in scope.</p>
      </div>
      <div class="grid">${cells}</div>`
    ),
  }
}

/* ── sheet 4: a board with a job on it ─────────────────────────────────── */

async function sheetBoard() {
  const g = (n, size, colour) => inked("stroke", n, size, colour)
  const gf = (n, size, colour) => inked("fill", n, size, colour)

  const sticky = (x, y, w, h, fill, rot, inner) =>
    `<div class="abs sticky" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;` +
    `background:${fill};transform:rotate(${rot}deg)">${inner}</div>`

  const lane = (x, y, label, icon, colour) =>
    `<div class="abs" style="left:${x}px;top:${y}px;width:300px">` +
    `<div class="row" style="margin-bottom:16px">${icon}` +
    `<span style="font-size:26px;font-weight:600;color:${colour}">${label}</span></div>` +
    `<div style="height:3px;background:${colour};border-radius:2px;opacity:.35"></div></div>`

  // A hand-drawn connector, which is the thing a FigJam board always has.
  const arrow = (x, y, w, colour) =>
    `<svg class="abs" style="left:${x}px;top:${y}px" width="${w}" height="30" viewBox="0 0 ${w} 30">` +
    `<path d="M2 15 C ${w * 0.35} 2, ${w * 0.6} 28, ${w - 16} 15" fill="none" ` +
    `stroke="${colour}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M${w - 22} 8 L${w - 6} 15 L${w - 22} 22" fill="none" stroke="${colour}" ` +
    `stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`

  const inner =
    `<div class="abs" style="left:88px;top:74px">` +
    `<h1>Icons that work on a whiteboard</h1>` +
    `<p class="sub">Search, click, recolour.</p></div>` +
    lane(88, 232, "Doing", await g("clock", 30, FJ.blue), FJ.blue) +
    lane(700, 232, "Blocked", await g("triangle-alert", 30, FJ.red), FJ.red) +
    lane(1312, 232, "Shipped", await g("circle-check", 30, FJ.green), FJ.green) +
    sticky(88, 330, 300, 232, FJ.sBlue, -1.2,
      `<div class="row">${await g("pen", 28, FJ.ink)}<span class="t">Redraw the empty state</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("user", 24, FJ.ink)}` +
      `<span style="font-size:19px">Zafar</span></div>`) +
    sticky(88, 594, 300, 232, FJ.sPurple, 0.9,
      `<div class="row">${await g("message", 28, FJ.ink)}<span class="t">Write the FAQ answers</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("clock", 24, FJ.ink)}` +
      `<span style="font-size:19px">Thursday</span></div>`) +
    sticky(700, 330, 300, 232, FJ.sPink, 1.4,
      `<div class="row">${await g("bell", 28, FJ.red)}<span class="t">Waiting on plugin review</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("question", 24, FJ.ink)}` +
      `<span style="font-size:19px">Two weeks?</span></div>`) +
    sticky(700, 594, 300, 232, FJ.sOrange, -0.8,
      `<div class="row">${await g("bookmark", 28, FJ.orange)}<span class="t">Six icons still to draw</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("pen", 24, FJ.ink)}` +
      `<span style="font-size:19px">From the migration</span></div>`) +
    sticky(1312, 330, 300, 232, FJ.sGreen, -1.5,
      `<div class="row">${await gf("circle-check", 28, FJ.green)}<span class="t">Packages on npm</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("check", 24, FJ.ink)}` +
      `<span style="font-size:19px">0.1.0</span></div>`) +
    sticky(1312, 594, 300, 232, FJ.sYellow, 1.1,
      `<div class="row">${await gf("circle-check", 28, FJ.green)}<span class="t">Figma file published</span></div>` +
      `<div class="row" style="margin-top:auto;opacity:.55">${await g("bookmark", 24, FJ.ink)}` +
      `<span style="font-size:19px">Community</span></div>`) +
    arrow(404, 415, 280, FJ.blue) +
    arrow(1016, 415, 280, FJ.green) +
    // A loose row of pills along the bottom, the way people label a board.
    `<div class="abs row" style="left:88px;top:912px;gap:18px">` +
    `<span class="pill">${await g("users", 24, FJ.purple)}Team</span>` +
    `<span class="pill">${await g("bookmark", 24, FJ.orange)}Backlog</span>` +
    `<span class="pill">${await g("bell", 24, FJ.red)}Blocked</span>` +
    `<span class="pill">${await gf("circle-check", 24, FJ.green)}Done</span>` +
    `<span class="pill">${await g("clock", 24, FJ.blue)}This week</span>` +
    `<span class="pill">${await g("message", 24, FJ.pink)}Feedback</span>` +
    `<span class="pill">${await g("arrow-right", 24, FJ.teal)}Next</span></div>`

  return { name: "4-figjam-board", html: board(inner) }
}

/* ── sheets 5 and 6: colour, and a colour per path ─────────────────────── */

const SWATCH = [FJ.red, FJ.orange, FJ.yellow, FJ.green, FJ.teal, FJ.blue, FJ.purple, FJ.pink]
const SWATCH_ICONS = ["bell", "heart", "star", "bookmark", "gift", "cloud", "sun", "package"]

/*
  Base plus badge, so the second colour has a real path to land on. A knockout
  is not a path: circle-check's tick is a hole in the disc rather than a shape
  over it, so it can only ever take one colour. It was in this row until the
  render came back with a white tick.
*/
const TWO_TONE = [
  ["gift", [FJ.red, FJ.yellow]],
  ["bell-check", [FJ.blue, FJ.green]],
  ["calendar-x", [FJ.purple, FJ.red]],
  ["calendar-plus", [FJ.orange, FJ.teal]],
  ["bell-x", [FJ.ink, FJ.red]],
  ["clock-check", [FJ.blue, FJ.green]],
  ["shopping-cart", [FJ.green, FJ.orange, FJ.green]],
  ["mail-plus", [FJ.pink, FJ.yellow]],
]

async function sheetColour() {
  const row = async (style) => {
    let out = ""
    for (const [i, n] of SWATCH_ICONS.entries()) {
      out += `<div class="cell">${await inked(style, n, 70, SWATCH[i])}</div>`
    }
    return out
  }

  let twoTone = ""
  for (const [name, colours] of TWO_TONE) {
    twoTone += `<div class="cell">${await perPath("fill", name, 70, colours)}</div>`
  }

  const sections = [
    ["stroke", await row("stroke")],
    ["duotone", await row("duotone")],
    ["fill", await row("fill")],
    ["a colour per path", twoTone],
  ]

  const inner =
    `<div class="abs" style="left:88px;top:70px">` +
    `<h1>Recolour it in FigJam</h1>` +
    `<p class="sub">Double-click into an icon and the paint lands on the drawing. ` +
    `Go one path deeper and every part takes its own.</p></div>` +
    `<div class="abs" style="left:88px;top:236px;width:1744px">` +
    sections
      .map(
        ([label, cells], i) =>
          `<div style="margin-bottom:${i === sections.length - 1 ? 0 : 30}px">` +
          `<div class="lab">${label}</div><div class="grid">${cells}</div></div>`
      )
      .join("") +
    `</div>`

  return {
    name: "5-figjam-colour",
    html: board(
      inner,
      `.lab{font-size:18px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;` +
        `opacity:.38;margin-bottom:12px}` +
        `.grid{display:grid;grid-template-columns:repeat(8,1fr);gap:10px}` +
        `.cell{background:#fff;border-radius:14px;height:104px;display:flex;` +
        `align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(0,0,0,.05)}`
    ),
  }
}

/*
  Placed by hand rather than on a grid, with a degree or two of rotation, so it
  reads as a board somebody left rather than a specimen sheet. Sheet 5 proves
  per-path colour across the set; this one shows what it looks like at size.
*/
const PLACED = [
  { n: "gift", c: [FJ.red, FJ.yellow], x: 132, y: 306, s: 190, r: -4 },
  { n: "bell-x", c: [FJ.ink, FJ.red], x: 392, y: 258, s: 150, r: 5 },
  { n: "clock-check", c: [FJ.blue, FJ.green], x: 618, y: 342, s: 172, r: -2 },
  { n: "mail-plus", c: [FJ.pink, FJ.yellow], x: 866, y: 262, s: 158, r: 6 },
  { n: "calendar-x", c: [FJ.purple, FJ.red], x: 1096, y: 340, s: 166, r: -5 },
  { n: "shopping-cart", c: [FJ.green, FJ.orange, FJ.green], x: 1338, y: 268, s: 178, r: 3 },
  { n: "bell-check", c: [FJ.blue, FJ.green], x: 1596, y: 340, s: 156, r: -3 },
  { n: "calendar-plus", c: [FJ.orange, FJ.teal], x: 176, y: 606, s: 164, r: 4 },
  { n: "folder-x", c: [FJ.teal, FJ.red], x: 424, y: 664, s: 156, r: -6 },
  { n: "file-plus", c: [FJ.purple, FJ.yellow], x: 664, y: 600, s: 168, r: 2 },
  { n: "clock-x", c: [FJ.pink, FJ.ink], x: 912, y: 668, s: 152, r: -4 },
  { n: "bell-plus", c: [FJ.yellow, FJ.blue], x: 1146, y: 604, s: 170, r: 5 },
  { n: "folder-check", c: [FJ.blue, FJ.green], x: 1394, y: 664, s: 158, r: -2 },
  { n: "calendar-check", c: [FJ.red, FJ.teal], x: 1626, y: 602, s: 164, r: 4 },
]

async function sheetTwoTone() {
  let placed = ""
  for (const p of PLACED) {
    placed +=
      `<div class="abs" style="left:${p.x}px;top:${p.y}px;transform:rotate(${p.r}deg)">` +
      `${await perPath("fill", p.n, p.s, p.c)}</div>`
  }

  const inner =
    `<div class="abs" style="left:88px;top:74px">` +
    `<h1>Two tones, one icon</h1>` +
    `<p class="sub">Every part of a drawing is its own path, so every part takes ` +
    `its own colour.</p></div>` +
    placed

  return { name: "6-figjam-two-tone", html: board(inner) }
}

/* ── rasterising ───────────────────────────────────────────────────────── */

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

async function shoot(chrome, name, html) {
  // Chrome screenshots a URL, so the page has to exist on disk for a moment.
  // Dotted so a crash between write and unlink leaves something obviously
  // temporary rather than a file that looks like output.
  const page = join(OUT, `.${name}.html`)
  const png = join(OUT, `${name}.png`)
  await writeFile(page, html, "utf8")
  try {
    await run(chrome, [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      `--screenshot=${png}`,
      `--window-size=${W},${H}`,
      `file://${page}`,
    ]).catch((e) => {
      // Chrome chatters on stderr about macOS task policy even on success.
      if (!existsSync(png)) throw e
    })
  } finally {
    await unlink(page).catch(() => {})
  }
  if (!existsSync(png)) throw new Error(`Chrome produced no PNG for ${name}`)

  const buf = await readFile(png)
  const [gotW, gotH] = [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  if (gotW !== W || gotH !== H) {
    throw new Error(`${name}.png: expected ${W}x${H}, Chrome gave ${gotW}x${gotH}`)
  }
  console.log(`Wrote previews/community/${name}.png (${W}×${H})`)
}

/* ── main ──────────────────────────────────────────────────────────────── */

const total = (await readdir(join(ICONS, "stroke"))).filter((f) => f.endsWith(".svg")).length

const sheets = [
  await sheetStyles(),
  await sheetContainers(),
  await sheetRange(total),
  await sheetBoard(),
  await sheetColour(),
  await sheetTwoTone(),
]

if (missing.size) {
  console.error(`${c(31, "Named on a sheet, not in icons/:")}`)
  for (const name of [...missing].sort()) console.error(`  ${name}`)
  console.error(
    `\n${missing.size} name(s) a carousel sheet asks for no longer exist. Either the\n` +
      `drawing was renamed, in which case update this file, or it was removed and\n` +
      `the sheet needs a different icon in its place.`
  )
  process.exit(1)
}

if (check) {
  console.log(
    c(32, `previews/community/ composes from icons/ (${sheets.length} sheets, ${used.size} references)`)
  )
  console.log(`  ${sheets.map((s) => s.name).join(", ")}`)
} else {
  await mkdir(OUT, { recursive: true })
  const chrome = findChrome()
  for (const { name, html } of sheets) await shoot(chrome, name, html)
  console.log(`${sheets.length} sheets, ${used.size} icon references, ${total} icons in the set`)
}
