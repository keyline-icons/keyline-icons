/**
 * Path geometry for the icon pipeline.
 *
 * Two jobs:
 *   1. Exact bounding boxes — including cubic extrema, so optical size is measured
 *      from the curve itself rather than from control points (which overshoot) or
 *      on-curve endpoints (which undershoot at a rounded vertex).
 *   2. Subpath closure + signed area — the input to the fillability classifier.
 */

const TOKEN = /([MmLlHhVvCcSsQqTtAaZz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi;

/** Split a `d` attribute into `{ cmd, args }` records with implicit repeats expanded. */
export function tokenize(d) {
  const raw = [];
  for (const m of d.matchAll(TOKEN)) {
    raw.push(m[1] ? { cmd: m[1] } : { num: parseFloat(m[2]) });
  }
  const ARITY = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
  const out = [];
  let cmd = null;
  for (let i = 0; i < raw.length; ) {
    if (raw[i].cmd) {
      cmd = raw[i].cmd;
      i++;
      if (cmd.toUpperCase() === 'Z') {
        out.push({ cmd, args: [] });
        continue;
      }
    }
    if (!cmd) break;
    const n = ARITY[cmd.toUpperCase()];
    const args = [];
    while (args.length < n && i < raw.length && !raw[i].cmd) args.push(raw[i++].num);
    if (args.length < n) break;
    out.push({ cmd, args });
    // An implicit repeat after M continues as L (m -> l).
    if (cmd === 'M') cmd = 'L';
    else if (cmd === 'm') cmd = 'l';
  }
  return out;
}

/** Real roots of at² + bt + c within (0,1). Used for cubic extrema. */
function rootsInUnit(a, b, c) {
  const out = [];
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) > 1e-12) out.push(-c / b);
  } else {
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      out.push((-b + s) / (2 * a), (-b - s) / (2 * a));
    }
  }
  return out.filter((t) => t > 0 && t < 1);
}

function cubicAt(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

/** Min/max of one cubic component, evaluated at endpoints plus interior extrema. */
function cubicExtrema(p0, p1, p2, p3) {
  const vals = [p0, p3];
  // derivative: 3[(-p0+3p1-3p2+p3)t² + 2(p0-2p1+p2)t + (p1-p0)]
  const a = -p0 + 3 * p1 - 3 * p2 + p3;
  const b = 2 * (p0 - 2 * p1 + p2);
  const c = p1 - p0;
  for (const t of rootsInUnit(a, b, c)) vals.push(cubicAt(p0, p1, p2, p3, t));
  return [Math.min(...vals), Math.max(...vals)];
}

/**
 * Walk a path into subpaths.
 * Each subpath: { closed, pts (on-curve, flattened for area), bbox }.
 * Arcs are approximated by their endpoints — none of the Figma exports use `A`,
 * and `hasArc` is reported so the linter can flag it rather than silently guess.
 */
export function subpaths(d, steps = 8) {
  const toks = tokenize(d);
  const subs = [];
  let cur = null;
  let x = 0, y = 0, sx = 0, sy = 0;
  let px = 0, py = 0; // previous control point, for S/T smoothing
  let hasArc = false;

  const start = (nx, ny) => {
    cur = { closed: false, pts: [[nx, ny]], min: [nx, ny], max: [nx, ny] };
    subs.push(cur);
  };
  const grow = (bx0, by0, bx1, by1) => {
    if (!cur) return;
    cur.min = [Math.min(cur.min[0], bx0), Math.min(cur.min[1], by0)];
    cur.max = [Math.max(cur.max[0], bx1), Math.max(cur.max[1], by1)];
  };
  const lineTo = (nx, ny) => {
    if (!cur) start(x, y);
    cur.pts.push([nx, ny]);
    grow(Math.min(x, nx), Math.min(y, ny), Math.max(x, nx), Math.max(y, ny));
    x = nx; y = ny;
  };
  const curveTo = (x1, y1, x2, y2, nx, ny) => {
    if (!cur) start(x, y);
    const [bx0, bx1] = cubicExtrema(x, x1, x2, nx);
    const [by0, by1] = cubicExtrema(y, y1, y2, ny);
    grow(bx0, by0, bx1, by1);
    // Flatten for the area test: sample the curve rather than trust endpoints.
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      cur.pts.push([cubicAt(x, x1, x2, nx, t), cubicAt(y, y1, y2, ny, t)]);
    }
    px = x2; py = y2;
    x = nx; y = ny;
  };

  for (const { cmd, args } of toks) {
    const rel = cmd === cmd.toLowerCase();
    const U = cmd.toUpperCase();
    const ax = (i) => (rel ? x + args[i] : args[i]);
    const ay = (i) => (rel ? y + args[i] : args[i]);

    if (U === 'M') {
      const mx = ax(0), my = ay(1);
      x = mx; y = my; sx = x; sy = y;
      start(x, y);
      px = x; py = y;
    } else if (U === 'L') lineTo(ax(0), ay(1));
    else if (U === 'H') lineTo(rel ? x + args[0] : args[0], y);
    else if (U === 'V') lineTo(x, rel ? y + args[0] : args[0]);
    else if (U === 'C') curveTo(ax(0), ay(1), ax(2), ay(3), ax(4), ay(5));
    else if (U === 'S') {
      // reflect the previous control point through the current point
      curveTo(2 * x - px, 2 * y - py, ax(0), ay(1), ax(2), ay(3));
    } else if (U === 'Q' || U === 'T') {
      // promote quadratic to cubic
      const qx = U === 'Q' ? ax(0) : 2 * x - px;
      const qy = U === 'Q' ? ay(1) : 2 * y - py;
      const ex = U === 'Q' ? ax(2) : ax(0);
      const ey = U === 'Q' ? ay(3) : ay(1);
      curveTo(x + (2 / 3) * (qx - x), y + (2 / 3) * (qy - y),
              ex + (2 / 3) * (qx - ex), ey + (2 / 3) * (qy - ey), ex, ey);
    } else if (U === 'A') {
      hasArc = true;
      lineTo(ax(5), ay(6));
    } else if (U === 'Z') {
      if (cur) {
        cur.closed = true;
        cur.pts.push([sx, sy]);
      }
      x = sx; y = sy;
      cur = null;
    }
    if (U !== 'C' && U !== 'S' && U !== 'Q' && U !== 'T') { px = x; py = y; }
  }
  return { subs, hasArc };
}

/** Shoelace area of a flattened subpath, absolute value. */
export function area(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    a += x0 * y1 - x1 * y0;
  }
  return Math.abs(a) / 2;
}

/** Exact bbox of a `d` string: [minX, minY, maxX, maxY], or null when empty. */
export function pathBBox(d) {
  const { subs } = subpaths(d);
  if (!subs.length) return null;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const s of subs) {
    x0 = Math.min(x0, s.min[0]); y0 = Math.min(y0, s.min[1]);
    x1 = Math.max(x1, s.max[0]); y1 = Math.max(y1, s.max[1]);
  }
  return [x0, y0, x1, y1];
}

/**
 * Is point p inside the closed polygon poly? Ray cast along +x.
 *
 * Used to tell a shape layered under another from one sitting beside it: the
 * clear-space rule is about neighbours, and a muted duotone disc that swallows
 * the whole glyph is a backdrop, not a neighbour.
 */
export function contains(poly, p) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

/** Convex hull of a point set, counter-clockwise (Andrew's monotone chain). */
export function hull(pts) {
  if (pts.length < 3) return pts.slice();
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (src) => {
    const h = [];
    for (const q of src) {
      while (h.length >= 2 && cross(h[h.length - 2], h[h.length - 1], q) <= 0) h.pop();
      h.push(q);
    }
    h.pop();
    return h;
  };
  return [...half(p), ...half(p.reverse())];
}

/**
 * Largest distance between any two points of a drawing.
 *
 * How wide a glyph *reads*, as opposed to how wide its bounding box is. A
 * diagonal arrow drawn at 14x14 spans 19 units along its own axis, so measuring
 * its box understates it by a third — and diagonal glyphs are deliberately
 * drawn smaller so they do not look oversized next to axis-aligned ones.
 *
 * Taken over the convex hull, since the farthest pair always lies on it.
 */
export function diameter(pts) {
  const h = hull(pts);
  let best = 0;
  for (let i = 0; i < h.length; i++)
    for (let j = i + 1; j < h.length; j++)
      best = Math.max(best, Math.hypot(h[i][0] - h[j][0], h[i][1] - h[j][1]));
  return best;
}

/** Distance from point p to segment ab. */
function pointSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = dx * dx + dy * dy;
  let t = len === 0 ? 0 : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Do segments ab and cd cross? Used so overlapping shapes report a gap of 0. */
function crosses(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}

/**
 * Closest approach between two flattened outlines, in grid units.
 *
 * Measured segment-to-segment rather than point-to-point: a straight edge is
 * stored as just its two endpoints, so sampling vertices alone would report the
 * distance to the far end of a long edge instead of to the edge itself.
 * Returns 0 when the outlines cross, which is how deliberately overlapping
 * shapes (a muted duotone layer under its own stroke) opt out of the check.
 */
export function minGap(a, b) {
  let best = Infinity;
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < b.length - 1; j++) {
      if (crosses(a[i], a[i + 1], b[j], b[j + 1])) return 0;
      best = Math.min(
        best,
        pointSeg(a[i], b[j], b[j + 1]), pointSeg(a[i + 1], b[j], b[j + 1]),
        pointSeg(b[j], a[i], a[i + 1]), pointSeg(b[j + 1], a[i], a[i + 1])
      );
    }
  }
  return best;
}

/**
 * Flattened outlines of a `d` string, one point array per subpath.
 *
 * Sampled far more finely than the area test needs, because distance between
 * two curves is measured against these chords: at 8 samples a quarter-circle
 * chord cuts about 0.02 units inside the true curve, which is enough to report
 * a clean 2-unit gap as 1.98 and turn a passing icon into a warning.
 */
export function outlines(d, steps = 48) {
  return subpaths(d, steps).subs.map((s) => s.pts);
}

/**
 * Walk each open subpath in from both ends by `by`, leaving closed ones alone.
 *
 * The painted region of a butt-capped run is a rectangle; the same run trimmed
 * by the half-width and then given round caps is the stadium inscribed in it.
 * They agree everywhere except the rectangle's four corners, which stand
 * `h(√2 − 1)` proud of the stadium — the same quantity `CAP_CORNER` allows for
 * elsewhere, so every rule here understates a squared cap by the same bounded
 * amount rather than each one being wrong in its own way.
 */
export function trimFreeEnds(subs, by) {
  const walk = (pts) => {
    let left = by, i = 0;
    const out = pts.map((p) => [...p]);
    while (i < out.length - 1 && left > 0) {
      const [ax, ay] = out[i], [bx, by2] = out[i + 1];
      const len = Math.hypot(bx - ax, by2 - ay);
      if (len >= left) {
        const t = left / len;
        out[i] = [ax + (bx - ax) * t, ay + (by2 - ay) * t];
        return out.slice(i);
      }
      left -= len; i++;
    }
    return out.slice(i);
  };
  return subs.map((s) => {
    if (s.closed || by <= 0 || s.pts.length < 2) return s.pts;
    const trimmed = walk(walk(s.pts).reverse()).reverse();
    // A run shorter than the two caps trims to nothing. Its ink is a bar the
    // width of the stroke and the untrimmed points are the honest answer.
    return trimmed.length >= 2 ? trimmed : s.pts;
  });
}

/**
 * Bounding box of a stroked path as it actually paints.
 *
 * Round joins put a disc of the half-width at every vertex, so a closed subpath,
 * and every interior vertex of an open one, grows the path's own box by the half
 * width in all four directions. A free END is where the cap decides: `round`
 * puts the same disc there, `butt` stops the ink dead on the endpoint and
 * spreads it only across the line, half a width either side of the tangent.
 *
 * That difference is a whole unit on a 2-unit stroke, and measuring a
 * butt-capped drawing with the round-cap assumption is not a rounding error. It
 * reports `activity` as 24 units wide inside a 24 canvas with no padding at all,
 * for a drawing whose ink is the same 22 units its rounded sibling paints — the
 * sharp treatment moves the endpoint out by a unit precisely so the butt cap
 * lands where the round cap did. Read the wrong way, every one of those reads as
 * a drawing that overflows.
 *
 * A segment's own rectangle needs no separate pass: its corners are the
 * endpoints offset by the half-width along one axis at most, so its box always
 * sits inside the boxes of the two vertices it joins.
 */
export function strokedBBox(d, half, cap = 'butt', steps = 48) {
  const { subs } = subpaths(d, steps);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const note = (px, py) => {
    x0 = Math.min(x0, px); y0 = Math.min(y0, py);
    x1 = Math.max(x1, px); y1 = Math.max(y1, py);
  };

  const trimmed = trimFreeEnds(subs, cap === 'butt' ? half : 0);

  subs.forEach((sub, si) => {
    if (!sub.pts.length) return;

    if (sub.closed || cap !== 'butt') {
      for (const [px, py] of sub.pts) { note(px - half, py - half); note(px + half, py + half); }
      return;
    }

    // Within the two cap planes the ink is the ordinary disc, so the trimmed run
    // discs exactly. Outside them there is none, and the caps themselves are the
    // two bars. Discing the untrimmed run instead reaches a half-width back
    // along a curve's own tangent, past a plane that paints nothing: `wifi-x`'s
    // muted arc read 0.44 from the canvas edge for ink that stops at 0.59.
    for (const [px, py] of trimmed[si]) { note(px - half, py - half); note(px + half, py + half); }

    for (const end of [0, sub.pts.length - 1]) {
      const [px, py] = sub.pts[end];
      const [qx, qy] = end === 0 ? (sub.pts[1] ?? sub.pts[0]) : sub.pts[end - 1];
      const dx = qx - px, dy = qy - py;
      const len = Math.hypot(dx, dy);
      if (!len) { note(px, py); continue; }
      const nx = (-dy / len) * half, ny = (dx / len) * half;
      note(px + nx, py + ny);
      note(px - nx, py - ny);
    }
  });
  return Number.isFinite(x0) ? [x0, y0, x1, y1] : null;
}

/**
 * Radii of rounded corners where two straight edges meet through a fillet.
 *
 * Only line-curve-line corners are reported. That is deliberate: the design
 * guide's radius rule governs rectilinear shapes, and a curve arriving into a
 * fillet is a dome or a lozenge, whose "radius" is the drawing itself rather
 * than a corner treatment. Each entry carries the subpath's own size, because
 * the rule depends on how big the shape is.
 */
export function roundedCorners(d) {
  const toks = tokenize(d);
  const out = [];
  let segs = [], x = 0, y = 0, sx = 0, sy = 0, min = null, max = null;

  const note = (p) => {
    min = min ? [Math.min(min[0], p[0]), Math.min(min[1], p[1])] : [...p];
    max = max ? [Math.max(max[0], p[0]), Math.max(max[1], p[1])] : [...p];
  };
  const flush = (closed) => {
    if (segs.length >= 3 && min) {
      const size = Math.max(max[0] - min[0], max[1] - min[1]);
      const n = segs.length;
      for (let i = 0; i < n; i++) {
        const prev = segs[(i - 1 + n) % n], cur = segs[i], next = segs[(i + 1) % n];
        if (cur.type !== 'cubic' || prev.type !== 'line' || next.type !== 'line') continue;
        if (!closed && (i === 0 || i === n - 1)) continue;
        const u = [prev.p1[0] - prev.p0[0], prev.p1[1] - prev.p0[1]];
        const v = [next.p1[0] - next.p0[0], next.p1[1] - next.p0[1]];
        const lu = Math.hypot(...u), lv = Math.hypot(...v);
        if (lu < 1e-6 || lv < 1e-6) continue;
        // A lone arc between two straight runs of at most a unit, open at both
        // ends, is a sharp free arc with its two stubs, not a corner: a free arc
        // end takes a unit of tangent so its butt cap paints where the round
        // cap's disc reached, and a quarter arc between two such stubs would
        // otherwise read as a corner of the arc's own radius
        // (circle-progress-quarter at 10, cursor-signal at 8). Open runs of
        // exactly three segments only: on a closed ring the flats between
        // settings' gear teeth are under a unit and are real fillet edges.
        if (!closed && n === 3 && i === 1 && lu <= 1.001 && lv <= 1.001) continue;
        // Perpendicular edges only — a fillet between edges meeting at any other
        // angle is not the square corner the radius rule is written for.
        if (Math.abs((u[0] * v[0] + u[1] * v[1]) / (lu * lv)) > 1e-3) continue;
        // And a fillet leaves the incoming edge along its own direction and
        // meets the outgoing edge along that one. Without this, any curve that
        // happens to sit between two perpendicular lines is read as a corner:
        // the globe compounds' duotone plate joins its equator to a 1-unit stub
        // with the meridian, and that reported a 10-unit radius it does not have.
        const parallel = (a, b) => {
          const la = Math.hypot(...a), lb = Math.hypot(...b);
          return la > 1e-6 && lb > 1e-6 && Math.abs((a[0] * b[1] - a[1] * b[0]) / (la * lb)) < 1e-2;
        };
        if (!parallel([cur.p1[0] - cur.p0[0], cur.p1[1] - cur.p0[1]], u)) continue;
        if (!parallel([cur.p3[0] - cur.p2[0], cur.p3[1] - cur.p2[1]], v)) continue;
        // The corner is where the two edges would have met; the radius is how
        // far back along an edge the fillet starts.
        const t = ((cur.p3[0] - cur.p0[0]) * v[0] + (cur.p3[1] - cur.p0[1]) * v[1]) / (lv * lv);
        const corner = [cur.p0[0] + v[0] * t, cur.p0[1] + v[1] * t];
        out.push({ radius: Math.hypot(cur.p0[0] - corner[0], cur.p0[1] - corner[1]), size });
      }
    }
    segs = []; min = null; max = null;
  };

  for (const { cmd, args } of toks) {
    const rel = cmd === cmd.toLowerCase(), U = cmd.toUpperCase();
    const ax = (i) => (rel ? x + args[i] : args[i]);
    const ay = (i) => (rel ? y + args[i] : args[i]);
    if (U === 'M') {
      flush(false);
      x = ax(0); y = ay(1); sx = x; sy = y; note([x, y]);
    } else if (U === 'L' || U === 'H' || U === 'V') {
      const nx = U === 'V' ? x : U === 'H' ? (rel ? x + args[0] : args[0]) : ax(0);
      const ny = U === 'H' ? y : U === 'V' ? (rel ? y + args[0] : args[0]) : ay(1);
      segs.push({ type: 'line', p0: [x, y], p1: [nx, ny] });
      x = nx; y = ny; note([x, y]);
    } else if (U === 'C') {
      const p3 = [ax(4), ay(5)];
      segs.push({ type: 'cubic', p0: [x, y], p1: [ax(0), ay(1)], p2: [ax(2), ay(3)], p3 });
      x = p3[0]; y = p3[1]; note([x, y]);
    } else if (U === 'Z') {
      if (x !== sx || y !== sy) segs.push({ type: 'line', p0: [x, y], p1: [sx, sy] });
      flush(true);
      x = sx; y = sy;
    } else if (args.length) {
      // Anything else (arcs, quadratics) breaks the run rather than guessing.
      flush(false);
      x = args[args.length - 2] ?? x; y = args[args.length - 1] ?? y;
    }
  }
  flush(false);
  return out;
}

/**
 * Does this path enclose a fillable region?
 * A closed subpath whose area clears `minArea` counts. The threshold exists to
 * ignore incidental closed dots — a lock keyhole or an alert's period — which are
 * closed but are not what makes the glyph fillable.
 */
export function enclosesArea(d, minArea = 8) {
  const { subs } = subpaths(d);
  return subs.some((s) => s.closed && area(s.pts) >= minArea);
}
