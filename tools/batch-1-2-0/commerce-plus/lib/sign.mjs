// The plus in its 6-unit box, and the probe that says whether a body can host the box.
import { fmt } from './path.mjs';

/**
 * The plus on the box [x0, y0]..[x0 + 6, y0 + 6] (compounds.md: `M19 16V22M16 19H22`
 * on 16..22, translated as a block). Sharp pushes each of the four free ends a
 * unit out, so the butt face lands where the round cap reached (`user-plus`,
 * `tablet-plus`, `map-pin-plus` sharp).
 */
export function plus(x0, y0, sharp) {
  const cx = x0 + 3, cy = y0 + 3, f = fmt;
  return sharp
    ? `M${f(cx)} ${f(y0 - 1)}L${f(cx)} ${f(y0 + 7)}M${f(x0 - 1)} ${f(cy)}L${f(x0 + 7)} ${f(cy)}`
    : `M${f(cx)} ${f(y0)}V${f(y0 + 6)}M${f(x0)} ${f(cy)}H${f(x0 + 6)}`;
}
/** The sign's painted box: the 6 box plus the stroke's half-width all round. */
export const signInk = (x0, y0) => [x0 - 1, y0 - 1, x0 + 7, y0 + 7];

/** Distance from a point to an axis-aligned box (0 inside). */
export function distToBox([x, y], [x0, y0, x1, y1]) {
  const dx = Math.max(x0 - x, 0, x - x1), dy = Math.max(y0 - y, 0, y - y1);
  return Math.hypot(dx, dy);
}
