#!/usr/bin/env node
/**
 * Verify that the demo pages only name icons the set actually ships.
 *
 *   node pipeline/check-demos.mjs [--json]
 *
 * Each demo declares the glyphs it is allowed to draw as a literal array —
 * `MOBILE_ICON_NAMES` — and types its screen data against
 * that union. TypeScript therefore already guarantees that every *use* site
 * matches the list. What it cannot know is whether the list matches `icons/`,
 * because those are strings resolved against the filesystem at render time.
 * That gap is what this checks, and it is the one a rename opens.
 *
 * Two failures, for two different reasons:
 *
 *   UNKNOWN   the name is not in the set at all. `pickMobileIcons` throws on
 *             this, so the page 500s — loud, but only once someone opens it.
 *
 *   NOSTROKE  the name exists but has no stroke drawing. Nothing catches this
 *             today: the demo icon components fall back to stroke when the
 *             selected style is missing (`art[style] ?? art.stroke`) and render
 *             `null` when that is missing too, so the icon silently disappears.
 *             Stroke is the base of every icon, which is what makes it a safe
 *             fallback and what makes its absence a bug rather than a gap.
 *
 * A rename is the expected cause of both, so a failure reports the candidate it
 * was most likely renamed to — same tokens, different order or spelling.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const LIB = join(ROOT, 'lib');
const STYLES = ['stroke', 'duotone', 'fill'];
const json = process.argv.includes('--json');

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

/** Every `export const <NAME>_ICON_NAMES = [...] as const` under lib/. */
async function findLists() {
  const lists = [];
  for (const file of (await readdir(LIB)).filter((f) => f.endsWith('.ts')).sort()) {
    const src = await readFile(join(LIB, file), 'utf8');
    for (const decl of src.matchAll(/export const (\w+_ICON_NAMES)\s*=\s*\[/g)) {
      const open = decl.index + decl[0].length - 1;
      const close = src.indexOf(']', open);
      const tail = src.slice(close, close + 20);
      // Declared without `as const` the type widens to string[], the screen data
      // stops being checked against it, and this file becomes the only guard.
      if (!/^\]\s*as const/.test(tail)) {
        lists.push({ file, name: decl[1], names: null });
        continue;
      }
      const names = [...src.slice(open, close).matchAll(/"([^"]+)"/g)].map((m) => m[1]);
      lists.push({ file, name: decl[1], names });
    }
  }
  return lists;
}

async function loadSet() {
  const styles = new Map();      // name -> Set(style)
  for (const style of STYLES) {
    const dir = join(ICONS, style);
    if (!existsSync(dir)) continue;
    for (const f of (await readdir(dir)).filter((f) => f.endsWith('.svg'))) {
      const name = f.replace(/\.svg$/, '');
      if (!styles.has(name)) styles.set(name, new Set());
      styles.get(name).add(style);
    }
  }
  return styles;
}

/** Closest name in the set, for the rename that almost certainly caused this. */
function suggest(name, set) {
  const key = (s) => s.split('-').sort().join('-');
  const target = key(name);
  const sameTokens = [...set.keys()].filter((n) => key(n) === target);
  if (sameTokens.length) return sameTokens;
  // Fall back to the longest shared prefix, which catches a dropped or added word.
  const parts = name.split('-');
  for (let take = parts.length - 1; take >= 2; take--) {
    const prefix = parts.slice(0, take).join('-');
    const hits = [...set.keys()].filter((n) => n.startsWith(prefix));
    if (hits.length && hits.length <= 6) return hits;
  }
  return [];
}

async function main() {
  if (!existsSync(ICONS)) {
    console.error(`No icons/ directory at ${ICONS} — run: node pipeline/build.mjs`);
    process.exit(1);
  }

  const set = await loadSet();
  const lists = await findLists();
  const problems = [];
  let checked = 0;

  for (const { file, name: listName, names } of lists) {
    if (names === null) {
      problems.push({
        kind: 'NOTCONST', list: `${file}:${listName}`, icon: '',
        why: 'array is not declared `as const`, so the screen data is no longer type-checked against it',
      });
      continue;
    }
    for (const icon of names) {
      checked++;
      const have = set.get(icon);
      if (!have) {
        const near = suggest(icon, set);
        problems.push({
          kind: 'UNKNOWN', list: `${file}:${listName}`, icon,
          why: near.length ? `not in the set — did you mean ${near.join(', ')}?` : 'not in the set',
        });
      } else if (!have.has('stroke')) {
        problems.push({
          kind: 'NOSTROKE', list: `${file}:${listName}`, icon,
          why: `only ${[...have].sort().join(', ')} — stroke is the fallback, so this renders nothing`,
        });
      }
    }
  }

  if (json) {
    console.log(JSON.stringify({ lists: lists.length, checked, problems }, null, 2));
    process.exit(problems.length ? 1 : 0);
  }

  if (!lists.length) {
    console.error(`${c(33, 'WARN')} no *_ICON_NAMES lists found under lib/ — is this check still wired to anything?`);
  }

  for (const p of problems) {
    console.error(`  ${c(31, p.kind.padEnd(8))} ${p.icon || p.list}  ${p.why}`);
    if (p.icon) console.error(`  ${' '.repeat(8)} ${c(90, p.list)}`);
  }

  if (problems.length) {
    console.error(`\n${problems.length} broken demo reference(s) across ${lists.length} list(s).`);
    process.exit(1);
  }

  const summary = lists.map((l) => `${l.name} ${l.names.length}`).join(' · ');
  console.log(c(32, `Demo icon references all resolve (${checked} across ${lists.length} lists)`));
  console.log(`  ${summary}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
