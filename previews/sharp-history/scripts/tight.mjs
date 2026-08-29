import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const out = execSync('node radii.mjs ' + readdirSync('/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke').filter(f=>f.endsWith('.svg')).map(f=>f.replace('.svg','')).join(' '), { maxBuffer: 1e8 }).toString();
const tight = [];
for (const line of out.split('\n')) {
  const m = line.match(/^(\S+)\s+corner radii: (.*)$/);
  if (!m || m[2] === 'none detected') continue;
  if (m[2].split(', ').map(Number).some(v => v > 0 && v < 0.999)) tight.push(m[1]);
}
writeFileSync('tight.txt', tight.join('\n'));
const board = readFileSync('board.txt','utf8').trim().split('\n');
const onBoard = board.filter(b => tight.includes(b));
console.log('drawings with a corner tighter than 1:', tight.length);
console.log('of those, on the board:', onBoard.length);
console.log(onBoard.join(', '));
