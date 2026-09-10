/**
 * The ink-box highlighter for the Figma Catalog page.
 *
 * Over every drawn cell it lays a BLUE box on the cell's own 24 x 24 frame, a
 * GREEN box where that drawing's ink ends, and the four gaps between them as
 * numbers. Green is on every icon always — two neighbours whose greens
 * disagree is the comparison this exists for. RED is the only colour that
 * means something is wrong, and it means one of exactly two things: the sharp
 * drawing paints outside the rounded sibling it was converted from, or the ink
 * leaves the 1-unit padding floor.
 *
 * It is scaffolding and it is heavy — six nodes a cell — so it goes on for a
 * batch under review and comes off once Zafar has approved it. His words,
 * 6 Sep 2026: "every new icon added should apply them until approved and then
 * gone again." He does not delete them himself; he says when.
 *
 *   node tools/ink-box-figma.js draw [name ...]
 *   node tools/ink-box-figma.js drop [name ...]
 *
 * prints the `use_figma` bodies, one per chunk of rows, because the
 * measurement has to happen inside the plugin. No name list means the whole
 * card. A draw clears the card's old boxes first, so a re-run after a dropped
 * socket cannot double them.
 *
 * ## The details are his, and every one of them was paid for
 *
 * - **Weight 0.15 on every box.** Sub-pixel until about 7x, so a 24px
 *   screenshot understates it badly and a local render at 11x is the honest
 *   way to show him the look.
 * - **The blue box is the one box drawn INSIDE aligned.** It sits on the
 *   cell's own edge, and the variant group above the cell is exactly 24 tall
 *   with clipping on, so an outside line is cut away — the first run showed
 *   left and right edges spilling into the gaps between cells and no top or
 *   bottom at all.
 * - **The green box is OUTSIDE aligned.** Centred, half the weight lies over
 *   the last quarter-unit of paint, which is the part being judged; outside,
 *   the box's inner edge is the ink boundary itself.
 * - **The numbers are BLUE, not green**, so red keeps meaning only one thing.
 *   Whole numbers bare and anything off the grid to two decimals, so the odd
 *   one catches the eye. A number wider than its gap is clamped into the cell
 *   rather than centred on it, because the clipping group cut `1.02` down to
 *   `02`, and it carries a white halo so it reads where a narrow gap forces it
 *   over black.
 * - **Everything is locked**, so a click still selects the icon underneath,
 *   and everything is parented to its own cell, so it tracks that cell and one
 *   `drop` pass removes it by name.
 * - **A red cell keeps its rounded sibling's green beside it** and takes a
 *   translucent wash, so the overshoot carries when zoomed out. Do not paint
 *   every sharp cell red: where the treatments agree the two boxes are
 *   identical, so that covers green on every CORRECT icon.
 *
 * ## Measure with absoluteRenderBounds, never with x/y/width/height
 *
 * A node's own box is the ink box for an outlined fill and the PATH box for a
 * live stroke, and the two differ by exactly the half-weight — the same
 * magnitude as a real defect, which is what makes it dangerous rather than
 * merely wrong. `absoluteRenderBounds` is the painted box in both cases, caps
 * and joins included; it matches `pipeline/lib/geom.mjs`'s `strokedBBox` to
 * four decimals across every style and both treatments, so nothing is sent
 * from `raw/` and the boxes show what Figma actually paints. It is null on a
 * node that paints nothing, and such a node is skipped rather than defaulted.
 *
 * ## The overlay goes in the CELL, and only the cell
 *
 * A row and a variant group are both auto-layout, so anything appended to them
 * reflows the card. A `cell/<name>/<group>/<style>` frame is `layoutMode:
 * NONE` and already `clipsContent: false`, so it takes the overlay without
 * moving anything and without clipping the numbers that sit outside the green.
 */

const CARD = 'Category / New';
const CHUNK = 8; // rows per call; the bridge drops a socket on a long script
const ROWS = 40; // upper bound on rows in a card, for chunking

const body = (mode, card, only, from, count) => `
const CARD = ${JSON.stringify(card)};
const ONLY = new Set(${JSON.stringify(only)});
const FROM = ${from}, COUNT = ${count};
const page = figma.root.children.find((p) => p.name === 'Catalog');
if (figma.currentPage.id !== page.id) await figma.setCurrentPageAsync(page);
if (figma.currentPage.name !== 'Catalog') return { wrong: figma.currentPage.name };
const grid = figma.currentPage.children.find((n) => n.name === 'Category grid');
const cardNode = grid.children.find((c) => c.name === CARD);
if (!cardNode) return { error: 'no card ' + CARD };
const rowsFrame = cardNode.children.find((c) => /^Category rows/.test(c.name));
let rows = rowsFrame.children.filter((r) => !ONLY.size || ONLY.has(r.name.replace(/^Icon row \\/ /, '')));
rows = rows.slice(FROM, FROM + COUNT);
${
  mode === 'drop'
    ? `let dropped = 0;
for (const row of rows)
  for (const n of row.findAll((n) => n.name.indexOf('ink box') === 0)) { n.remove(); dropped++; }
return { card: CARD, rows: rows.length, dropped };`
    : `
const GREEN = { r: 0.086, g: 0.639, b: 0.29 };
const RED = { r: 0.882, g: 0.114, b: 0.282 };
const BLUE = { r: 0.231, g: 0.51, b: 0.965 };
const WHITE = { r: 1, g: 1, b: 1 };
const solid = (c, o) => [{ type: 'SOLID', color: c, opacity: o === undefined ? 1 : o }];
const W = 0.15;
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

/** The painted box of everything inside a cell, in the cell's own 24 grid. */
const ink = (cell) => {
  const o = cell.absoluteBoundingBox;
  let b = null;
  for (const n of cell.findAll((n) => n.type === 'VECTOR' || n.type === 'ELLIPSE' || n.type === 'RECTANGLE')) {
    // the overlay's own boxes are RECTANGLEs in the cell, so a stale one left
    // by a dropped socket would be measured as if it were ink
    if (n.name.indexOf('ink box') === 0) continue;
    const r = n.absoluteRenderBounds;   // painted, so caps and joins are in it
    if (!r) continue;
    const q = [r.x - o.x, r.y - o.y, r.x - o.x + r.width, r.y - o.y + r.height];
    b = b ? [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[2]), Math.max(b[3], q[3])] : q;
  }
  return b;
};
const box = (cell, b, colour, align, name, wash) => {
  const r = figma.createRectangle();
  r.name = name;
  r.x = b[0]; r.y = b[1];
  r.resize(Math.max(b[2] - b[0], 0.01), Math.max(b[3] - b[1], 0.01));
  r.fills = wash ? solid(colour, 0.08) : [];
  r.strokes = solid(colour); r.strokeWeight = W; r.strokeAlign = align;
  r.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  cell.appendChild(r); r.locked = true;
  return r;
};

const made = [];
const report = [];
for (const row of rows) {
  // Clearing first is what makes a retry safe: the bridge can drop a socket
  // after the write has landed, and a blind re-run would then double every box.
  for (const n of row.findAll((n) => n.name.indexOf('ink box') === 0)) n.remove();
  const cells = row.findAll((n) => n.name.indexOf('cell/') === 0);
  const boxes = new Map();
  for (const c of cells) { const b = ink(c); if (b) boxes.set(c.name, b); }
  for (const c of cells) {
    const b = boxes.get(c.name);
    if (!b) continue;
    const round = (v) => Math.round(v * 100) / 100;
    const pads = [b[0], b[1], 24 - b[2], 24 - b[3]].map(round);      // L T R B
    // The two things red is allowed to mean, and nothing else. Tolerance is
    // 0.02, what the rest of the toolchain compares Figma at; every real
    // overshoot so far has been 0.4-ish, so nothing sits near the line.
    const sib = /\\/sharp\\//.test(c.name) ? boxes.get(c.name.replace('/sharp/', '/regular/')) : null;
    const outside = !!sib && (b[0] < sib[0] - 0.02 || b[1] < sib[1] - 0.02 ||
                              b[2] > sib[2] + 0.02 || b[3] > sib[3] + 0.02);
    const bad = pads.some((p) => p < 0.98) || outside;
    const paint = bad ? RED : GREEN;

    made.push(box(c, [0, 0, 24, 24], BLUE, 'INSIDE', 'ink box frame').id);
    if (outside) made.push(box(c, sib, GREEN, 'OUTSIDE', 'ink box rounded').id);
    made.push(box(c, b, paint, 'OUTSIDE', 'ink box ink', bad).id);

    const label = (v, side) => {
      const t = figma.createText();
      t.name = 'ink box pad ' + side;
      t.fontName = { family: 'Inter', style: 'Regular' };
      t.fontSize = 1.6;
      // Whole numbers bare, anything off the grid to two places, so the odd
      // one is the one that catches the eye.
      t.characters = Number.isInteger(v) ? String(v) : v.toFixed(2);
      t.fills = solid(BLUE);
      t.strokes = solid(WHITE); t.strokeWeight = 0.18; t.strokeAlign = 'OUTSIDE';
      t.textAutoResize = 'WIDTH_AND_HEIGHT';
      const cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2;
      const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);
      if (side === 'top') { t.x = clamp(cx - t.width / 2, 0, 24 - t.width); t.y = clamp(b[1] - t.height, 0, 24 - t.height); }
      if (side === 'bottom') { t.x = clamp(cx - t.width / 2, 0, 24 - t.width); t.y = clamp(b[3], 0, 24 - t.height); }
      if (side === 'left') { t.x = clamp(b[0] - t.width, 0, 24 - t.width); t.y = clamp(cy - t.height / 2, 0, 24 - t.height); }
      if (side === 'right') { t.x = clamp(b[2], 0, 24 - t.width); t.y = clamp(cy - t.height / 2, 0, 24 - t.height); }
      t.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
      c.appendChild(t); t.locked = true;
      made.push(t.id);
    };
    label(pads[1], 'top'); label(pads[3], 'bottom'); label(pads[0], 'left'); label(pads[2], 'right');
    if (bad) report.push({ cell: c.name, pads, outsideRounded: outside });
  }
}
return { card: CARD, rows: rows.map((r) => r.name.replace('Icon row / ', '')), nodes: made.length, red: report };`
}`;

const [mode = 'draw', ...names] = process.argv.slice(2);
for (let i = 0; i < (names.length || ROWS); i += CHUNK) {
  console.log(`/* ${mode} ${CARD} rows ${i}..${i + CHUNK - 1} */`);
  console.log(body(mode, CARD, names, i, CHUNK));
  console.log('/* --- next call --- */');
}
