// Re-push the artwork of EXISTING `Corners=sharp` variants after a drawing fix.
//   node repush.mjs [--styles=a,b] [--corners=regular] <name...>
//   node repush.mjs --check [--styles=a,b] [--corners=regular] <name...>
// --corners=regular pushes the ROUNDED drawings instead, read from raw/, into
// the Corners=regular variants (round caps and joins).
// --styles defaults to every style the icon has; name the ones that actually
// changed, so a fix to the outlines does not rewrite the stroke variants too.
// comps.mjs ADDS a sharp variant and skips one that is already there, so it
// cannot carry a correction. This replaces the children of the variant in
// place instead: the COMPONENT id survives, and every catalog cell pointing at
// it picks the new drawing up on its own.
//
// Idempotent, and safe to re-run after a dropped socket: a replace that has
// already landed is simply performed again. Same payload flags and same child
// treatment as comps.mjs — they must not drift.
import { readFileSync, existsSync } from 'node:fs';
import { compact } from '../scripts/encode.mjs';

const S = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const DIRS = { stroke: 'solved-mid', duotone: 'solved-duotone', fill: 'solved-fill' };
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const STYLES = (args.find((a) => a.startsWith('--styles=')) ?? '--styles=stroke,duotone,fill')
  .slice(9).split(',').filter(Boolean);
const CORNERS = (args.find((a) => a.startsWith('--corners=')) ?? '--corners=sharp').slice(10);
if (!['sharp', 'regular'].includes(CORNERS)) { console.error('bad --corners'); process.exit(1); }
const names = args.filter((a) => !a.startsWith('--'));
if (!names.length) { console.error('usage: node repush.mjs [--check] [--styles=a,b] <name...>'); process.exit(1); }

const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };

// An exported file name folds the container into the name — `circle-alert` is
// the `alert` SET at Container=circle, not a set of its own. Recover the pair
// from raw/, which is the only place the split is recorded.
const REPO = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons';
function setOf(name) {
  if (existsSync(`${REPO}/raw/${name}`)) return [name, 'regular'];
  for (const c of ['circle', 'square']) {
    const base = name.startsWith(c + '-') ? name.slice(c.length + 1) : null;
    if (base && existsSync(`${REPO}/raw/${base}`)) return [base, c];
  }
  return [name, 'regular'];
}

const specs = [];
for (const name of names) {
  const [set, c] = setOf(name);
  for (const st of STYLES) {
    const p = CORNERS === 'regular'
      ? `${REPO}/raw/${set}/Container=${c}, Style=${st}.svg`
      : `${S}/${DIRS[st]}/${name}.svg`;
    if (!existsSync(p)) continue;
    // raw/ files say fill="black" with a bare root; compact() keys stroked-ness
    // on a root stroke and colours on currentColor — normalise to the solved
    // files' shape before encoding.
    let src = readFileSync(p, 'utf8').replace(/\n\s*/g, '')
      .replace(/"black"/g, '"currentColor"');
    if (CORNERS === 'regular') {
      src = src.replace('<svg ', '<svg stroke="currentColor" ')
               .replace(/<path (?![^>]*stroke=)/g, '<path stroke="none" ');
    }
    specs.push({ set, c, st, pay: compact(src) });
  }
}

if (CHECK) {
  const code = (`const p = figma.root.children.find(n => n.name === 'Components');
if (figma.currentPage.id !== p.id) await figma.setCurrentPageAsync(p);
if (figma.currentPage.name !== 'Components') return 'wrong page: ' + figma.currentPage.name;
const WANT = ${JSON.stringify(specs.map((s) => [s.set, s.c, s.st]))};
const out = [];
for (const [set, c, st] of WANT) {
  const S = figma.currentPage.children.find(n => n.type === 'COMPONENT_SET' && n.name === set);
  if (!S) { out.push({ set, err: 'no set' }); continue; }
  const v = S.children.find(k => k.name === 'Container=' + c + ', Style=' + st + ', Corners=CORNERS_TOKEN');
  if (!v) { out.push({ set, st, err: 'no variant' }); continue; }
  const svg = await v.exportAsync({ format: 'SVG_STRING' });
  out.push({ set, st, id: v.id, svg: svg.replace(/\\n\\s*/g, '') });
}
return out;`);
  console.log(code.replace(/CORNERS_TOKEN/g, CORNERS));
  process.exit(0);
}

const json = JSON.stringify(specs);
const chunks = [];
for (let i = 0; i < json.length; i += 1500) chunks.push(json.slice(i, i + 1500));

let code = (`const p = figma.root.children.find(n => n.name === 'Components');
if (figma.currentPage.id !== p.id) await figma.setCurrentPageAsync(p);
if (figma.currentPage.name !== 'Components') return 'wrong page: ' + figma.currentPage.name;
const _f = (function(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16)});
const CHUNKS = [
${chunks.map((c) => "'" + c.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'").join(',\n')}
];
const CH = ${JSON.stringify(chunks.map(fnv))};
const bad = CHUNKS.map((c, i) => _f(c) === CH[i] ? null : i).filter(x => x !== null);
if (bad.length) return 'corrupted chunks: ' + bad.join(',');
const SPECS = JSON.parse(CHUNKS.join(''));
if (_f(JSON.stringify(SPECS)) !== '${fnv(json)}') return 'SPECS corrupted in transit';
const HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="CAP_TOKEN" stroke-linejoin="round">';
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
const rep = { replaced: 0, miss: [], ids: [], layers: [] };
for (const SP of SPECS) {
  const set = figma.currentPage.children.find(n => n.type === 'COMPONENT_SET' && n.name === SP.set);
  if (!set) { rep.miss.push(SP.set); continue; }
  const nm = 'Container=' + SP.c + ', Style=' + SP.st + ', Corners=CORNERS_TOKEN';
  const v = set.children.find(k => k.name === nm);
  if (!v) { rep.miss.push(SP.set + '/' + nm); continue; }
  const art = figma.createNodeFromSvg(svgOf(SP.pay));
  const kids = [...art.children];
  for (const k of kids) if (k.type !== 'VECTOR') throw new Error('non-vector ' + k.type + ' in ' + SP.set + '/' + SP.st);
  for (const old of [...v.children]) old.remove();
  for (const k of kids) {
    const kx = k.x, ky = k.y;
    v.appendChild(k); k.x = kx; k.y = ky;
    k.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    k.strokeAlign = 'CENTER';
    if (k.strokes.length) { k.strokeJoin = 'ROUND'; k.strokeCap = 'STROKECAP_TOKEN'; }
    k.name = (k.fills !== figma.mixed && k.fills.length && k.fills.some(f => f.opacity !== undefined && f.opacity < 1)) ? 'Plate' : 'Vector';
  }
  art.remove();
  rep.replaced++; rep.ids.push(v.id);
  rep.layers.push(SP.set + '/' + SP.st + ':' + v.children.map(k => k.name).join('+'));
}
return rep;`);
code = code.replace(/STROKECAP_TOKEN/g, CORNERS === 'regular' ? 'ROUND' : 'NONE').replace(/CORNERS_TOKEN/g, CORNERS).replace(/CAP_TOKEN/g, CORNERS === 'regular' ? 'round' : 'butt');
console.log(code);
