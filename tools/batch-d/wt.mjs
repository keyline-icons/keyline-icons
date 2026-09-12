/** Wind-turbine candidates, rendered side by side before anything is chosen. */
import { writeFileSync } from 'node:fs';
const n = (v) => String(Math.round(v * 1e4) / 1e4);
const P = (p) => `${n(p[0])} ${n(p[1])}`;
const rad = (a) => (a * Math.PI) / 180;
const on = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];
const K = 0.5522847498307936;
const circle = (c, r) => {
  const p = [on(c, r, 0), on(c, r, 90), on(c, r, 180), on(c, r, 270)];
  const k = K * r;
  return `M${P(p[0])}C${P([p[0][0], p[0][1] + k])} ${P([p[1][0] + k, p[1][1]])} ${P(p[1])}`
    + `C${P([p[1][0] - k, p[1][1]])} ${P([p[2][0], p[2][1] + k])} ${P(p[2])}`
    + `C${P([p[2][0], p[2][1] - k])} ${P([p[3][0] - k, p[3][1]])} ${P(p[3])}`
    + `C${P([p[3][0] + k, p[3][1]])} ${P([p[0][0], p[0][1] - k])} ${P(p[0])}Z`;
};
const GROUND = 'M2 22L22 22';

/** blades from `from` to `to` radius at the given screen angles */
const rotor = (hub, angles, r0, r1) => angles.map((a) => `M${P(on(hub, r0, a))}L${P(on(hub, r1, a))}`).join('');

const CANDIDATES = {
  'B ring 2.5, blades 2.5-7': {
    stroke: rotor([12, 9], [270, 30, 150], 2.5, 7) + `M12 11.5L12 22` + GROUND + circle([12, 9], 2.5),
  },
  'F ring 2.5, blades 3.5-7.5, hub 9.5': {
    stroke: rotor([12, 9.5], [270, 30, 150], 3.5, 7.5) + `M12 13L12 22` + GROUND + circle([12, 9.5], 2.5),
  },
  'G bead hub, tilted 10, blades 8': {
    stroke: rotor([12, 10], [260, 20, 140], 0, 8) + `M12 10L12 22` + GROUND,
    solid: circle([12, 10], 1.5),
  },
  'H ring 2.5, tilted 10': {
    stroke: rotor([12, 9.5], [260, 20, 140], 2.5, 7.5) + `M12 12L12 22` + GROUND + circle([12, 9.5], 2.5),
  },
  'J ring 2.5, no ground, feet': {
    stroke: rotor([12, 9], [270, 30, 150], 2.5, 7) + `M12 11.5L12 19M12 19L8 22M12 19L16 22` + circle([12, 9], 2.5),
  },
};
const cells = Object.entries(CANDIDATES).flatMap(([label, c]) => [320, 32, 24, 16].map((sz) =>
  `<div><svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none"><path d="${c.stroke}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${c.solid ? `<path d="${c.solid}" fill="black"/>` : ''}</svg>${sz === 320 ? `<div class="l">${label}</div>` : ''}</div>`));
writeFileSync(process.argv[2], `<style>body{margin:0;padding:14px;background:#fff;font:11px Inter,system-ui;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}div{color:#888}.l{margin-top:4px;color:#111;font-weight:600}</style>${cells.join('')}`);
