/**
 * Minimal SVG read/normalize for Figma MCP exports.
 *
 * The input shape is narrow and predictable — a flat `<svg>` with optional `<g>`
 * wrappers around `<path>`, `<circle>`, `<rect>`, `<ellipse>` — so a regex reader
 * is adequate and keeps the pipeline dependency-free. `readSvg` rejects anything
 * outside that shape rather than silently mangling it.
 */

import { pathBBox, enclosesArea, subpaths } from './geom.mjs';

const SHAPES = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'];
const ALLOWED = new Set([...SHAPES, 'g', 'svg', 'defs', 'title', 'desc']);

/** Attributes Figma emits that must never reach a published icon. */
const STRIP_ATTRS = [
  'preserveAspectRatio', // lets the icon distort at non-square aspect ratios
  'overflow',
  'style',
  'id',
  'clip-rule', // meaningful only alongside fill-rule; re-emitted when needed
  'xmlns:xlink',
  'xml:space',
  'data-name',
];

function parseAttrs(tagBody) {
  const out = {};
  for (const m of tagBody.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

export function readSvg(source, label = '<svg>') {
  const rootMatch = source.match(/<svg\b([^>]*)>/i);
  if (!rootMatch) throw new Error(`${label}: no <svg> element`);
  const root = parseAttrs(rootMatch[1]);

  const tags = [...source.matchAll(/<([a-zA-Z][\w:-]*)\b([^>]*?)(\/?)>/g)];
  const unknown = tags.map((t) => t[1]).filter((t) => !ALLOWED.has(t.toLowerCase()));
  if (unknown.length) throw new Error(`${label}: unsupported elements: ${[...new Set(unknown)].join(', ')}`);

  const shapes = tags
    .filter((t) => SHAPES.includes(t[1].toLowerCase()))
    .map((t) => ({ tag: t[1].toLowerCase(), attrs: parseAttrs(t[2]) }));

  return { root, shapes };
}

/** Convert primitives to an equivalent `d` so geometry code has one code path. */
export function shapeToPath({ tag, attrs }) {
  const n = (k, dflt = 0) => (attrs[k] === undefined ? dflt : parseFloat(attrs[k]));
  // Match the precision Figma writes. Full float expansion would put
  // `5.343145750507619` next to a hand-drawn `5.34315` in the same file, and the
  // extra digits are far below anything a 24-unit grid can express.
  const f = (v) => +v.toFixed(5);
  if (tag === 'path') return attrs.d || '';
  if (tag === 'circle' || tag === 'ellipse') {
    const cx = n('cx'), cy = n('cy');
    const rx = tag === 'circle' ? n('r') : n('rx');
    const ry = tag === 'circle' ? n('r') : n('ry');
    // Four cubics, not arcs: the geometry layer solves cubic extrema exactly but
    // only approximates arcs by their endpoints, which would collapse a circle's
    // bounding box onto its horizontal diameter.
    const k = 0.5522847498307936;
    const ox = rx * k, oy = ry * k;
    return `M${f(cx - rx)} ${f(cy)}` +
      `C${f(cx - rx)} ${f(cy - oy)} ${f(cx - ox)} ${f(cy - ry)} ${f(cx)} ${f(cy - ry)}` +
      `C${f(cx + ox)} ${f(cy - ry)} ${f(cx + rx)} ${f(cy - oy)} ${f(cx + rx)} ${f(cy)}` +
      `C${f(cx + rx)} ${f(cy + oy)} ${f(cx + ox)} ${f(cy + ry)} ${f(cx)} ${f(cy + ry)}` +
      `C${f(cx - ox)} ${f(cy + ry)} ${f(cx - rx)} ${f(cy + oy)} ${f(cx - rx)} ${f(cy)}Z`;
  }
  if (tag === 'rect') {
    const x = n('x'), y = n('y'), w = n('width'), h = n('height');
    // A rect's corner radius has to be honoured, not dropped: squaring off a
    // rounded rect changes the drawing silently, and every icon here that looks
    // like a rect is rounded.
    let rx = attrs.rx !== undefined ? n('rx') : attrs.ry !== undefined ? n('ry') : 0;
    let ry = attrs.ry !== undefined ? n('ry') : rx;
    rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2);
    if (!rx && !ry) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
    const k = 0.5522847498307936, ox = rx * k, oy = ry * k;
    return `M${f(x + rx)} ${f(y)}H${f(x + w - rx)}` +
      `C${f(x + w - rx + ox)} ${f(y)} ${f(x + w)} ${f(y + ry - oy)} ${f(x + w)} ${f(y + ry)}` +
      `V${f(y + h - ry)}` +
      `C${f(x + w)} ${f(y + h - ry + oy)} ${f(x + w - rx + ox)} ${f(y + h)} ${f(x + w - rx)} ${f(y + h)}` +
      `H${f(x + rx)}` +
      `C${f(x + rx - ox)} ${f(y + h)} ${f(x)} ${f(y + h - ry + oy)} ${f(x)} ${f(y + h - ry)}` +
      `V${f(y + ry)}` +
      `C${f(x)} ${f(y + ry - oy)} ${f(x + rx - ox)} ${f(y)} ${f(x + rx)} ${f(y)}Z`;
  }
  if (tag === 'line') return `M${n('x1')} ${n('y1')}L${n('x2')} ${n('y2')}`;
  if (tag === 'polyline' || tag === 'polygon') {
    const pts = (attrs.points || '').trim().split(/[\s,]+/).map(Number);
    let d = '';
    for (let i = 0; i + 1 < pts.length; i += 2) d += `${i ? 'L' : 'M'}${pts[i]} ${pts[i + 1]}`;
    return tag === 'polygon' ? d + 'Z' : d;
  }
  return '';
}

/** Geometry attributes belonging to a primitive, dropped once it becomes a path. */
const PRIMITIVE_ATTRS = ['cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'width', 'height',
                         'x1', 'y1', 'x2', 'y2', 'points'];

/**
 * Every shape is emitted as a `<path>`, including circles.
 *
 * A circle drawn in Figma exports as `<circle>` unless it is flattened, and it
 * renders identically, so nothing here fails — `build-react.mjs` handles
 * primitives, and so does the browser. The reason to convert is that a
 * primitive is a second shape of thing every consumer has to know about, and
 * only 12 of 451 files ever produced one. An exception that rare is one nobody
 * remembers to handle: path morphing, font builders and most third-party icon
 * tooling assume `d` and quietly skip what they don't recognise.
 *
 * The cost is a few hundred bytes across the set. The primitives did read more
 * nicely; one shape type is worth more.
 */
function emitShape(shape, strokeWidth, rootStroked) {
  const { tag, attrs } = shape;
  const keep = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (STRIP_ATTRS.includes(k)) continue;
    if (tag !== 'path' && PRIMITIVE_ATTRS.includes(k)) continue;
    keep[k] = v;
  }
  if (tag !== 'path') keep.d = shapeToPath(shape);

  // Colour: any concrete paint becomes currentColor. Opacity is preserved so the
  // duotone secondary keeps its relationship to the primary.
  for (const key of ['stroke', 'fill']) {
    const v = keep[key];
    if (v === undefined) continue;
    if (v.toLowerCase() === 'none') continue;
    keep[key] = 'currentColor';
  }

  // A fill-only shape in an icon whose root carries a stroke must opt out
  // explicitly, or it inherits a stroke it never had in the source. This is the
  // duotone background plate and the solid body of a mixed fill/stroke icon.
  const wasStroked = attrs.stroke !== undefined && attrs.stroke.toLowerCase() !== 'none';
  if (rootStroked && !wasStroked) keep.stroke = 'none';

  // Attributes carried by the root are redundant on children.
  else if (keep.stroke === 'currentColor') delete keep.stroke;
  if (keep['stroke-width'] === String(strokeWidth)) delete keep['stroke-width'];
  if (keep['stroke-linecap'] === 'round') delete keep['stroke-linecap'];
  if (keep['stroke-linejoin'] === 'round') delete keep['stroke-linejoin'];
  // fill-rule needs its partner back if it was stripped.
  if (keep['fill-rule'] === 'evenodd') keep['clip-rule'] = 'evenodd';

  // A shape never carries both paints. A duotone's muted plate and its
  // full-strength outline are two different things that happen to share an
  // outline, and collapsing them into one element makes the tone impossible to
  // restyle, re-colour or animate independently — you cannot target something
  // that isn't its own element. Splitting is free at render time: one element
  // paints its fill then its stroke, and two adjacent elements do the same in
  // the same order.
  const paintsFill = keep.fill !== undefined && keep.fill !== 'none';
  // An absent `stroke` means "inherit the root", which only paints when the
  // root actually carries one — an icon with no stroke anywhere has nothing to
  // split off, and giving it a stroke="none" sibling invents a stroked shape.
  const paintsStroke = rootStroked && keep.stroke !== 'none';
  if (!paintsFill || !paintsStroke) return [keep];

  const fillOnly = { d: keep.d, stroke: 'none' };
  const strokeOnly = { d: keep.d };
  for (const [k, v] of Object.entries(keep)) {
    if (k === 'd' || k === 'stroke') continue;
    if (k === 'fill' || k.startsWith('fill-') || k === 'clip-rule') fillOnly[k] = v;
    else strokeOnly[k] = v;
  }
  if (keep.stroke !== undefined) strokeOnly.stroke = keep.stroke;
  return [fillOnly, strokeOnly];
}

const ATTR_ORDER = ['d', 'fill', 'fill-opacity', 'fill-rule', 'clip-rule',
                    'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'];

function serialize(keep) {
  const parts = [];
  for (const k of ATTR_ORDER) if (keep[k] !== undefined) parts.push(`${k}="${keep[k]}"`);
  for (const k of Object.keys(keep)) if (!ATTR_ORDER.includes(k)) parts.push(`${k}="${keep[k]}"`);
  return `  <path ${parts.join(' ')}/>`;
}

/** Everything about a shape except its geometry. Two shapes agreeing on all of
 *  it paint identically, so they can share one element. */
const styleKey = (a) =>
  Object.keys(a).filter((k) => k !== 'd').sort().map((k) => `${k}=${a[k]}`).join(' ');

/**
 * Combine neighbouring shapes that paint identically into a single `<path>`.
 *
 * Three bars of a signal indicator drawn as three layers in Figma are one shape
 * conceptually and should ship as one element with three subpaths — that is what
 * flattening in Figma produces, and doing it here as well means the output no
 * longer depends on whether someone remembered to flatten.
 *
 * Only *consecutive* shapes merge. Identical paint makes z-order irrelevant
 * between the merged shapes themselves, but hoisting one past a differently
 * painted neighbour would reorder the stack and can change what covers what.
 */
function mergeAdjacent(list) {
  const boxOf = (d) => { try { return pathBBox(d); } catch { return null; } };
  const disjoint = (a, b) =>
    !a || !b || a[2] <= b[0] || b[2] <= a[0] || a[3] <= b[1] || b[3] <= a[1];
  const encloses = (a, b) =>
    !!a && !!b && a[0] <= b[0] && a[1] <= b[1] && a[2] >= b[2] && a[3] >= b[3];

  const out = [];
  for (const attrs of list) {
    const prev = out[out.length - 1];
    let mergeable = prev && styleKey(prev) === styleKey(attrs);
    if (mergeable) {
      const a = boxOf(prev.d), b = boxOf(attrs.d);
      // A shape wrapped around another is a container, not more of the same
      // drawing — a square or circle holding a glyph, painted the same way
      // because everything here is currentColor. Merging them would make the
      // container invisible to the spacing rule, which is what catches a glyph
      // crowding the frame it sits in.
      if (encloses(a, b) || encloses(b, a)) mergeable = false;
      // Combining two filled shapes puts them under one winding rule, so
      // regions that overlap can cancel instead of painting. Strokes have no
      // such interaction — each subpath is drawn independently.
      else if (attrs.fill && attrs.fill !== 'none' && !disjoint(a, b)) mergeable = false;
    }
    if (mergeable) prev.d = `${prev.d}${attrs.d}`;
    else out.push({ ...attrs });
  }
  return out;
}

/**
 * Normalize one Figma export into a publishable icon.
 * Root carries stroke/cap/join so children stay minimal and consumers can
 * override strokeWidth on the root — the property Lucide's absoluteStrokeWidth needs.
 */
export function normalize(source, { label = 'icon', strokeWidth = 2 } = {}) {
  const { shapes } = readSvg(source, label);
  if (!shapes.length) throw new Error(`${label}: no drawable shapes`);

  const anyStroked = shapes.some((s) => s.attrs.stroke && s.attrs.stroke !== 'none');
  const body = mergeAdjacent(shapes.flatMap((s) => emitShape(s, strokeWidth, anyStroked)))
    .map(serialize)
    .join('\n');

  const rootAttrs = [
    'xmlns="http://www.w3.org/2000/svg"',
    'width="24"',
    'height="24"',
    'viewBox="0 0 24 24"',
    'fill="none"',
  ];
  if (anyStroked) {
    rootAttrs.push(
      'stroke="currentColor"',
      `stroke-width="${strokeWidth}"`,
      'stroke-linecap="round"',
      'stroke-linejoin="round"', // the attribute the Figma exports never carried
    );
  }
  return `<svg ${rootAttrs.join(' ')}>\n${body}\n</svg>\n`;
}

/**
 * Geometry report for one icon: visual bounds including stroke, padding, and
 * whether the drawing encloses a fillable region.
 */
export function inspect(source, label = 'icon') {
  const { root, shapes } = readSvg(source, label);
  const rootSW = parseFloat(root['stroke-width'] ?? '0') || 0;
  const rootStroked = root.stroke && root.stroke !== 'none';

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  let fillable = false;
  let hasArc = false;

  for (const s of shapes) {
    const d = shapeToPath(s);
    if (!d) continue;
    const bb = pathBBox(d);
    if (!bb) continue;

    const strokedHere = s.attrs.stroke ? s.attrs.stroke !== 'none' : rootStroked;
    const sw = s.attrs['stroke-width'] ? parseFloat(s.attrs['stroke-width']) : rootSW;
    const half = strokedHere ? sw / 2 : 0;

    x0 = Math.min(x0, bb[0] - half); y0 = Math.min(y0, bb[1] - half);
    x1 = Math.max(x1, bb[2] + half); y1 = Math.max(y1, bb[3] + half);

    if (enclosesArea(d)) fillable = true;
    if (subpaths(d).hasArc && s.tag === 'path') hasArc = true;
  }

  if (!Number.isFinite(x0)) return null;
  const pads = { top: y0, bottom: 24 - y1, left: x0, right: 24 - x1 };
  return {
    width: x1 - x0,
    height: y1 - y0,
    pads,
    minPad: Math.min(pads.top, pads.bottom, pads.left, pads.right),
    skew: Math.max(Math.abs(pads.top - pads.bottom), Math.abs(pads.left - pads.right)),
    fillable,
    hasArc,
    viewBox: root.viewBox ?? null,
  };
}
