/**
 * Path surgery for the 0.8.0 redraws: a token-level rewriter that leaves every
 * number it does not touch spelled exactly as `raw/` spells it.
 *
 * Written rather than reached for because the two edits here are translations
 * of PART of a drawing, and this file's own history says what a regex over
 * `num num` pairs does to those: it skips `H` and `V`, which carry one number,
 * and the vertex they place stays behind while the rest of the shape moves.
 * So the tokeniser knows which argument slots of each command are x and which
 * are y, and an `H`'s implicit y follows the point before it for free.
 */

/** Split path data into commands. Absolute only; `raw/` carries nothing else. */
export function tokenize(d) {
  const out = []
  const re = /([MLHVCZ])([^MLHVCZ]*)/gi
  let m
  while ((m = re.exec(d))) {
    const cmd = m[1]
    const args = (m[2].match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number)
    out.push({ cmd, args, raw: m[2] })
  }
  return out
}

/** Which argument slots of a command are x, and which are y. */
const SLOTS = {
  M: ["x", "y"],
  L: ["x", "y"],
  H: ["x"],
  V: ["y"],
  C: ["x", "y", "x", "y", "x", "y"],
  Z: [],
}

/** Trim a computed number the way the raw files spell one. */
export const fmt = (v) => {
  const s = (+v.toFixed(6)).toString()
  return s === "-0" ? "0" : s
}

/** Walk the tokens, reporting each subpath with its on-curve points. */
export function subpaths(d) {
  const toks = tokenize(d)
  const out = []
  let cur = null
  let x = 0
  let y = 0
  for (const [i, t] of toks.entries()) {
    if (t.cmd === "M") {
      cur = { from: i, to: i, pts: [] }
      out.push(cur)
    }
    if (!cur) continue
    cur.to = i
    const slots = SLOTS[t.cmd.toUpperCase()]
    for (let k = 0; k < t.args.length; k += Math.max(1, slots.length)) {
      const chunk = t.args.slice(k, k + slots.length)
      slots.forEach((s, j) => {
        if (s === "x") x = chunk[j]
        else y = chunk[j]
      })
      if (t.cmd !== "Z") cur.pts.push([x, y])
    }
  }
  for (const s of out) {
    s.minX = Math.min(...s.pts.map((p) => p[0]))
    s.maxX = Math.max(...s.pts.map((p) => p[0]))
    s.minY = Math.min(...s.pts.map((p) => p[1]))
    s.maxY = Math.max(...s.pts.map((p) => p[1]))
  }
  return { toks, out }
}

/** Re-emit a token stream, using `edit` to rewrite an argument. */
export function emit(toks, edit) {
  let out = ""
  for (const [i, t] of toks.entries()) {
    const slots = SLOTS[t.cmd.toUpperCase()]
    if (t.cmd === "Z") {
      out += "Z"
      continue
    }
    const args = t.args.map((v, j) => edit(v, slots[j % slots.length], i, j))
    out += t.cmd + args.map(fmt).join(" ")
  }
  /* `M6 5H18` rather than `M6 5 H18`: the raw files run a command letter
     straight onto the number before it, and a diff that is only whitespace
     still reads as a changed file to anyone opening it. */
  return out.replace(/ ([MLHVCZ])/g, "$1")
}

/** De Casteljau. Returns the two halves of a cubic split at `t`. */
export function splitCubic(p, t) {
  const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  const [p0, p1, p2, p3] = p
  const a = L(p0, p1)
  const b = L(p1, p2)
  const c = L(p2, p3)
  const dd = L(a, b)
  const e = L(b, c)
  const f = L(dd, e)
  return [[p0, a, dd, f], [f, e, c, p3]]
}

/** The point on a cubic at `t`. */
export const atT = (p, t) => splitCubic(p, t)[0][3]

/**
 * The `t` at which a cubic crosses `f(point) === 0`.
 *
 * Bisection rather than a cubic solve: the function here is always `x - y` or
 * `x + y`, which is monotonic along one of these corner arcs, and a bisection
 * cannot pick the wrong root of three.
 */
export function solveT(p, f) {
  let lo = 0
  let hi = 1
  const s = Math.sign(f(atT(p, 0)))
  if (s === Math.sign(f(atT(p, 1)))) throw new Error("no crossing on this segment")
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (Math.sign(f(atT(p, mid))) === s) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/** A circular arc as cubics, split so no piece exceeds 90 degrees. */
export function arc(cx, cy, r, a0, a1, pieces) {
  const step = (a1 - a0) / pieces
  const k = (4 / 3) * Math.tan(step / 4)
  let out = ""
  for (let i = 0; i < pieces; i++) {
    const s = a0 + step * i
    const e = s + step
    const p0 = [cx + r * Math.cos(s), cy + r * Math.sin(s)]
    const p3 = [cx + r * Math.cos(e), cy + r * Math.sin(e)]
    const c1 = [p0[0] - k * r * Math.sin(s), p0[1] + k * r * Math.cos(s)]
    const c2 = [p3[0] + k * r * Math.sin(e), p3[1] - k * r * Math.cos(e)]
    out += `C${[c1, c2, p3].flat().map(fmt).join(" ")}`
  }
  return out
}
