// Build plan.json for the catalog matrix migration.
// Card row lists transcribed from the live Catalog reads (29 Aug 2026);
// every list is cross-checked against raw/ and icons/ so a transcription
// error throws instead of shipping.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
const REPO = new URL('../../..', import.meta.url).pathname.replace(/\/$/, '');
const S = `${REPO}/previews/sharp-history`;

// name *NEW* markers preserved from the file
const CARDS = {
  Actions: ['alert *','check','double-check','download','eye','eye-off','filter','heart','heart-hand *','heart-off','info','lock','minus','more-horizontal','more-vertical','octagon-alert','octagon-x *','plus','question','lightbulb *','lightbulb-on *','star','triangle-alert','unlock','shield *','shield-check *','shield-plus *','shield-minus *','shield-x *','upload','x','ban *'],
  Arrows: ['arrow-down','arrow-down-dashed-panel','arrow-down-left','arrow-down-left-dashed-panel','arrow-down-narrow-wide','arrow-down-right','arrow-down-right-dashed-panel','arrow-down-wide-narrow','arrow-in-down-dashed-panel','arrow-in-down-left-dashed-panel','arrow-in-down-right-dashed-panel','arrow-in-left-dashed-panel','arrow-in-right-dashed-panel','arrow-in-up-dashed-panel','arrow-in-up-left-dashed-panel','arrow-in-up-right-dashed-panel','arrow-left','arrow-left-dashed-panel','arrow-right','arrow-right-dashed-panel','arrow-u-turn-left','arrow-u-turn-right','arrow-up','arrow-up-dashed-panel','arrow-up-left','arrow-up-left-dashed-panel','arrow-up-narrow-wide','arrow-up-right','arrow-up-right-dashed-panel','arrow-up-wide-narrow','bracket-arrow-down','bracket-arrow-left','bracket-arrow-right','bracket-arrow-up','expand-dashed-down-left','expand-dashed-down-left-box','expand-dashed-down-right','expand-dashed-down-right-box','expand-dashed-up-left','expand-dashed-up-left-box','expand-dashed-up-right','expand-dashed-up-right-box','refresh-ccw','refresh-cw','rotate-ccw','rotate-cw'],
  'Chevrons & Carets': ['caret-down','caret-left','caret-right','caret-up','chevron-down','chevron-left','chevron-right','chevron-up','chevrons-down','chevrons-left','chevrons-left-right','chevrons-right','chevrons-up','chevrons-up-down'],
  Charts: ['activity','bar-chart','bar-chart-2','bar-chart-2-down','bar-chart-2-horizontal-end','bar-chart-2-horizontal-start','bar-chart-down','bar-chart-horizontal-end','bar-chart-horizontal-start','loader *','signal','signal-high','signal-low','signal-medium','trending-down','trending-up'],
  Commerce: ['coupon','percent *','credit-card','gift','handbag','package','receipt','shopping-bag','shopping-cart','tag','tag-horizontal-start','tag-horizontal-end *','tag-horizontal-start-percent *','tag-horizontal-end-percent *','truck'],
  Controls: ['sliders-horizontal','sliders-vertical','sliders-2-horizontal *','sliders-2-vertical *','grip-horizontal *','grip-vertical *','power *','power-off *','toggle-off','toggle-on'],
  Devices: ['battery *','battery-full *','battery-low *','battery-medium *','bluetooth *','plug *','code','code-xml','database','monitor *','monitor-off *','server','smartphone','smartphone-arrow-down','smartphone-arrow-down-left','smartphone-arrow-in-down-right','smartphone-arrow-in-right','smartphone-arrow-in-up','smartphone-arrow-in-up-right','smartphone-arrow-left','smartphone-arrow-up-left','smartphone-check','smartphone-horizontal','smartphone-minus','smartphone-plus','smartphone-x','terminal','terminal-asterisk','terminal-cursor'],
  Files: ['archive','bin','circle-pen','copy','copy-plus *','file','file-arrow-down','file-arrow-left','file-arrow-right','file-arrow-up','file-check','file-image','file-minus','file-off','file-plus','file-spreadsheet','file-text','file-x','folder','folder-arrow-down','folder-arrow-left','folder-arrow-right','folder-arrow-up','folder-check','folder-minus','folder-open','folder-plus','folder-x','folders','paperclip','pen','pen-line','pen-off','square-pen'],
  Git: ['git-arrow-right','git-branch','git-branch-minus','git-branch-plus','git-check','git-commit-horizontal','git-commit-vertical','git-compare','git-compare-arrows','git-connection','git-fork','git-graph','git-join','git-merge','git-merge-conflict','git-pull-request','git-pull-request-arrow','git-pull-request-closed','git-pull-request-create','git-pull-request-create-arrow','git-pull-request-draft','git-pull-request-plus','git-refresh','git-return','git-x'],
  Layout: ['align-offset-bottom','align-offset-left','align-offset-right','align-offset-top','fullscreen *','fullscreen-exit *','grid-2x2 *','grid-2x3 *','grid-3x2 *','grid-3x3 *','grid-circles *','grid-circles-x *','grid-circles-check *','grid-squares *','grid-squares-x *','grid-squares-check *','layout-dashboard *','list-check','list-collapse','list-collapse-horizontal','list-minus','list-plus','list-sort','list-sort-horizontal','list-x','maximize *','menu','minimize *','panel-bottom','panel-bottom-close-dashed','panel-left','panel-left-close-dashed','panel-right','panel-right-close-dashed','panel-top','panel-top-close-dashed'],
  Mail: ['at','bell','bell-check','bell-dot','bell-minus','bell-off','bell-plus','bell-x','forward','inbox','mail','mail-check','mail-dot','mail-minus','mail-open','mail-plus','mail-x','message','message-check','message-dot','message-minus','message-off','message-plus','message-x','messages','reply','reply-all'],
  Maps: ['building *','compass','map','map-pin','map-pin-check','map-pin-minus','map-pin-off','map-pin-plus','map-pin-search','map-pin-x','route','route-off'],
  Media: ['audio-lines','camera','camera-off','captions *','cast *','fast-forward','gallery-horizontal *','gallery-horizontal-end *','gallery-horizontal-start *','gallery-vertical *','gallery-vertical-end *','gallery-vertical-start *','headphones','headphones-off','headset','headset-2','headset-off','image','image-arrow-down','image-arrow-left','image-arrow-right','image-arrow-up','image-check','image-minus','image-plus','image-x','images','list-music','list-video *','mic','megaphone *','mic-off','music-note','music-note-off','pause','picture-in-picture *','play','podcast *','queue *','record','repeat *','repeat-1 *','rewind','shuffle','skip-back','skip-forward','stop','subtitles *','volume','volume-low','volume-minus','volume-off','volume-plus','volume-x'],
  Pointers: ['cursor','cursor-off *','cursor-click','cursor-dashed-panel','cursor-panel','cursor-signal','cursor-text','cursor-window'],
  Shapes: ['circle','circle-dashed','circle-dashed-check','circle-dashed-full','circle-dashed-half','circle-dashed-quarter','circle-dashed-three-quarter','circle-full','circle-half','circle-off','circles *','circles-dashed *','circle-square *','circle-square-dashed *','circle-progress-check','circle-progress-half','circle-progress-quarter','circle-progress-three-quarter','circle-progress-x','circle-quarter','circle-three-quarter','dice-1','dice-2','dice-3','dice-4','dice-5','dice-6','dice-6-horizontal','flower','shapes','shapes-2','square','square-dashed','square-dashed-full','square-dashed-half','square-dashed-quarter','square-dashed-three-quarter','square-full','square-half','square-quarter','square-three-quarter'],
  Sport: ['award *','podium *','podium-1 *','podium-2 *','podium-3 *','trophy *'],
  Time: ['calendar','calendar-arrow-down','calendar-arrow-left','calendar-arrow-right','calendar-arrow-up','calendar-check','calendar-minus','calendar-off','calendar-plus','calendar-x','clock','clock-1','clock-10','clock-11','clock-12','clock-2','clock-3','clock-4','clock-5','clock-6','clock-7','clock-8','clock-9','clock-arrow-down','clock-arrow-left','clock-arrow-right','clock-arrow-up','clock-check','clock-minus','clock-plus','clock-x'],
  Tools: ['toolbox *','wrench *','hammer *','pencil-ruler *'],
  Users: ['scan-face','user','user-check','user-minus','user-plus','user-x','users'],
  Weather: ['cloud','cloud-off','cloud-rain','moon','moon-star','sun','sunrise','sunset'],
  Web: ['bookmark','globe','globe-check','globe-cursor','globe-off','globe-plus','globe-x','home','link','link-off','navigation','search','search-2','settings','share','wifi','wifi-exclamation','wifi-info','wifi-low','wifi-medium','wifi-x'],
};

const rawSets = readdirSync(`${REPO}/raw`).filter((d) => d !== 'README.md' && !d.startsWith('.'));
const allNames = readdirSync(`${REPO}/icons/stroke`).map((f) => f.replace('.svg', ''));
const has = (dir, n) => existsSync(`${dir}/${n}.svg`);

const planSets = Object.values(CARDS).flat().map((s) => s.replace(' *', ''));
const missA = planSets.filter((s) => !rawSets.includes(s));
const missB = rawSets.filter((s) => !planSets.includes(s));
if (missA.length || missB.length) throw new Error(`set mismatch: plan-not-raw=${missA} raw-not-plan=${missB}`);
if (planSets.length !== new Set(planSets).size) throw new Error('duplicate set in plan');

const plan = [];
let totalNames = 0;
for (const [card, list] of Object.entries(CARDS)) {
  const rows = [];
  for (const entry of list) {
    const set = entry.replace(' *', ''), badge = entry.endsWith(' *');
    const files = readdirSync(`${REPO}/raw/${set}`);
    const containers = ['regular', 'square', 'circle'].filter((c) => files.some((f) => f.startsWith(`Container=${c},`)));
    for (const c of containers) {
      const name = c === 'regular' ? set : `${c}-${set}`;
      rows.push({ name, set, container: c, badge,
        reg: { stroke: has(`${REPO}/icons/stroke`, name), duotone: has(`${REPO}/icons/duotone`, name), fill: has(`${REPO}/icons/fill`, name) },
        sharp: { stroke: has(`${S}/solved-mid`, name), duotone: has(`${S}/solved-duotone`, name), fill: has(`${S}/solved-fill`, name) } });
    }
  }
  plan.push({ card, rows });
  totalNames += rows.length;
}
const planNames = plan.flatMap((c) => c.rows.map((r) => r.name));
const nA = planNames.filter((n) => !allNames.includes(n));
const nB = allNames.filter((n) => !planNames.includes(n));
if (nA.length || nB.length) throw new Error(`name mismatch: plan-not-icons=${nA} icons-not-plan=${nB}`);
// coverage sanity: reg coverage must equal sharp coverage per style
for (const c of plan) for (const r of c.rows) for (const st of ['stroke', 'duotone', 'fill'])
  if (r.reg[st] !== r.sharp[st]) console.log(`COVERAGE MISMATCH ${r.name} ${st}: reg=${r.reg[st]} sharp=${r.sharp[st]}`);
writeFileSync(new URL('./plan.json', import.meta.url), JSON.stringify(plan));
console.log({ cards: plan.length, sets: planSets.length, names: totalNames,
  badges: plan.reduce((a, c) => a + c.rows.filter((r) => r.badge).length, 0),
  cells: { s: planNames.filter((n) => has(`${S}/solved-mid`, n)).length, d: planNames.filter((n) => has(`${S}/solved-duotone`, n)).length, f: planNames.filter((n) => has(`${S}/solved-fill`, n)).length } });
