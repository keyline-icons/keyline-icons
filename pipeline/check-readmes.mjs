#!/usr/bin/env node
/**
 * Verify that every count typed into a README matches what is in icons/.
 *
 *   node pipeline/check-readmes.mjs           # report drift, exit 1
 *   node pipeline/check-readmes.mjs --fix     # rewrite the numbers in place
 *   node pipeline/check-readmes.mjs --json    # machine-readable
 *
 * Why this exists: the set publishes to five surfaces and four of them count
 * for themselves. The site reads `loadIcons()` per request, the Figma cover and
 * the paper sheets are generated, and the Figma file is checked by
 * check-figma.mjs. The READMEs were the one place left where a number is prose,
 * and prose does not know when a drawing lands. They sat at 414 icons and 1,059
 * SVGs while the set grew past 500 — nothing failed, nothing warned, and the
 * first line of the repo's own front page was wrong for weeks.
 *
 * It is a check rather than a generator because a README is written, not built.
 * `--fix` substitutes the digits inside the sentence and leaves every word
 * alone, which is the whole difference: a generated README would let someone
 * "fix" a stale number by rewriting the paragraph around it.
 *
 * Adding a claim is one row in CLAIMS. The pattern needs exactly one capture
 * group around the number; everything else is shared.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const STYLES = ['stroke', 'duotone', 'fill'];

const fix = process.argv.includes('--fix');
const json = process.argv.includes('--json');
const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`;

/** Every count the READMEs are allowed to state, read off disk. */
function counts() {
  if (!existsSync(ICONS)) {
    console.error(`No icons/ directory at ${ICONS} — run: node pipeline/build.mjs`);
    process.exit(1);
  }

  const byStyle = {};
  const names = new Set();
  for (const style of STYLES) {
    const dir = join(ICONS, style);
    const files = existsSync(dir)
      ? readdirSync(dir).filter((f) => f.endsWith('.svg'))
      : [];
    byStyle[style] = files.length;
    for (const f of files) names.add(f.slice(0, -4));
  }

  /*
    A `square-`/`circle-` prefix only counts as a container when the base it
    names actually exists — the same rule `lib/icons.ts` applies, and the reason
    the numbers here are lower than a prefix count. `circle-half` is a shape in
    its own right; there is no `half` for it to contain.
  */
  const contained = (prefix) =>
    [...names].filter(
      (n) => n.startsWith(`${prefix}-`) && names.has(n.slice(prefix.length + 1))
    ).length;

  /*
    The number of names carrying searchable words, off the generated bundle
    rather than off `lib/icon-keywords.json`. The bundle is the merge of Figma's
    descriptions and the alias patterns, which is the number the listing quotes,
    and `build-data.mjs --check` already guards the bundle itself.
  */
  const bundle = join(ROOT, 'packages', 'figma-plugin', 'icons.json');
  const keywords = existsSync(bundle)
    ? Object.keys(JSON.parse(readFileSync(bundle, 'utf8')).keywords ?? {}).length
    : 0;

  return {
    keywords,
    icons: names.size,
    /* Component sets rather than names: a contained form lives inside its base
       set as a variant, so it is a name the site counts and not a set the Figma
       file holds. The file listing quotes this one and the plugin listing does
       not, which is why it only appears now. */
    sets: names.size - contained('square') - contained('circle'),
    files: STYLES.reduce((n, s) => n + byStyle[s], 0),
    stroke: byStyle.stroke,
    duotone: byStyle.duotone,
    fill: byStyle.fill,
    square: contained('square'),
    circle: contained('circle'),
  };
}

/**
 * What each README claims, as a pattern with one capture group around the
 * number and the key of the count it has to equal.
 *
 * Patterns are written against the sentence rather than the digits, so a claim
 * that is reworded fails loudly here instead of silently ceasing to be checked.
 */
const CLAIMS = [
  ['README.md', /\*\*([\d,]+) icons, drawn on one/, 'icons'],
  ['README.md', /\| `stroke` \| ([\d,]+) \|/, 'stroke'],
  ['README.md', /\| `duotone` \| ([\d,]+) \|/, 'duotone'],
  ['README.md', /\| `fill` \| ([\d,]+) \|/, 'fill'],
  ['README.md', /([\d,]+) SVGs in total/, 'files'],
  ['README.md', /([\d,]+) icons come in a `square-` form/, 'square'],
  ['README.md', /form and ([\d,]+) in a `circle-` form/, 'circle'],
  ['packages/react/README.md', /^([\d,]+) icons on one/m, 'icons'],
  ['packages/react/README.md', /\/\/ stroke, +([\d,]+) icons/, 'stroke'],
  ['packages/react/README.md', /\/\/ duotone, ([\d,]+) icons/, 'duotone'],
  ['packages/react/README.md', /\/\/ fill, +([\d,]+) icons/, 'fill'],
  /* This one was not here, and it went stale exactly as predicted: the plugin
     README said 484 names against an actual 503, and nothing caught it because
     nothing was looking. Every README that states a count belongs in this list,
     which is the whole argument the file opens with. `packages/mcp` and
     `packages/cli` state none, deliberately, and so have nothing to add. */
  ['packages/figma-plugin/README.md', /canvas\. ([\d,]+) names/, 'icons'],
  /* The Community listing copy. It is published prose on someone else's page
     and cannot be corrected without going back through the modal, which is
     exactly the reason it belongs here rather than in a scratch file. */
  ['packages/figma-plugin/LISTING.md', /^([\d,]+) icons in three styles/m, 'icons'],
  ['packages/figma-plugin/LISTING.md', /Search ([\d,]+) icons and drop/, 'icons'],
  ['packages/figma-plugin/LISTING.md', /stroke {4}([\d,]+) icons, 2px/, 'stroke'],
  ['packages/figma-plugin/LISTING.md', /duotone {3}([\d,]+) icons, a 40%/, 'duotone'],
  ['packages/figma-plugin/LISTING.md', /fill {6}([\d,]+) icons, solid/, 'fill'],
  ['packages/figma-plugin/LISTING.md', /([\d,]+) icons also come in a square- form/, 'square'],
  ['packages/figma-plugin/LISTING.md', /form and ([\d,]+) in a circle- form/, 'circle'],
  ['packages/figma-plugin/LISTING.md', /([\d,]+) icons carry curated words/, 'keywords'],
  /* The file's own listing, which is a second modal with its own prose. It went
     stale at 503 while the plugin's was current, because only the plugin's was
     written down and therefore only the plugin's was checked. */
  ['packages/figma-plugin/LISTING.md', /^([\d,]+) icons on a 24×24 grid/m, 'icons'],
  ['packages/figma-plugin/LISTING.md', /^([\d,]+) component sets, each with/m, 'sets'],
  ['packages/figma-plugin/LISTING.md', /without swapping components\. ([\d,]+) icons carry a square- form/, 'square'],
  ['packages/figma-plugin/LISTING.md', /square- form and ([\d,]+) a circle-/, 'circle'],
  ['packages/figma-plugin/LISTING.md', /three counts differ: stroke\n([\d,]+), duotone/, 'stroke'],
  ['packages/figma-plugin/LISTING.md', /, duotone ([\d,]+), fill/, 'duotone'],
  ['packages/figma-plugin/LISTING.md', /, fill ([\d,]+)\./, 'fill'],
];

/* The prose commas are part of the claim: "1,286 SVGs" reads as prose and
   "1286" reads as a serial number. Whichever the file already uses is what a
   fix writes back, so this never reformats someone's sentence. */
const format = (n, like) => (like.includes(',') ? n.toLocaleString('en-US') : String(n));

function main() {
  const want = counts();
  const problems = [];
  const edits = new Map();

  for (const [file, pattern, key] of CLAIMS) {
    const path = join(ROOT, file);
    const text = edits.get(file) ?? readFileSync(path, 'utf8');
    const m = text.match(pattern);

    if (!m) {
      problems.push({ file, key, kind: 'MISSING', why: `no line matching ${pattern}` });
      continue;
    }

    const found = m[1];
    if (Number(found.replace(/,/g, '')) === want[key]) continue;

    problems.push({
      file,
      key,
      kind: 'STALE',
      why: `says ${found}, icons/ has ${want[key]}`,
    });

    if (fix) {
      const next = m[0].replace(found, format(want[key], found));
      edits.set(file, text.replace(m[0], next));
    }
  }

  if (fix) {
    for (const [file, text] of edits) writeFileSync(join(ROOT, file), text);
  }

  if (json) {
    console.log(JSON.stringify({ counts: want, problems, fixed: fix }, null, 2));
    process.exit(problems.length && !fix ? 1 : 0);
  }

  const stale = problems.filter((p) => p.kind === 'STALE');

  if (fix && stale.length) {
    for (const p of stale) console.log(`  ${c(32, 'FIXED'.padEnd(8))} ${p.file}  ${p.why}`);
  }

  for (const p of problems.filter((p) => p.kind === 'MISSING' || !fix)) {
    console.error(`  ${c(31, p.kind.padEnd(8))} ${p.file}  ${p.why}`);
  }

  /* A MISSING claim fails even under --fix. There is nothing to substitute
     into, and a check that quietly stops checking is worse than a wrong
     number: the sentence was reworded and this file has to follow it. */
  const missing = problems.filter((p) => p.kind === 'MISSING');
  if (missing.length || (!fix && problems.length)) {
    console.error(
      `\n${problems.length} stale or missing count(s) across ${new Set(CLAIMS.map((c) => c[0])).size} README(s).` +
        (missing.length ? '' : `\nRun: node pipeline/check-readmes.mjs --fix`)
    );
    process.exit(1);
  }

  const summary = `${want.icons} icons · ${want.files} SVGs · stroke ${want.stroke}, duotone ${want.duotone}, fill ${want.fill} · ${want.square} square, ${want.circle} circle`;
  console.log(
    c(32, fix && stale.length
      ? `READMEs updated (${stale.length} count(s))`
      : `READMEs agree with icons/ (${CLAIMS.length} counts)`)
  );
  console.log(`  ${summary}`);
}

main();
