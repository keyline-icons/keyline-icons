import fs from 'node:fs';
const S = JSON.parse(fs.readFileSync('slots.json', 'utf8'));
const h = (t) => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const body = `const S = ${JSON.stringify(S)};
if (((t) => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h; })(JSON.stringify(S)) !== ${h(JSON.stringify(S))}) throw new Error('payload checksum mismatch');
const p = figma.root.children.find((n) => n.name === 'Components');
if (figma.currentPage.id !== p.id) await figma.setCurrentPageAsync(p);
const page = figma.currentPage;
const head = await figma.getNodeByIdAsync('19151:21327');
if (!head || head.type !== 'TEXT' || !/^New/.test(head.characters)) throw new Error('heading ' + (head && head.characters));
const sets = new Map(page.children.filter((n) => n.type === 'COMPONENT_SET').map((n) => [n.name, n]));
for (const s of S) { const n = sets.get(s.n); if (!n) throw new Error('no set ' + s.n); n.x = s.x; n.y = s.y; }
await figma.loadFontAsync(head.fontName);
head.characters = 'New · ' + S.length; head.y = -1296;
const band = page.children.filter((n) => n.type === 'COMPONENT_SET' && n.y < -150 && n.y >= -1400);
const names = new Set(S.map((s) => s.n));
const strays = band.filter((n) => !names.has(n.name)).map((n) => n.name + '@' + n.x + ',' + n.y);
const boxes = S.map((s) => { const n = sets.get(s.n); return [s.n, n.x, n.y, n.x + n.width, n.y + n.height]; });
const hits = [];
for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; if (a[1] < b[3] && b[1] < a[3] && a[2] < b[4] && b[2] < a[4]) hits.push(a[0] + '/' + b[0]); }
const low = Math.max(...boxes.map((b) => b[4]));
const top = Math.min(...boxes.map((b) => b[2]));
const below = page.children.filter((n) => n.y >= -176 && n.y < -100).map((n) => n.name);
return { moved: S.length, heading: head.characters + ' @' + head.y, top, low, hits, strays, below };`;
fs.writeFileSync('reflow.js', body);
console.log(body.length);
