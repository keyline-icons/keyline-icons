// Signs for the money-bag compounds, each grown by bisection inside the body (the cloud rule:
// largest size whose painted gap to the outline stays >= CLEAR, rounded down to a twentieth).
import * as D from './d14.mjs';
import { outlines, minGap, pt } from './lib.mjs';
export const SIGN = {
  x: (c, s) => `M${12 - 3 * s} ${c - 3 * s}L${12 + 3 * s} ${c + 3 * s}M${12 + 3 * s} ${c - 3 * s}L${12 - 3 * s} ${c + 3 * s}`,
  plus: (c, s) => `M12 ${c - 3 * s}L12 ${c + 3 * s}M${12 - 3 * s} ${c}L${12 + 3 * s} ${c}`,
  minus: (c, s) => `M${12 - 3 * s} ${c}L${12 + 3 * s} ${c}`,
  check: (c, s) => `M${12 - 3 * s} ${c}L${12 - s} ${c + 2 * s}L${12 + 3 * s} ${c - 2 * s}`,
  // the badge / circle dollar (8 x 12 path about 12,12) scaled about its centre
  dollar: (c, s) => {
    const P = (x, y) => pt([12 + (x - 12) * s, c + (y - 12) * s]);
    return `M${P(12, 6)}L${P(12, 18)}M${P(14.5, 7)}L${P(10.5, 7)}C${P(9.1193, 7)} ${P(8, 8.1193)} ${P(8, 9.5)}C${P(8, 10.8807)} ${P(9.1193, 12)} ${P(10.5, 12)}L${P(13.5, 12)}C${P(14.8807, 12)} ${P(16, 13.1193)} ${P(16, 14.5)}C${P(16, 15.8807)} ${P(14.8807, 17)} ${P(13.5, 17)}L${P(9.5, 17)}`;
  },
};
const gap = (a, b) => { let m = Infinity; for (const p of outlines(a, 96)) for (const q of outlines(b, 96)) m = Math.min(m, minGap(p, q)); return m - 2; };
export function fitSigns(o, clear = { x: 2, plus: 2, minus: 2, check: 2, dollar: 2 }, c = null) {
  const body = D.dOf(D.moneyBag(false, o));
  const cc = c ?? ((o.ny ?? 8) + 1 + 20) / 2;
  const out = { c: cc };
  for (const [k, f] of Object.entries(SIGN)) {
    let lo = 0.2, hi = 1.8;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (gap(f(cc, m), body) >= clear[k]) lo = m; else hi = m; }
    out[k] = Math.floor(lo * 20 + 1e-9) / 20;
  }
  return out;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const spec of process.argv.slice(2)) {
    const o = {}; for (const kv of spec.split(';')) { if (!kv) continue; const [k, v] = kv.split('='); o[k] = JSON.parse(v); }
    const a = fitSigns(o), b = fitSigns(o, { x: 2, plus: 2, minus: 2, check: 2, dollar: 1 });
    console.log(spec.padEnd(44), 'centre', a.c, '| x', a.x, 'plus', a.plus, 'minus', a.minus, 'check', a.check, '| dollar@2', a.dollar, 'dollar@1', b.dollar, `(bars ${(5 * b.dollar).toFixed(2)} apart, clear ${(5 * b.dollar - 2).toFixed(2)}, height ${(12 * b.dollar).toFixed(2)})`);
  }
}
