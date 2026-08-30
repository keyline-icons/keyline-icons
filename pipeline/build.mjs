#!/usr/bin/env node
/**
 * raw/<style>/<name>.svg  ->  icons/<style>/<name>.svg
 * raw/<set>/Container=…, Style=…, Corners=sharp.svg  ->  icons/sharp/<style>/<name>.svg
 *
 * Normalizes every Figma export: strips export cruft, swaps hardcoded paint for
 * currentColor, and hoists stroke/cap/join onto the root so consumers can drive
 * strokeWidth from one attribute.
 *
 *   node pipeline/build.mjs [--check]
 *
 * --check writes nothing and exits non-zero if output would differ, so CI can
 * prove icons/ is in sync with raw/.
 */

import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { normalize } from './lib/svg.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const RAW = join(ROOT, 'raw');
const OUT = join(ROOT, 'icons');
const STYLES = ['stroke', 'duotone', 'fill'];

/**
 * The corner treatments, and where each one lands.
 *
 * `regular` keeps `icons/<style>/<name>.svg` exactly as it has always been, so
 * every consumer's imports, the registry routes and the React export names go on
 * meaning what they meant. Sharp gets its own namespace underneath rather than a
 * `-sharp` suffix on the name: the set's naming rule is `[element]-[modifier]`,
 * and a corner treatment is neither, so a suffix would make the name lie about
 * what the drawing is.
 *
 * The cap is the treatment, not a detail of it. Sharp is the rounded drawing
 * with its fillets removed and its caps squared, and the geometry carries only
 * the first half of that: hoist a round cap onto a sharp drawing and it ships as
 * something between the two, with nothing in the file to say so.
 */
const CORNERS = ['regular', 'sharp'];
const LINECAP = { regular: 'round', sharp: 'butt' };
const outDir = (corners, style) =>
  corners === 'regular' ? join(OUT, style) : join(OUT, corners, style);

const check = process.argv.includes('--check');

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

async function listSvgs(dir) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir)).filter((f) => f.endsWith('.svg')).sort();
}

const PREFIX = { regular: '', square: 'square-', circle: 'circle-' };

/**
 * Discover input icons. Two layouts are accepted:
 *
 *   raw/<style>/<name>.svg
 *     Hand-curated. One folder per style.
 *
 *   raw/<set-name>/Container=<c>, Style=<s>.svg
 *     What Figma writes when you select the Components page and export as SVG.
 *     Component-set variants export as one folder per set, with the variant
 *     properties as the filename — so the icon name comes from the folder and
 *     the container/style from the file. Reading this directly means the export
 *     is a single action in Figma with no renaming step.
 */
async function discover() {
  const found = [];
  const rejected = [];
  const entries = await readdir(RAW, { withFileTypes: true });

  for (const e of entries) {
    if (!e.isDirectory()) continue;

    if (STYLES.includes(e.name)) {
      for (const file of await listSvgs(join(RAW, e.name))) {
        found.push({ corners: 'regular', style: e.name, name: file.replace(/\.svg$/, ''), src: join(RAW, e.name, file) });
      }
      continue;
    }

    // Figma component-set export: the folder is the icon, files are variants.
    //
    // A set missing its Container property exports as bare `Style=stroke.svg`.
    // Silently skipping those loses icons with no signal at all, so anything
    // unrecognised is reported rather than dropped — a missing icon is far
    // harder to notice than a failed build.
    for (const file of await listSvgs(join(RAW, e.name))) {
      // `, Corners=…` is optional, because a set that predates the axis exports
      // without it and a drawing with no treatment stated is the rounded one.
      const both = file.match(/Container=([\w-]+),\s*Style=([\w-]+)(?:,\s*Corners=([\w-]+))?\.svg$/i);
      const styleOnly = file.match(/^Style=([\w-]+)(?:,\s*Corners=([\w-]+))?\.svg$/i);

      const container = both ? both[1].toLowerCase() : 'regular';
      const style = (both ? both[2] : styleOnly ? styleOnly[1] : '').toLowerCase();
      const corners = ((both ? both[3] : styleOnly ? styleOnly[2] : '') || 'regular').toLowerCase();

      if (!style || !STYLES.includes(style) || PREFIX[container] === undefined
          || !CORNERS.includes(corners)) {
        rejected.push({
          file: join(e.name, file),
          why: !both && !styleOnly
            ? 'filename has no Style= property — is the component set missing its variant properties?'
            : !STYLES.includes(style) ? `unknown style "${style}"`
            : PREFIX[container] === undefined ? `unknown container "${container}"`
            : `unknown corner treatment "${corners}"`,
        });
        continue;
      }
      if (styleOnly) {
        rejected.push({
          file: join(e.name, file),
          why: `no Container= property — assuming "regular"; add a Container property to the set to be explicit`,
          warnOnly: true,
        });
      }
      found.push({ corners, style, name: PREFIX[container] + e.name, src: join(RAW, e.name, file) });
    }
  }
  return { found, rejected };
}

async function main() {
  if (!existsSync(RAW)) {
    console.error(`No raw/ directory at ${RAW}`);
    process.exit(1);
  }

  let written = 0, drift = 0, failed = 0;
  const built = [];

  const { found: inputs, rejected } = await discover();
  for (const r of rejected) {
    if (r.warnOnly) console.error(`  ${c(33, 'WARN')} ${r.file} — ${r.why}`);
    else { console.error(`  ${c(31, 'SKIP')} ${r.file} — ${r.why}`); failed++; }
  }
  const seen = new Map();
  if (!check)
    for (const corners of CORNERS)
      for (const style of STYLES) await mkdir(outDir(corners, style), { recursive: true });

  {
    for (const { corners, style, name, src: srcPath } of inputs) {
      const key = `${corners === 'regular' ? '' : corners + '/'}${style}/${name}`;
      if (seen.has(key)) {
        console.error(`  ${c(31, 'FAIL')} ${key} — defined twice (${seen.get(key)} and ${srcPath})`);
        failed++;
        continue;
      }
      seen.set(key, srcPath);

      const src = await readFile(srcPath, 'utf8');
      let out;
      try {
        out = normalize(src, { label: key, linecap: LINECAP[corners] });
      } catch (err) {
        console.error(`  ${c(31, 'FAIL')} ${key} — ${err.message}`);
        failed++;
        continue;
      }
      const dest = join(outDir(corners, style), `${name}.svg`);
      const prev = existsSync(dest) ? await readFile(dest, 'utf8') : null;
      if (prev !== out) {
        if (check) { console.error(`  ${c(33, 'DRIFT')} ${key}`); drift++; }
        else { await writeFile(dest, out); written++; }
      }
      built.push({ corners, style, name, bytes: out.length, before: src.length });
    }
  }

  if (failed) { console.error(`\n${failed} icon(s) failed to normalize.`); process.exit(1); }

  // raw/ is the source of truth, so anything in icons/ without a source is a
  // leftover. Writing is not enough on its own: a rename emits the new name and
  // abandons the old one, which then ships as a byte-identical duplicate of the
  // icon that replaced it. expand-dashed and expand-dashed-box did exactly that
  // and survived a full CI run, because nothing was looking.
  //
  // Swept per treatment, not per style: a sharp file whose source is gone is the
  // same leftover as a rounded one, and reading only `icons/<style>/` would have
  // left the whole sharp half unswept and looking maintained.
  const rel = (corners, style, file) =>
    `${corners === 'regular' ? '' : corners + '/'}${style}/${file}`;
  const expected = new Set(built.map((b) => rel(b.corners, b.style, `${b.name}.svg`)));
  const stale = [];
  for (const corners of CORNERS) {
    for (const style of STYLES) {
      const dir = outDir(corners, style);
      if (!existsSync(dir)) continue;
      for (const f of await readdir(dir))
        if (f.endsWith('.svg') && !expected.has(rel(corners, style, f))) stale.push(rel(corners, style, f));
    }
  }
  for (const s of stale) {
    if (check) { console.error(`  ${c(33, 'STALE')} ${s} — no source in raw/`); drift++; }
    else await rm(join(OUT, s));
  }

  if (check) {
    if (drift) { console.error(`\n${drift} file(s) out of sync — run: node pipeline/build.mjs`); process.exit(1); }
    console.log(c(32, `icons/ is in sync with raw/ (${built.length} files)`));
    return;
  }

  const before = built.reduce((a, b) => a + b.before, 0);
  const after = built.reduce((a, b) => a + b.bytes, 0);
  const byStyle = STYLES.map((s) => `${s} ${built.filter((b) => b.style === s).length}`).join(' · ');
  const byCorners = CORNERS.map((k) => `${k} ${built.filter((b) => b.corners === k).length}`).join(' · ');
  console.log(`Built ${built.length} icons  (${byStyle})  (${byCorners})`);
  console.log(`Wrote ${written} changed file(s) to icons/`);
  if (stale.length) console.log(`Removed ${stale.length} stale file(s) with no source in raw/`);
  const delta = Math.round((after / before - 1) * 100);
  console.log(`Size  ${before}B -> ${after}B  (${delta === 0 ? 'no change' : delta < 0 ? `${-delta}% smaller` : `${delta}% larger`})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
