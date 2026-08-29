// node render-one.mjs <name> <out.png>  — one icon, rounded vs sharp, 3 styles, 220px
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const SC = '/private/tmp/claude-501/-Users-zafarismatullaev-Documents-GitHub-keyline-icons/136c1239-e315-47fb-a39c-f9cf9d53c3be/scratchpad';
const n = process.argv[2], out = process.argv[3] || `${SC}/one-${n}.png`;
const ic = (p) => existsSync(p) ? readFileSync(p, 'utf8').replace(/<svg /, '<svg class="ic" ') : '<div class="ic"></div>';
const cell = (label, p) => `<figure><div class=box>${ic(p)}</div><figcaption>${label}</figcaption></figure>`;
writeFileSync(`${SC}/one.html`, `<!doctype html><meta charset=utf-8><style>
body{background:#fff;margin:10px;font:12px ui-sans-serif;color:#111}
.row{display:flex;gap:8px}figure{margin:0;text-align:center}
.box{padding:2px;background:#fafafa}.ic{width:220px;height:220px;color:#111}
figcaption{font-size:11px;color:#666}</style><div class=row>
${cell('rounded stroke', `${R}/stroke/${n}.svg`)}${cell('SHARP stroke', `${SC}/mid/${n}.svg`)}
${cell('rounded duotone', `${R}/duotone/${n}.svg`)}${cell('SHARP duotone', `${SC}/duotone-mid/${n}.svg`)}
${cell('rounded fill', `${R}/fill/${n}.svg`)}${cell('SHARP fill', `${SC}/fill-mid/${n}.svg`)}</div>`);
execFileSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless', '--disable-gpu', `--screenshot=${out}`, '--window-size=1420,290', '--hide-scrollbars', `${SC}/one.html`], { stdio: 'ignore' });
console.log(out);
