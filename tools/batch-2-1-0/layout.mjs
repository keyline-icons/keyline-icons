import fs from 'node:fs';
export const ORDER = ['card-chip','flag-triangle-right','flag-swallowtail','gripper',
'hook','monitor-2','monitor-2-plus','monitor-2-minus','monitor-2-check','monitor-2-x','monitor-2-dot','monitor-2-cog','monitor-2-arrow-in-up-right','monitor-2-play',
'monitor-2-pause','monitor-2-stop','monitor-2-arrow-up','monitor-2-arrow-down','monitor-speaker','mouse-pointer','planet','scan-user','symmetry-horizontal','symmetry-vertical',
'flip-3-horizontal','flip-3-vertical','circle-slash-2','square-slash-2','layout-columns','train-track','waves','waves-2','sigma','pi',
'lambda','omega','phi','function','angle','radius','cone','cylinder','cuboid',
'pyramid','vector-square','vector-polygon','weight','weight-tilde','drafting-compass','triangle-right',
'grid-2x2-check','grid-2x2-x','copy-minus','copy-x','copy-off'];
const have = fs.readdirSync('out2/raw');
if (ORDER.length !== have.length || have.some((n) => !ORDER.includes(n))) throw new Error('order and out/raw disagree: ' + have.filter((n) => !ORDER.includes(n)) + ' | ' + ORDER.filter((n) => !have.includes(n)));
const height = (n) => { const cs = new Set(fs.readdirSync(`out2/raw/${n}`).map((f) => f.match(/Container=(\w+)/)[1])); return 8 + 48 * 2 * cs.size; };
const rows = []; for (let i = 0; i < ORDER.length; i += 10) rows.push(ORDER.slice(i, i + 10));
const tall = rows.map((r) => Math.max(...r.map(height)));
const ys = []; let bottom = -176;
for (let k = rows.length - 1; k >= 0; k--) { ys[k] = bottom - tall[k]; bottom = ys[k] - 48; }
export const SLOTS = rows.flatMap((r, k) => r.map((n, i) => ({ n, x: i * 256, y: ys[k] })));
export const HEADING_Y = ys[0] - 64;
if (process.argv[1]?.endsWith('layout.mjs')) console.log(JSON.stringify({ tall, ys, HEADING_Y, n: SLOTS.length }));
