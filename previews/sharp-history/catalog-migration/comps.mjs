// Emit use_figma code that adds the Corners axis to the Components page:
// every existing variant is renamed to carry `Corners=regular`, and a
// `Corners=sharp` sibling is built from previews/sharp-history/solved-*.
//   node comps.mjs plan             list batches (index, sets, payload size)
//   node comps.mjs batch <i>        emit the code for batch i
//   node comps.mjs emit <set...>    emit code for the named sets (pilot)
// Idempotent per set: a rename never doubles (guarded on 'Corners='), an
// existing sharp variant is skipped by name, so a dropped-socket retry is
// safe and a half-committed set is repaired rather than duplicated.
import { readFileSync } from 'node:fs';
import { compact } from '../scripts/encode.mjs';

const S = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const plan = JSON.parse(readFileSync(new URL('./plan.json', import.meta.url), 'utf8'));
const DIRS = { stroke: 'solved-mid', duotone: 'solved-duotone', fill: 'solved-fill' };

// Group the 585 rows by component set, keeping catalog order.
const sets = new Map();
for (const card of plan) for (const r of card.rows) {
  if (!sets.has(r.set)) sets.set(r.set, []);
  sets.get(r.set).push(r);
}

function specOf(setName) {
  const rows = sets.get(setName);
  if (!rows) throw new Error('no set ' + setName);
  const vars = [];
  for (const r of rows) for (const st of ['stroke', 'duotone', 'fill']) {
    if (!r.sharp[st]) continue;
    const svg = readFileSync(`${S}/${DIRS[st]}/${r.name}.svg`, 'utf8').replace(/\n\s*/g, '');
    vars.push({ c: r.container, st, pay: compact(svg) });
  }
  return { set: setName, vars };
}

const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };

function codeFor(specs) {
  const specsJson = JSON.stringify(specs);
  // Chunk the payload into short lines: the emitted file has to survive a
  // line-based read (long lines truncate at 2000 chars).
  const chunks = [];
  for (let i = 0; i < specsJson.length; i += 1500)
    chunks.push("'" + specsJson.slice(i, i + 1500).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'");
  const rawChunks = [];
  for (let i = 0; i < specsJson.length; i += 1500) rawChunks.push(specsJson.slice(i, i + 1500));
  const chunkHashes = rawChunks.map(fnv);
  return `const p = figma.root.children.find(n => n.name === 'Components');
if (figma.currentPage.id !== p.id) await figma.setCurrentPageAsync(p);
if (figma.currentPage.name !== 'Components') return 'wrong page: ' + figma.currentPage.name;
const _f = (function(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16)});
const CHUNKS = [
${chunks.join(',\n')}
];
const CH = ${JSON.stringify(chunkHashes)};
const bad = CHUNKS.map((c, i) => _f(c) === CH[i] ? null : i).filter(x => x !== null);
if (bad.length) return 'corrupted chunks: ' + bad.join(',');
const SPECS = JSON.parse(CHUNKS.join(''));
if (_f(JSON.stringify(SPECS)) !== '${fnv(specsJson)}') return 'SPECS corrupted in transit';
const HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">';
function svgOf(paths) {
  return HEAD + paths.map((p) => {
    const i = p.lastIndexOf('#'), d = p.slice(0, i), flags = p.slice(i + 1);
    const fo = /o([\\d.]+)/.exec(flags), so = /p([\\d.]+)/.exec(flags);
    let a = flags.includes('f') ? ' fill="#000000"' : ' fill="none"';
    if (flags.includes('e')) a += ' fill-rule="evenodd" clip-rule="evenodd"';
    if (fo) a += ' fill-opacity="' + fo[1] + '"';
    if (so) a += ' stroke-opacity="' + so[1] + '"';
    if (!flags.includes('s')) a += ' stroke="none"';
    return '<path d="' + d + '"' + a + '/>';
  }).join('') + '</svg>';
}
const rep = { sets: 0, renamed: 0, added: 0, skipped: 0, counts: [], miss: [], missReg: [], ids: [] };
for (const SP of SPECS) {
  const set = figma.currentPage.children.find(n => n.type === 'COMPONENT_SET' && n.name === SP.set);
  if (!set) { rep.miss.push(SP.set); continue; }
  for (const k of set.children) if (k.name.indexOf('Corners=') === -1) { k.name = k.name + ', Corners=regular'; rep.renamed++; }
  const have = new Set(set.children.map(k => k.name));
  const regs = set.children.filter(k => k.name.indexOf('Corners=regular') !== -1);
  if (!regs.length) throw new Error('no regular variants in ' + SP.set);
  const dy = Math.max(...regs.map(k => k.y)) + 48;
  for (const v of SP.vars) {
    const nm = 'Container=' + v.c + ', Style=' + v.st + ', Corners=sharp';
    if (have.has(nm)) { rep.skipped++; continue; }
    const reg = set.children.find(k => k.name === 'Container=' + v.c + ', Style=' + v.st + ', Corners=regular');
    if (!reg) { rep.missReg.push(SP.set + '/' + v.c + '/' + v.st); continue; }
    const art = figma.createNodeFromSvg(svgOf(v.pay));
    const c = figma.createComponent();
    c.resize(24, 24); c.clipsContent = false; c.fills = [];
    c.name = nm;
    for (const k of [...art.children]) {
      if (k.type !== 'VECTOR') throw new Error('non-vector ' + k.type + ' in ' + SP.set + '/' + v.c + '/' + v.st);
      const kx = k.x, ky = k.y;
      c.appendChild(k); k.x = kx; k.y = ky;
      k.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
      k.strokeAlign = 'CENTER';
      if (k.strokes.length) { k.strokeJoin = 'ROUND'; k.strokeCap = 'NONE'; }
      k.name = (k.fills !== figma.mixed && k.fills.length && k.fills.some(f => f.opacity !== undefined && f.opacity < 1)) ? 'Plate' : 'Vector';
    }
    art.remove();
    set.appendChild(c);
    c.x = reg.x; c.y = reg.y + dy;
    rep.added++; rep.ids.push(c.id);
  }
  const maxY = Math.max(...set.children.map(k => k.y));
  set.resize(set.width, maxY + 24 + 32);
  rep.sets++;
  rep.counts.push(SP.set + ':' + set.children.length);
}
return rep;`;
}

// Greedy-pack sets into batches whose emitted code stays under the cap.
const CAP = 24000;
const names = [...sets.keys()];
const batches = [];
{
  let cur = [], curLen = codeFor([]).length;
  for (const n of names) {
    const s = specOf(n);
    const len = JSON.stringify(s).length;
    if (cur.length && curLen + len > CAP) { batches.push(cur); cur = []; curLen = codeFor([]).length; }
    cur.push(n); curLen += len + 1;
  }
  if (cur.length) batches.push(cur);
}

const [mode, ...args] = process.argv.slice(2);
if (mode === 'plan') {
  batches.forEach((b, i) => {
    const specs = b.map(specOf);
    const vars = specs.reduce((a, s) => a + s.vars.length, 0);
    console.log(i, b.length + ' sets', vars + ' vars', codeFor(specs).length + ' chars', b[0] + ' .. ' + b[b.length - 1]);
  });
  const tot = names.map(specOf).reduce((a, s) => a + s.vars.length, 0);
  console.log('total', names.length, 'sets,', tot, 'sharp variants,', batches.length, 'batches');
} else if (mode === 'batch') {
  process.stdout.write(codeFor(batches[+args[0]].map(specOf)));
} else if (mode === 'emit') {
  process.stdout.write(codeFor(args.map(specOf)));
} else throw new Error('mode?');
