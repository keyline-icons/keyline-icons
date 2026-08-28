#!/usr/bin/env node
/**
 * icons/stroke/<name>.svg  ->  icons/sharp/<name>.svg      PROTOTYPE
 *
 * A sharp variant is the rounded drawing with its fillets taken out. The set's
 * corners are hand-solved beziers, not a join setting, so this is a geometry
 * rewrite: `references/drawing-a-new-icon.md` §7 gives the forward construction
 * (sharp polygon -> fillet), and this runs it backwards.
 *
 *   node pipeline/build-sharp.mjs [--caps=extend|butt|round] [--report]
 *
 * Nothing in `icons:ci` looks at `icons/sharp/` — `build.mjs` and `lint.mjs`
 * both walk a fixed `STYLES` list — so this writes into the real layout without
 * being able to break the shipping set. That also means it is unlinted: the
 * report below is the only check it has.
 *
 * Three things this deliberately does not do:
 *
 *   - It converts `stroke` only. `fill` and `duotone` are outlined strokes with
 *     their round caps and joins baked into the outline; taking those out needs
 *     the stroke outliner the repo does not have.
 *   - It leaves any cubic it cannot prove is a fillet. A fillet leaves its
 *     incoming line along that line's own direction and meets the outgoing one
 *     along that one; a circle, an arc or a chain of curves fails that test and
 *     is copied through untouched. Those files are reported, not silently
 *     half-converted.
 *   - It does not re-solve an extent. Removing a fillet pushes the vertex back
 *     out to where the two edges would have met, which on an acute corner is a
 *     long way — `triangle-alert` gains 2.7 units. The report names every file
 *     that grows, because that is a drawing decision, not a conversion.
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tokenize, pathBBox } from './lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const SRC = join(ROOT, 'icons', 'stroke');
const OUT = join(ROOT, 'icons', 'sharp');

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;
const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

/** Half the house stroke width: how far a round cap paints past its endpoint. */
const CAP = 1;
const EPS = 1e-9;

/* ---------------------------------------------------------------- geometry */

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / len(a));

/** Are two vectors parallel? Tolerance matches `roundedCorners()` in geom.mjs. */
function parallel(a, b) {
  const la = len(a), lb = len(b);
  return la > 1e-6 && lb > 1e-6 && Math.abs((a[0] * b[1] - a[1] * b[0]) / (la * lb)) < 1e-2;
}

/** Where the line through `p` along `u` crosses the line through `q` along `v`. */
function intersect(p, u, q, v) {
  const den = u[0] * v[1] - u[1] * v[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / den;
  return add(p, mul(u, t));
}

/**
 * Walk a `d` into subpaths of line and cubic segments.
 *
 * `Z` on a subpath whose pen is not already home gets the closing line spelled
 * out, so a fillet that straddles the start point has a segment on both sides
 * of it to read.
 */
function parse(d) {
  const runs = [];
  let segs = [], x = 0, y = 0, sx = 0, sy = 0, open = false;

  const flush = (closed) => {
    if (segs.length) runs.push({ segs, closed });
    segs = [];
  };

  for (const { cmd, args } of tokenize(d)) {
    const rel = cmd === cmd.toLowerCase(), U = cmd.toUpperCase();
    const ax = (i) => (rel ? x + args[i] : args[i]);
    const ay = (i) => (rel ? y + args[i] : args[i]);

    if (U === 'M') {
      flush(false);
      x = ax(0); y = ay(1); sx = x; sy = y; open = true;
    } else if (U === 'L' || U === 'H' || U === 'V') {
      const nx = U === 'V' ? x : U === 'H' ? (rel ? x + args[0] : args[0]) : ax(0);
      const ny = U === 'H' ? y : U === 'V' ? (rel ? y + args[0] : args[0]) : ay(1);
      segs.push({ type: 'line', p0: [x, y], p1: [nx, ny] });
      x = nx; y = ny;
    } else if (U === 'C') {
      const p3 = [ax(4), ay(5)];
      segs.push({ type: 'cubic', p0: [x, y], p1: [ax(0), ay(1)], p2: [ax(2), ay(3)], p3 });
      x = p3[0]; y = p3[1];
    } else if (U === 'Z') {
      if (Math.abs(x - sx) > EPS || Math.abs(y - sy) > EPS)
        segs.push({ type: 'line', p0: [x, y], p1: [sx, sy] });
      flush(true);
      x = sx; y = sy;
    } else {
      // S, Q, T, A. None of the exports carry them; refuse rather than guess.
      return null;
    }
  }
  if (open) flush(false);
  return runs;
}

/**
 * Take the fillets out of one subpath.
 *
 * A fillet is a cubic between two lines, tangent to both. Its two edges are
 * extended to the vertex they were cut from and the cubic goes away. Any other
 * cubic stays exactly where it is and is counted as `kept`.
 */
function defillet(run) {
  const { segs, closed } = run;
  let removed = 0, kept = 0;
  const vertices = [];

  for (let i = 0; i < segs.length; i++) {
    const cur = segs[i];
    if (cur.type !== 'cubic') continue;

    const before = (i - 1 + segs.length) % segs.length;
    const after = (i + 1) % segs.length;
    const prev = segs[before], next = segs[after];

    // On an open subpath the ends have no neighbour to extend into.
    const atEnd = !closed && (i === 0 || i === segs.length - 1);
    if (atEnd || !prev || !next || prev.type !== 'line' || next.type !== 'line') { kept++; continue; }

    const inDir = sub(cur.p1, cur.p0);
    const outDir = sub(cur.p3, cur.p2);
    if (!parallel(inDir, sub(prev.p1, prev.p0)) || !parallel(outDir, sub(next.p1, next.p0))) { kept++; continue; }

    const V = intersect(cur.p0, inDir, cur.p3, mul(outDir, -1));
    if (!V) { kept++; continue; }

    prev.p1 = V;
    next.p0 = V;
    cur.drop = true;
    vertices.push(V);
    removed++;
  }

  run.segs = segs.filter((s) => !s.drop);
  return { removed, kept, vertices };
}

/**
 * Butt caps paint to the endpoint; the round caps this set draws with paint a
 * unit past it. Swapping the cap without moving the endpoint shortens every
 * open stroke by a unit at each end, which shows up as `activity` no longer
 * reaching the 2..22 envelope. `extend` pushes each free end out along its own
 * tangent to keep the painted extents where the rounded drawing put them.
 */
function extendEnds(run) {
  if (run.closed || !run.segs.length) return;
  const first = run.segs[0], last = run.segs[run.segs.length - 1];

  if (first.type === 'line') first.p0 = add(first.p0, mul(unit(sub(first.p0, first.p1)), CAP));
  else first.p0 = add(first.p0, mul(unit(sub(first.p0, first.p1)), CAP));

  if (last.type === 'line') last.p1 = add(last.p1, mul(unit(sub(last.p1, last.p0)), CAP));
  else last.p3 = add(last.p3, mul(unit(sub(last.p3, last.p2)), CAP));
}

/* ---------------------------------------------------------------- emission */

const n = (v) => {
  const r = +v.toFixed(5);
  return Object.is(r, -0) ? '0' : String(r);
};
const pt = (p) => `${n(p[0])} ${n(p[1])}`;

function emit(runs) {
  const out = [];
  for (const { segs, closed } of runs) {
    if (!segs.length) continue;
    const start = segs[0].p0;
    let d = `M${pt(start)}`;
    let x = start[0], y = start[1];

    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      const last = i === segs.length - 1;
      if (s.type === 'line') {
        // A closing line back to the start is what `Z` already says.
        if (closed && last && Math.abs(s.p1[0] - start[0]) < EPS && Math.abs(s.p1[1] - start[1]) < EPS) break;
        if (Math.abs(s.p1[1] - y) < EPS) d += `H${n(s.p1[0])}`;
        else if (Math.abs(s.p1[0] - x) < EPS) d += `V${n(s.p1[1])}`;
        else d += `L${pt(s.p1)}`;
        x = s.p1[0]; y = s.p1[1];
      } else {
        d += `C${pt(s.p1)} ${pt(s.p2)} ${pt(s.p3)}`;
        x = s.p3[0]; y = s.p3[1];
      }
    }
    out.push(closed ? `${d}Z` : d);
  }
  return out;
}

/* -------------------------------------------------------------------- main */

async function main() {
  const caps = arg('caps', 'extend');
  if (!['extend', 'butt', 'round'].includes(caps)) {
    console.error(`unknown --caps=${caps} (extend, butt, round)`);
    process.exit(1);
  }
  if (!existsSync(SRC)) { console.error('no icons/stroke/'); process.exit(1); }
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) => f.endsWith('.svg')).sort();
  const report = { converted: [], untouched: [], curves: [], grew: [], refused: [] };

  for (const file of files) {
    const src = await readFile(join(SRC, file), 'utf8');
    let removed = 0, kept = 0, grew = 0, refused = false;

    const out = src.replace(/ d="([^"]+)"/g, (whole, d) => {
      const runs = parse(d);
      if (!runs) { refused = true; return whole; }
      const [bx0, by0, bx1, by1] = pathBBox(d);

      for (const run of runs) {
        const r = defillet(run);
        removed += r.removed;
        kept += r.kept;
        for (const V of r.vertices)
          grew = Math.max(grew, bx0 - V[0], V[0] - bx1, by0 - V[1], V[1] - by1, 0);
        if (caps === 'extend') extendEnds(run);
      }
      return ` d="${emit(runs).join('')}"`;
    });

    if (refused) { report.refused.push(file); continue; }

    const painted = caps === 'round' ? 'round' : 'butt';
    const final = out
      .replace(/stroke-linecap="round"/g, `stroke-linecap="${painted}"`)
      .replace(/stroke-linejoin="round"/g, 'stroke-linejoin="miter"');

    await writeFile(join(OUT, file), final);

    if (kept) report.curves.push([file, kept]);
    else if (removed) report.converted.push(file);
    else report.untouched.push(file);
    if (grew > 0.001) report.grew.push([file, +grew.toFixed(2)]);
  }

  const done = files.length - report.refused.length;
  console.log(`Wrote ${done} file(s) to icons/sharp/  (caps: ${caps})`);
  console.log(`  ${c(32, 'converted')}  ${report.converted.length} file(s) — every curve was a fillet, all of them gone`);
  console.log(`  ${c(32, 'untouched')}  ${report.untouched.length} file(s) — no curve to start with, already sharp`);
  console.log(`  ${c(33, 'curves')}     ${report.curves.length} file(s) carry a cubic that is not a fillet — needs eyes`);
  console.log(`  ${c(31, 'grew')}       ${report.grew.length} file(s) push a vertex outside the drawing's own bounds`);
  if (report.refused.length) console.log(`  ${c(31, 'refused')}    ${report.refused.join(', ')}`);

  if (process.argv.includes('--report')) {
    report.grew.sort((a, b) => b[1] - a[1]);
    console.log(`\nBounds growth, worst first:`);
    for (const [f, g] of report.grew) console.log(`  ${String(g).padStart(5)}  ${f}`);
    console.log(`\nCurves left in place (count per file):`);
    for (const [f, k] of report.curves) console.log(`  ${String(k).padStart(3)}  ${f}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
