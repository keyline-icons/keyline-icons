#!/usr/bin/env node
/**
 * Split Figma component-set exports into per-variant files.
 *
 *   node pipeline/split-sets.mjs [--dry]
 *
 * Selecting the Components page in Figma and exporting SVG gives one file per
 * component *set* — a single canvas with every variant tiled in a grid — not one
 * file per variant. Exporting the variants individually isn't an option either:
 * every set contains a component named `Container=regular, Style=stroke`, so the
 * filenames would all collide.
 *
 * So the tiles get split here. Each variant occupies a 24x24 cell on a 48-unit
 * pitch, in the layout the conversion script wrote:
 *
 *     x: stroke | duotone | fill        (column)
 *     y: regular | square | circle      (row)
 *
 * Every path is assigned to a cell by its bounding box, its coordinates are
 * translated back to a 0 0 24 24 origin, and the result is written as
 * raw/<icon>/Container=<c>, Style=<s>.svg — the layout build.mjs already reads.
 *
 * The grid position tells us which variant a cell *should* be. The paint tells
 * us what it actually is. Those are checked against each other, because a silent
 * mismatch would file a drawing under the wrong style — the kind of error that
 * only surfaces once it's shipped.
 */

import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const RAW = join(ROOT, 'raw');
const PITCH = 48;
const CELL = 24;
const STYLE_BY_COL = ['stroke', 'duotone', 'fill'];
const CONTAINER_BY_ROW = ['regular', 'square', 'circle'];
const dry = process.argv.includes('--dry');

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

/** Split a `d` string into tokens, tagging each number as an x or y coordinate. */
const CMD_SHAPE = {
  M: 'xy', L: 'xy', T: 'xy', C: 'xyxyxy', S: 'xyxy', Q: 'xyxy',
  H: 'x', V: 'y', A: '....' + 'xy', Z: '',
};

function mapCoords(d, fn) {
  const out = [];
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  let cmd = 'M', slot = 0;
  for (const t of tokens) {
    if (/[a-z]/i.test(t)) {
      cmd = t; slot = 0; out.push(t); continue;
    }
    const upper = cmd.toUpperCase();
    const shape = CMD_SHAPE[upper] ?? '';
    const rel = cmd !== upper;
    const kind = shape.length ? shape[slot % shape.length] : '';
    slot++;
    // Relative segments describe deltas, so translation must not touch them.
    // Only the leading absolute moveto of a relative run needs shifting, and
    // Figma emits absolute commands throughout, so this stays simple.
    out.push(rel || kind === '.' || kind === '' ? t : String(fn(parseFloat(t), kind)));
  }
  // Re-join without spaces before commands, matching Figma's own formatting.
  let s = '';
  for (const t of out) s += (/[a-z]/i.test(t) ? t : (s && !/[a-z]/i.test(s.at(-1)) ? ' ' : '') + t);
  return s;
}

function bboxOf(d) {
  const nums = [];
  mapCoords(d, (v, k) => { nums.push([v, k]); return v; });
  const xs = nums.filter(([, k]) => k === 'x').map(([v]) => v);
  const ys = nums.filter(([, k]) => k === 'y').map(([v]) => v);
  if (!xs.length || !ys.length) return null;
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

/** What the paint says this cell is, independent of where it sits. */
function styleFromPaint(paths) {
  const muted = paths.some((p) => /(fill|stroke)-opacity="0?\.\d+"/.test(p.attrs));
  if (muted) return 'duotone';
  const hasStroke = paths.some((p) => /stroke="[^"]+"/.test(p.attrs) && !/stroke="none"/.test(p.attrs));
  const bigFill = paths.some((p) => {
    if (!/fill="(?!none)[^"]+"/.test(p.attrs)) return false;
    const bb = bboxOf(p.d);
    return bb && (bb[2] - bb[0]) * (bb[3] - bb[1]) >= 200;
  });
  if (bigFill && !hasStroke) return 'fill';
  return hasStroke ? 'stroke' : 'fill';
}

async function main() {
  const files = (await readdir(RAW)).filter((f) => f.endsWith('.svg'));
  if (!files.length) { console.log('No set-level SVGs in raw/ — nothing to split.'); return; }

  let split = 0, written = 0, skipped = 0;
  const mismatches = [];

  for (const file of files) {
    const name = file.slice(0, -4);
    const src = await readFile(join(RAW, file), 'utf8');
    const vb = src.match(/viewBox="([\d.\-\s]+)"/)?.[1].trim().split(/\s+/).map(Number);
    if (!vb) { console.error(`  ${c(31, 'SKIP')} ${file} — no viewBox`); skipped++; continue; }

    // Already a single icon? Leave it for build.mjs.
    if (vb[2] <= CELL + 1 && vb[3] <= CELL + 1) { skipped++; continue; }

    const paths = [...src.matchAll(/<path\b([^>]*?)\/?>/g)].map((m) => ({
      attrs: m[1],
      d: m[1].match(/\sd="([^"]+)"/)?.[1] ?? '',
    })).filter((p) => p.d);

    const cells = new Map();
    for (const p of paths) {
      const bb = bboxOf(p.d);
      if (!bb) continue;
      const col = Math.floor(((bb[0] + bb[2]) / 2) / PITCH);
      const row = Math.floor(((bb[1] + bb[3]) / 2) / PITCH);
      const key = `${col},${row}`;
      if (!cells.has(key)) cells.set(key, { col, row, paths: [] });
      cells.get(key).paths.push(p);
    }

    for (const { col, row, paths: cp } of cells.values()) {
      const style = STYLE_BY_COL[col];
      const container = CONTAINER_BY_ROW[row];
      if (!style || !container) {
        console.error(`  ${c(31, 'SKIP')} ${name} — path outside the grid at cell ${col},${row}`);
        skipped++;
        continue;
      }
      const actual = styleFromPaint(cp);
      if (actual !== style) mismatches.push({ icon: name, cell: `${col},${row}`, byPosition: style, byPaint: actual });

      const dx = col * PITCH, dy = row * PITCH;
      const body = cp
        .map((p) => {
          const shifted = mapCoords(p.d, (v, k) => {
            const n = k === 'x' ? v - dx : v - dy;
            return Math.abs(n - Math.round(n)) < 1e-9 ? Math.round(n) : +n.toFixed(4);
          });
          return '<path' + p.attrs.replace(/\sd="[^"]+"/, ` d="${shifted}"`) + '/>';
        })
        .join('\n');

      const out =
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n${body}\n</svg>\n`;
      if (!dry) {
        await mkdir(join(RAW, name), { recursive: true });
        await writeFile(join(RAW, name, `Container=${container}, Style=${style}.svg`), out);
      }
      written++;
    }
    if (!dry) await rm(join(RAW, file));
    split++;
  }

  console.log(`Split ${split} set export(s) into ${written} variant file(s)${dry ? ' (dry run)' : ''}`);
  if (skipped) console.log(`Skipped ${skipped}`);
  if (mismatches.length) {
    console.error(`\n${c(33, `${mismatches.length} cell(s) where the paint disagrees with the grid position:`)}`);
    for (const m of mismatches.slice(0, 20))
      console.error(`  ${m.icon} cell ${m.cell}: position says ${m.byPosition}, paint says ${m.byPaint}`);
    if (mismatches.length > 20) console.error(`  … and ${mismatches.length - 20} more`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
