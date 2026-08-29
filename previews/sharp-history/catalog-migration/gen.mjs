// Emit use_figma code for the catalog matrix migration.
//   node gen.mjs batch <Card> <start> <count>   rows [start, start+count)
//   node gen.mjs final <Card>                    swap, stripe, legend, header
import { readFileSync } from 'node:fs';
import { compact } from '../scripts/encode.mjs';
const S = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const plan = JSON.parse(readFileSync(new URL('./plan.json', import.meta.url), 'utf8'));
const [mode, cardName, startS, countS] = process.argv.slice(2);
const card = plan.find((c) => c.card === cardName);
if (!card) throw new Error('no card ' + cardName);

const GUARD = `
const page = figma.root.children.find(p => p.name === 'Catalog');
await figma.setCurrentPageAsync(page);
if (figma.currentPage.name !== 'Catalog') return 'wrong page: ' + figma.currentPage.name;
const grid = await figma.getNodeByIdAsync('14956:1101');
const card = grid.children.find(n => n.name === 'Category / ${card.card}');
if (!card) return 'no card';
const oldRows = card.children.find(n => n.name === 'Category rows / ${card.card}');
if (!oldRows) return 'no rows frame';`;

if (mode === 'batch') {
  const start = +startS, count = +countS;
  const rows = card.rows.slice(start, start + count);
  if (!rows.length) throw new Error('empty batch');
  const specs = rows.map((r) => {
    const pay = {};
    for (const [k, dir] of [['s', 'solved-mid'], ['d', 'solved-duotone'], ['f', 'solved-fill']])
      pay[k] = r.sharp[{ s: 'stroke', d: 'duotone', f: 'fill' }[k]]
        ? compact(readFileSync(`${S}/${dir}/${r.name}.svg`, 'utf8').replace(/\n\s*/g, '')) : 0;
    return { n: r.name, set: r.set, c: r.container, b: r.badge ? 1 : 0,
      reg: [r.reg.stroke ? 1 : 0, r.reg.duotone ? 1 : 0, r.reg.fill ? 1 : 0], pay };
  });
  const specsJson = JSON.stringify(specs);
  const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
  const code = `${GUARD}
let tmp = card.children.find(n => n.name === '__matrix');
if (!tmp) { tmp = figma.createFrame(); tmp.name = '__matrix'; tmp.layoutMode = 'VERTICAL'; tmp.itemSpacing = 0; tmp.fills = []; card.appendChild(tmp); tmp.layoutSizingHorizontal = 'FILL'; tmp.layoutSizingVertical = 'HUG'; }
const SPECS = ${specsJson};
const _h = (function(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16)})(JSON.stringify(SPECS));
if (_h !== '${fnv(specsJson)}') return 'SPECS corrupted in transit: ' + _h;
if (tmp.children.some(n => n.name === 'Icon row / ' + SPECS[0].n)) return 'batch already applied';
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
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
const INK = { r: 17/255, g: 17/255, b: 17/255 };
const harv = new Map();
async function variantsOf(set) {
  if (harv.has(set)) return harv.get(set);
  const m = new Map();
  const or2 = oldRows.children.find(n => n.name === 'Icon row / ' + set);
  if (or2) {
    const vg = or2.children.find(n => n.name === 'Variant group / ' + set);
    const insts = or2.children.filter(n => n.type === 'INSTANCE').concat(vg ? vg.children.filter(n => n.type === 'INSTANCE') : []);
    for (const i of insts) { const mc = await i.getMainComponentAsync(); if (mc) m.set(mc.name, i); }
  }
  harv.set(set, m); return m;
}
const rep = { rows: 0, inst: 0, art: 0, missInst: [] };
const STYLES = ['stroke', 'duotone', 'fill'];
for (const s of SPECS) {
  const row = figma.createFrame(); row.name = 'Icon row / ' + s.n;
  row.layoutMode = 'HORIZONTAL'; row.itemSpacing = 28;
  row.paddingTop = 7; row.paddingBottom = 7; row.paddingLeft = 10; row.paddingRight = 10;
  row.cornerRadius = 10; row.counterAxisAlignItems = 'CENTER'; row.fills = [];
  tmp.appendChild(row); row.layoutSizingHorizontal = 'FILL'; row.layoutSizingVertical = 'HUG';
  const nf = figma.createFrame(); nf.name = 'Name / ' + s.n; nf.layoutMode = 'HORIZONTAL'; nf.itemSpacing = 6; nf.counterAxisAlignItems = 'CENTER'; nf.fills = [];
  row.appendChild(nf); nf.layoutSizingHorizontal = 'HUG'; nf.layoutSizingVertical = 'HUG';
  const t = figma.createText(); t.fontName = { family: 'Inter', style: 'Medium' }; t.fontSize = 14; t.characters = s.n;
  t.fills = [{ type: 'SOLID', color: INK }]; t.name = 'Icon label / ' + s.n; nf.appendChild(t);
  if (s.b) {
    const bdg = figma.createFrame(); bdg.name = 'New badge'; bdg.layoutMode = 'HORIZONTAL';
    bdg.paddingTop = 2; bdg.paddingBottom = 2; bdg.paddingLeft = 7; bdg.paddingRight = 7; bdg.cornerRadius = 999;
    bdg.fills = [{ type: 'SOLID', color: { r: 10/255, g: 10/255, b: 10/255 } }];
    const bt = figma.createText(); bt.fontName = { family: 'Inter', style: 'Semi Bold' }; bt.fontSize = 10; bt.characters = 'New';
    bt.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; bt.name = 'New';
    bdg.appendChild(bt); nf.appendChild(bdg); bdg.layoutSizingHorizontal = 'HUG'; bdg.layoutSizingVertical = 'HUG';
  }
  const sp = figma.createFrame(); sp.name = 'Spacer'; sp.fills = []; sp.resize(10, 1);
  row.appendChild(sp); sp.layoutSizingHorizontal = 'FILL';
  const vmap = await variantsOf(s.set);
  for (const grp of ['regular', 'sharp']) {
    const g = figma.createFrame(); g.name = 'Group / ' + (grp === 'regular' ? 'Regular' : 'Sharp') + ' / ' + s.n;
    g.layoutMode = 'HORIZONTAL'; g.itemSpacing = 6; g.fills = [];
    row.appendChild(g); g.layoutSizingHorizontal = 'HUG'; g.layoutSizingVertical = 'HUG';
    for (let si = 0; si < 3; si++) {
      const st = STYLES[si];
      const cell = figma.createFrame(); cell.name = 'cell/' + s.n + '/' + grp + '/' + st;
      cell.resize(24, 24); cell.fills = []; cell.clipsContent = false; g.appendChild(cell);
      if (grp === 'regular') {
        if (s.reg[si]) {
          const src = vmap.get('Container=' + s.c + ', Style=' + st);
          if (!src) { rep.missInst.push(s.n + '/' + st); continue; }
          const c2 = src.clone(); cell.appendChild(c2); c2.x = 0; c2.y = 0; rep.inst++;
        }
      } else {
        const pay = s.pay['sdf'[si]];
        if (pay) {
          const art = figma.createNodeFromSvg(svgOf(pay)); art.name = s.n; art.clipsContent = false; art.fills = [];
          for (const v of art.findAll(n => n.type === 'VECTOR')) if (v.strokes.length) { v.strokeJoin = 'ROUND'; v.strokeCap = 'NONE'; }
          cell.appendChild(art); art.x = 0; art.y = 0; rep.art++;
        }
      }
    }
  }
  rep.rows++;
}
rep.tmpRows = tmp.children.length;
return rep;`;
  process.stdout.write(code);
} else if (mode === 'final') {
  const expect = card.rows.length;
  const code = `${GUARD}
const tmp = card.children.find(n => n.name === '__matrix');
if (!tmp) return 'no tmp holder';
if (tmp.children.length !== ${expect}) return 'row count ' + tmp.children.length + ' != ${expect}';
const cells = tmp.findAll(n => n.name.indexOf('cell/') === 0);
const filledCells = cells.filter(c => c.children.length > 0).length;
for (const k of [...oldRows.children]) k.remove();
for (const k of [...tmp.children]) oldRows.appendChild(k);
tmp.remove();
oldRows.children.forEach((r, i) => {
  r.fills = i % 2 === 0 ? [{ type: 'SOLID', color: { r: 245/255, g: 245/255, b: 245/255 } }] : [];
});
let insertedHeader = false;
if (!card.children.some(n => n.name === 'Legend')) {
  insertedHeader = true;
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  const GREY = { r: 115/255, g: 115/255, b: 115/255 }, LGREY = { r: 163/255, g: 163/255, b: 163/255 }, INK = { r: 17/255, g: 17/255, b: 17/255 };
  const legend = figma.createText(); legend.fontName = { family: 'Inter', style: 'Medium' }; legend.fontSize = 12;
  legend.characters = 'S stroke  \\u00b7  D duotone  \\u00b7  F fill'; legend.fills = [{ type: 'SOLID', color: GREY }]; legend.name = 'Legend';
  legend.textAutoResize = 'HEIGHT';
  const divIdx = card.children.findIndex(n => n.name === 'Divider');
  card.insertChild(divIdx, legend); legend.layoutSizingHorizontal = 'FILL';
  const ch = figma.createFrame(); ch.name = 'Column header'; ch.layoutMode = 'VERTICAL'; ch.itemSpacing = 3; ch.paddingBottom = 4; ch.fills = [];
  const rowsIdx = card.children.findIndex(n => n.name === 'Category rows / ${card.card}');
  card.insertChild(rowsIdx, ch); ch.layoutSizingHorizontal = 'FILL'; ch.layoutSizingVertical = 'HUG';
  const mkText = (chars, style, size, color, w, align) => {
    const t = figma.createText(); t.fontName = { family: 'Inter', style }; t.fontSize = size; t.characters = chars;
    t.fills = [{ type: 'SOLID', color }]; t.textAutoResize = 'HEIGHT'; t.textAlignHorizontal = align; t.name = chars;
    t.resize(w, t.height); return t;
  };
  for (const kind of ['group', 'style']) {
    const hr = figma.createFrame(); hr.name = 'Header / ' + kind; hr.layoutMode = 'HORIZONTAL'; hr.itemSpacing = 28;
    hr.paddingLeft = 10; hr.paddingRight = 10; hr.counterAxisAlignItems = 'CENTER'; hr.fills = [];
    ch.appendChild(hr); hr.layoutSizingHorizontal = 'FILL'; hr.layoutSizingVertical = 'HUG';
    const sp = figma.createFrame(); sp.name = 'spacer'; sp.fills = []; sp.resize(10, 1);
    hr.appendChild(sp); sp.layoutSizingHorizontal = 'FILL';
    for (const gname of ['Regular', 'Sharp']) {
      const gf = figma.createFrame(); gf.fills = []; gf.layoutMode = 'HORIZONTAL'; gf.counterAxisAlignItems = 'CENTER';
      if (kind === 'group') {
        gf.name = 'Header group / ' + gname; gf.itemSpacing = 0;
        gf.appendChild(mkText(gname, 'Semi Bold', 12, INK, 84, 'CENTER'));
      } else {
        gf.name = 'Header styles / ' + gname; gf.itemSpacing = 6;
        for (const L of ['S', 'D', 'F']) gf.appendChild(mkText(L, 'Medium', 10, LGREY, 24, 'CENTER'));
      }
      hr.appendChild(gf); gf.layoutSizingHorizontal = 'HUG'; gf.layoutSizingVertical = 'HUG';
    }
  }
}
oldRows.layoutSizingVertical = 'FIXED';
oldRows.resize(oldRows.width, oldRows.children.reduce((a, c) => a + c.height, 0));
oldRows.layoutSizingVertical = 'HUG';
return { rows: oldRows.children.length, cells: cells.length, filledCells, insertedHeader, cardH: Math.round(card.height), rowW: Math.round(oldRows.children[0].width) };`;
  process.stdout.write(code);
} else throw new Error('mode?');
