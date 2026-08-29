import { readFileSync } from 'node:fs';
import { paintedBBox, readPaths } from './stroke-bbox.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const f=(b)=>b.map(v=>+v.toFixed(3));
// Self-check: the hand solve for triangle-alert must measure 1..23 by 2..22.
const solved = [{d:'M12 4.075L2.6913 21H21.3087Z',filled:false},{d:'M12 8V14',filled:false},{d:'M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z',filled:true}];
console.log('solved triangle-alert   ', f(paintedBBox(solved, {join:'miter',cap:'butt'})));
console.log('rounded triangle-alert  ', f(paintedBBox(readPaths(readFileSync(`${K}/triangle-alert.svg`,'utf8')), {join:'round',cap:'round'})));
for (const n of ['play','navigation','tag']) {
  console.log(`rounded ${n.padEnd(16)}`, f(paintedBBox(readPaths(readFileSync(`${K}/${n}.svg`,'utf8')), {join:'round',cap:'round'})));
  console.log(`sharp   ${n.padEnd(16)}`, f(paintedBBox(readPaths(readFileSync(`sharp/${n}.svg`,'utf8')), {join:'miter',cap:'butt'})));
}
