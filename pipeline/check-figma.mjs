#!/usr/bin/env node
/**
 * Compares the Figma file against raw/.
 *
 *   node pipeline/check-figma.mjs --emit          # print the snippet to run in Figma
 *   node pipeline/check-figma.mjs digest.txt      # diff Figma's answer against raw/
 *   node pipeline/check-figma.mjs < digest.txt    # same, from stdin
 *
 * The set no longer fits in one plugin return, so the snippet comes back with a
 * trailing `#NEXT=<name>`. Put that name in its `AFTER` and run it again, and
 * append each run's output to the same file. See RESUMING below.
 *
 * Why this exists: lint.mjs reads icons/, so a defect that lives only in the
 * design file passes every check we have. Twelve smartphone-<modifier> fill
 * variants once sat in Figma with the modifier layer missing — twelve identical
 * blank phones in the catalogue — while raw/ and icons/ had the arrows and ticks
 * the whole time. Nothing flagged it; someone happened to look.
 *
 * This cannot reach Figma on its own, so it runs in two steps: --emit prints a
 * snippet you run through the Figma plugin API, and that snippet's output comes
 * back here to be diffed. That also keeps it out of CI, which has no Figma.
 *
 * WHAT IT COMPARES
 *
 * A segment-set signature: for each variant, every segment the geometry draws —
 * with its Bezier control points — bucketed by paint, deduplicated, sorted, and
 * hashed. See pathEdges below for how a segment is written.
 *
 * This replaced a digest of layer count, subpath count, and outer bounds. That
 * digest missed 176 drifted variants, because all three quantities can stay put
 * while the drawing changes:
 *
 *  - git-check's duotone stored the ring at r=4, the plate's radius, instead of
 *    the r=3 centreline. Same outer bounds as the plate beside it, so the box
 *    matched. Painted, the ring overshot the plate and the stem's cap landed
 *    inside the muted fill as a black notch.
 *  - git-commit-horizontal's duotone kept both side bars in its geometry but
 *    carried strokeAlign INSIDE, which paints nothing on an open subpath. Layer
 *    count, subpath count and bounds were all unchanged; the bars were invisible.
 *
 * A signature over the actual geometry catches both. It has to ignore the four
 * ways Figma and raw/ disagree without meaning anything, and each of these cost a
 * false-positive round to find:
 *
 *  - DIRECTION. Figma may store a segment end-to-start. Each segment is written
 *    in one canonical spelling, so which end it started from cannot register.
 *  - GROUPING. Figma's vector network splits polylines at shared vertices, and
 *    build merges sibling layers. Segments are pooled per paint bucket rather
 *    than per subpath or per layer, so neither shows up.
 *  - FLOAT32. Figma stores 11.995 as 11.994999885. Rounding to 0.1 puts both on
 *    the same value; rounding to 0.01 does not, because they straddle a boundary.
 *  - DUPLICATES. raw/ often closes a shape with `V<y>Z`, a run back to the start
 *    that Figma leaves to Z. A set that ignores duplicates makes the two agree.
 *
 * What it deliberately does NOT ignore is connectivity. An earlier version
 * compared bare point sets and gave all four of file-arrow-{up,down,left,right}
 * the same signature — same four vertices, different joins — so an arrow pointing
 * the wrong way would have passed. Segments keep that distinction.
 *
 * Paint buckets are keyed by what is painted, not by how it is layered: raw/
 * writes "fill and stroke this path" as one <path fill stroke>, where Figma may
 * stack a fill layer and a stroke layer over the same geometry. A path carrying
 * both contributes its segments to both buckets, so the two spellings agree.
 *
 * Stroke weight is part of the bucket key, so a weight change is a hash change.
 *
 * Also reported, separately: any stroked layer whose strokeAlign is not CENTER.
 * SVG strokes are always centred, so anything else renders in Figma differently
 * from what ships — and, on an open subpath, INSIDE renders as nothing at all.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathBBox } from './lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const RAW = join(ROOT, 'raw');

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

/**
 * Variant names, abbreviated.
 *
 * The plugin bridge truncates a long return value, and spelling out
 * "Container=regular, Style=stroke" 561 times overruns it by itself. Two letters
 * carry the same information. Anything outside these tables is emitted verbatim
 * so a new container or style shows up as a mismatch rather than being folded
 * silently into the wrong bucket.
 */
const CONTAINERS = { regular: 'r', circle: 'c', square: 'q' };
const STYLES = { stroke: 's', duotone: 'd', fill: 'f' };
/* `h` for sharp: `s` is already the stroke style, and a tag whose letters mean
   different things in different columns is unreadable in a digest. */
const CORNERS = { regular: 'r', sharp: 'h' };

/* `Corners=` is optional so a set that predates the axis still tags, and the
   style is `[^,]+` rather than `.+` so it cannot swallow the third property:
   greedy, `Style=(.+)` captured `stroke, Corners=regular`, missed the table and
   emitted the whole variant name verbatim — which is correct output and blows
   the payload budget these two-letter tags exist to stay inside. */
const VARIANT = /^Container=([^,]+), Style=([^,]+)(?:, Corners=(.+))?$/;

const tagOf = (variant) => {
  const m = variant.match(VARIANT);
  if (!m) return variant;
  const ct = CONTAINERS[m[1]], st = STYLES[m[2]], kt = CORNERS[m[3] ?? 'regular'];
  return ct && st && kt ? ct + st + kt : variant;
};
const untag = (tag) => {
  const ct = Object.keys(CONTAINERS).find((k) => CONTAINERS[k] === tag[0]);
  const st = Object.keys(STYLES).find((k) => STYLES[k] === tag[1]);
  const kt = Object.keys(CORNERS).find((k) => CORNERS[k] === tag[2]);
  return tag.length === 3 && ct && st && kt
    ? `${ct}/${st}${kt === 'sharp' ? '/sharp' : ''}`
    : tag;
};

/**
 * Every segment a path draws, as a canonical string, at 0.1 resolution.
 *
 * Segments rather than points, because a point set cannot tell an up arrow from
 * a down one: `M17 14V20M14 17L17 20L20 17` and `M17 20V14M14 17L17 14L20 17`
 * touch the same four vertices and differ only in what joins to what.
 *
 * Each segment is written the same way whichever end it was drawn from — the
 * lexicographically smaller of its two spellings — so direction cannot register
 * while connectivity still does. Control points are part of the spelling: two
 * arcs can share endpoints and bulge differently, and only the controls say so.
 *
 * Z emits the closing segment explicitly, which is how raw/ and Figma end up
 * agreeing: raw/ often writes that closing run as a real `V<y>Z`, and Figma
 * drops it as redundant. One spells it, the other implies it, and both land on
 * the same segment in a set that ignores duplicates.
 *
 * Shared verbatim with the Figma snippet below — the two must agree exactly or
 * every variant reports drift, so change them together.
 */
const POINTS_FN = `function pathEdges(d) {
  const toks = d.match(/[MLCZHV]|-?\\d*\\.?\\d+(?:e-?\\d+)?/gi) || [];
  let i = 0, cmd = null, cur = [0, 0], start = [0, 0];
  const out = new Set();
  const n = () => parseFloat(toks[i++]);
  const r = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const s = (q) => r(q[0]) + "," + r(q[1]);
  // one spelling per segment, whichever end it was drawn from
  const edge = (pts) => {
    if (pts.length < 2) return;
    const f = pts.map(s).join(" "), b = [...pts].reverse().map(s).join(" ");
    if (f !== b) out.add(f < b ? f : b);
  };
  while (i < toks.length) {
    if (/^[MLCZHV]$/i.test(toks[i])) cmd = toks[i++].toUpperCase();
    if (cmd === "M") { cur = [n(), n()]; start = cur; cmd = "L"; }
    else if (cmd === "L") { const p = [n(), n()]; edge([cur, p]); cur = p; }
    else if (cmd === "H") { const p = [n(), cur[1]]; edge([cur, p]); cur = p; }
    else if (cmd === "V") { const p = [cur[0], n()]; edge([cur, p]); cur = p; }
    else if (cmd === "C") { const a = [n(), n()], b = [n(), n()], e = [n(), n()]; edge([cur, a, b, e]); cur = e; }
    else if (cmd === "Z") { edge([cur, start]); cur = start; }
    else i++;
  }
  return out;
}
function hashBuckets(buckets) {
  const parts = Object.keys(buckets).sort().map(k => k + "#" + [...buckets[k]].sort().join(" "));
  const s = parts.join(";");
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
}`;

/**
 * The snippet to run through the Figma plugin API. One line per icon.
 *
 * Node geometry is stored relative to the node's own origin — assigning
 * vectorPaths re-bases it there — so points are shifted by x/y to land back in
 * the 24-grid the SVG uses.
 *
 * The shift regex has to accept scientific notation, because a coordinate that
 * re-bases to almost-but-not-quite zero is written that way. Without the
 * exponent group the match stops at the mantissa and leaves `e-7` behind, so
 * map's second subpath started at y = 5.5e-7 rather than y = 3 and both its
 * stroke and duotone reported drift against a raw/ that was correct all along.
 * Only two paths in the file are spelled this way, so it read as a real defect
 * in one icon rather than as a parsing bug.
 *
 * Bounds are reported only so a mismatch reads as something rather than a bare
 * "differs"; they are not what decides. They come from `absoluteRenderBounds`,
 * the actually-painted box, which needs no reasoning about stroke alignment.
 *
 * RESUMING
 *
 * The plugin bridge truncates a long return value, and the whole set no longer
 * fits in one. Abbreviating the variant tags bought room once and the set grew
 * past it again, so the snippet now stops before the limit rather than being
 * cut at it, and says where to pick up: the last line comes back as
 * `#NEXT=<name>`, which goes into `AFTER` for the next run. Concatenate the
 * runs in order and diff the result.
 *
 * That marker is load-bearing, not a convenience. A truncated digest looks
 * exactly like a file with a hundred icons deleted from it, and the failure is
 * loud and completely wrong. So a digest whose last line is still a `#NEXT=`
 * is refused here rather than diffed.
 */
const SNIPPET = `// Leave AFTER empty for the first run. Each run ends with #NEXT=<name>; put
// that name here and run again, until no #NEXT comes back.
const AFTER = "";
const BUDGET = 16000;

const CT = { regular: "r", circle: "c", square: "q" };
const ST = { stroke: "s", duotone: "d", fill: "f" };
const KT = { regular: "r", sharp: "h" };
${POINTS_FN}
const p = figma.root.children.find(x => x.name === "Components");
await p.loadAsync();
// Sorted by name here rather than by row text at the end, so that "smartphone"
// and "smartphone-x" order the way AFTER compares them. Sorting the finished
// rows puts "smartphone=" after every "smartphone-", because "-" sorts under
// "=", and a resume marker taken from that order silently skips the base icon.
const sets = p.children.filter((n) => n.type === "COMPONENT_SET")
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
const rows = [];
let size = 0, next = null;
for (const s of sets) {
  if (AFTER && s.name <= AFTER) continue;
  const parts = [];
  for (const v of [...s.children].sort((a, b) => a.name.localeCompare(b.name))) {
    const m = v.name.match(/^Container=([^,]+), Style=([^,]+)(?:, Corners=(.+))?$/);
    const kn = m ? (m[3] || "regular") : "";
    const tag = m && CT[m[1]] && ST[m[2]] && KT[kn] ? CT[m[1]] + ST[m[2]] + KT[kn] : v.name;
    const buckets = {};
    let bad = 0, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const n of v.children) {
      if (n.type !== "VECTOR") continue;
      const hasF = n.fills.length > 0, hasS = n.strokes.length > 0;
      if (hasS && String(n.strokeAlign) !== "CENTER") bad = 1;
      const keys = [];
      if (hasF) keys.push("F" + Math.round((n.fills[0].opacity == null ? 1 : n.fills[0].opacity) * 10));
      if (hasS) keys.push("S" + (typeof n.strokeWeight === "number" ? n.strokeWeight : "?"));
      for (const q of n.vectorPaths) {
        const shifted = q.data.replace(/(-?\\d*\\.?\\d+(?:e-?\\d+)?)\\s+(-?\\d*\\.?\\d+(?:e-?\\d+)?)/gi, (_, a, b) => (+a + n.x) + " " + (+b + n.y));
        const pts = pathEdges(shifted);
        for (const k of keys) { buckets[k] = buckets[k] || new Set(); for (const t of pts) buckets[k].add(t); }
      }
      const b = n.absoluteRenderBounds;
      if (!b) continue;
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    }
    const box = x1 > -1e9 ? \`\${+(x1 - x0).toFixed(2)}x\${+(y1 - y0).toFixed(2)}\` : "empty";
    parts.push(\`\${tag}:\${hashBuckets(buckets)},\${box}\${bad ? ",!" : ""}\`);
  }
  const row = s.name + "=" + parts.join("|");
  // Always emit at least one row, or a single oversized icon stalls forever.
  if (rows.length && size + row.length + 1 > BUDGET) { next = rows[rows.length - 1].split("=")[0]; break; }
  rows.push(row); size += row.length + 1;
}
return rows.join("\\n") + (next ? "\\n#NEXT=" + next : "");`;

// The module's own copy of the shared functions, from the same source text.
const { pathEdges, hashBuckets } = (new Function(`${POINTS_FN}
return { pathEdges, hashBuckets };`))();

/** One variant's signature, measured the same way on both sides. */
function digestSvg(src) {
  const paths = [...src.matchAll(/<path\b([^>]*?)\/?>/g)].map((m) => m[1]);
  const buckets = {};
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, any = false;
  for (const attrs of paths) {
    const d = (attrs.match(/\sd="([^"]+)"/) || [])[1];
    if (!d) continue;
    any = true;
    const filled = /fill="(?!none)/.test(attrs);
    const stroked = /stroke="(?!none)/.test(attrs);
    const sw = parseFloat((attrs.match(/stroke-width="([\d.]+)"/) || [])[1] || (stroked ? 1 : 0));
    const keys = [];
    if (filled) {
      const fo = parseFloat((attrs.match(/fill-opacity="([\d.]+)"/) || [])[1] ?? '1');
      keys.push('F' + Math.round(fo * 10));
    }
    if (stroked) keys.push('S' + sw);
    const pts = pathEdges(d);
    for (const k of keys) {
      buckets[k] = buckets[k] || new Set();
      for (const t of pts) buckets[k].add(t);
    }
    // Ink reaches half a stroke width past the path; a fill stops at it.
    const pad = stroked ? sw / 2 : 0;
    const [a, b, cc, dd] = pathBBox(d);
    x0 = Math.min(x0, a - pad); y0 = Math.min(y0, b - pad);
    x1 = Math.max(x1, cc + pad); y1 = Math.max(y1, dd + pad);
  }
  return {
    hash: hashBuckets(buckets),
    w: any ? +(x1 - x0).toFixed(2) : null,
    h: any ? +(y1 - y0).toFixed(2) : null,
  };
}

async function readRaw() {
  const icons = new Map();
  for (const e of await readdir(RAW, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const files = (await readdir(join(RAW, e.name))).filter((f) => f.endsWith('.svg')).sort();
    const variants = new Map();
    for (const f of files)
      variants.set(tagOf(f.replace(/\.svg$/, '')), digestSvg(await readFile(join(RAW, e.name, f), 'utf8')));
    icons.set(e.name, variants);
  }
  return icons;
}

/** The resume marker a chunked run ended on, or null if the digest is whole. */
function pendingChunk(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const last = lines[lines.length - 1] ?? '';
  return last.startsWith('#NEXT=') ? last.slice('#NEXT='.length) : null;
}

/** Parses the snippet's output: one `name=variant:HASH,WxH[,!]|variant:...` per line. */
function parseFigma(text) {
  const icons = new Map();
  for (const line of text.split('\n').map((l) => l.trim()).filter(Boolean)) {
    if (line.startsWith('#')) continue; // resume markers, where chunks were concatenated
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const variants = new Map();
    for (const part of line.slice(eq + 1).split('|')) {
      const colon = part.lastIndexOf(':');
      if (colon < 0) continue;
      const [hash, box, flag] = part.slice(colon + 1).split(',');
      const [w, h] = box === 'empty' || box === undefined ? [null, null] : box.split('x').map(Number);
      variants.set(part.slice(0, colon), { hash, w, h, align: flag === '!' });
    }
    icons.set(line.slice(0, eq), variants);
  }
  return icons;
}

const findings = [];
const real = (icon, msg) => findings.push({ icon, msg });

async function main() {
  if (process.argv.includes('--emit')) {
    process.stdout.write(SNIPPET + '\n');
    return 0;
  }

  const usage = () => {
    console.error('Usage: check-figma.mjs --emit            print the snippet to run in Figma');
    console.error('       check-figma.mjs <digest-file>     diff its output against raw/');
    return 2;
  };
  const file = process.argv.slice(2).find((a) => !a.startsWith('--'));
  // stdin is a pipe under most runners even with nothing behind it, so an empty
  // read means "no input given", not "an empty digest".
  const text = file ? await readFile(file, 'utf8')
    : process.stdin.isTTY ? '' : await new Response(process.stdin).text();
  if (!text.trim()) return usage();

  // A part-digest diffs cleanly and reports every icon it never reached as
  // deleted from Figma, which is the most alarming possible way to say
  // "you have not finished pasting". Refuse it instead.
  const pending = pendingChunk(text);
  if (pending) {
    console.error(c(31, 'This digest stops partway through, at ' + pending + '.'));
    console.error(`Set AFTER = "${pending}" in the snippet, run it again, and append the result.`);
    return 2;
  }

  const rawIcons = await readRaw();
  const figIcons = parseFigma(text);
  if (!figIcons.size) {
    console.error('No digests parsed — that does not look like the --emit snippet\'s output.');
    return 2;
  }

  for (const name of [...new Set([...rawIcons.keys(), ...figIcons.keys()])].sort()) {
    const r = rawIcons.get(name), f = figIcons.get(name);
    if (!r) { real(name, 'in Figma but not in raw/ — never exported'); continue; }
    if (!f) { real(name, 'in raw/ but not in Figma — deleted from the file?'); continue; }
    for (const v of [...new Set([...r.keys(), ...f.keys()])].sort()) {
      const rv = r.get(v), fv = f.get(v), label = untag(v);
      if (!rv) { real(name, `${label} is in Figma but not in raw/`); continue; }
      if (!fv) { real(name, `${label} is in raw/ but not in Figma`); continue; }
      if (fv.align)
        real(name, `${label} has a stroke that is not centre-aligned — it will not render as it ships`);
      if (fv.hash !== rv.hash) {
        const box = fv.w !== null && rv.w !== null && (fv.w !== rv.w || fv.h !== rv.h)
          ? ` — covers ${fv.w}x${fv.h} in Figma, ${rv.w}x${rv.h} in raw/`
          : ' — same bounds, so look at the geometry inside';
        real(name, `${label} geometry differs from raw/${box}`);
      }
    }
  }

  const width = Math.max(0, ...findings.map((x) => x.icon.length));
  if (findings.length) {
    console.log(c(31, `\nDRIFT (${findings.length})`));
    for (const x of findings) console.log(`  ${x.icon.padEnd(width)}  ${x.msg}`);
  }

  const icons = new Set([...rawIcons.keys(), ...figIcons.keys()]).size;
  console.log(findings.length
    ? c(31, `\n${findings.length} difference(s) across ${icons} icons`)
    : c(32, `\nFigma matches raw/ across ${icons} icons`));
  return findings.length ? 1 : 0;
}

process.exit(await main());
