/**
 * Before beside after, and the two laid over each other, at one zoom.
 *
 *   node tools/v8/compare.mjs <oldRoot> <out.html> <name ...>
 *
 * The overlay is the figure that carries a redraw: what both drawings paint
 * goes dark, what only one of them paints keeps its own ink, and nothing is
 * nudged, so a coincidence in the picture is a coincidence in the geometry.
 * Blue is what shipped, green is what replaces it.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const [oldRoot, out, ...names] = process.argv.slice(2)
const HERE = new URL("../../", import.meta.url).pathname

const read = (root, style, name) => {
  const p = join(root, "icons", style, `${name}.svg`)
  return existsSync(p) ? readFileSync(p, "utf8") : null
}
/* The paint lives on the root element and the paths inherit it, so a sheet that
   lifts the paths out and drops them in its own <svg> renders only the filled
   layers. Carry the root's attributes across; see the skill's own entry. */
const openTag = (svg) =>
  svg
    .match(/<svg[^>]*>/)[0]
    .replace(/\s(width|height|xmlns|viewBox)="[^"]*"/g, "")
    .replace(/^<svg/, "")
    .replace(/>$/, "")
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "")
const draw = (svg, size, tint) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24"${openTag(svg)}${tint ? ` style="color:${tint}"` : ""}>${inner(svg)}</svg>`

const STYLES = ["stroke", "duotone", "fill", "sharp/stroke", "sharp/fill"]

const rows = names.flatMap((name) =>
  STYLES.map((style) => {
    const a = read(oldRoot, style, name)
    const b = read(HERE, style, name)
    if (!a || !b) return ""
    const cell = (h, body) => `<div class="c">${body}<div class="l">${h}</div></div>`
    return `<div class="row"><div class="n">${name}<br><span>${style}</span></div><div class="cells">
      ${cell("shipped", draw(a, 96))}
      ${cell("redrawn", draw(b, 96))}
      ${cell("over each other", `<div class="ov">${draw(a, 96, "#2563eb")}${draw(b, 96, "#059669")}</div>`)}
      ${cell("24", draw(b, 24))}${cell("16", draw(b, 16))}
      ${cell("was 24", draw(a, 24))}${cell("was 16", draw(a, 16))}
    </div></div>`
  })
)

writeFileSync(
  out,
  `<style>
  body{font:11px/1.4 ui-sans-serif,system-ui;background:#fff;margin:0;padding:16px;color:#111}
  .row{display:flex;align-items:center;gap:20px;padding:10px 12px;border-bottom:1px solid #eee}
  .n{width:130px;font-weight:600}.n span{font-weight:400;color:#888}
  .cells{display:flex;gap:22px;align-items:flex-end}
  .c{text-align:center}.l{color:#888;margin-top:4px}
  .ov{position:relative;width:96px;height:96px;background:#f7f7f7;isolation:isolate}
  .ov svg{position:absolute;inset:0}.ov svg:last-child{mix-blend-mode:multiply}
  </style>${rows.join("")}`
)
console.log(`  wrote ${out}, ${rows.filter(Boolean).length} rows`)
