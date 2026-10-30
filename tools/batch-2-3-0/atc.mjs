// a-text-cursor (his drawing, refs/ 29 Oct): the shipped a-arrow-up's A beside the shipped text-cursor at 0.8, so it
// takes that family's styles: two-tone and duotone the A muted, the cursor black; fill the stroke. Sharp: the A is
// a-arrow-up's sharp A verbatim (moved 0.1788 right so its foot's corner lands on x 1), the serif ends a unit stub
// each, as text-cursor's sharp.
import { mkdirSync, writeFileSync } from 'node:fs';
const { doc } = await import(new URL('../batch-1-4-0/rawio.mjs', import.meta.url));
const A = { r: 'M2 19L7 5L12 19M3.7857 14L10.2143 14', s: 'M1.9417 19.6637L7.1788 5L12.4158 19.6637M3.9645 14L10.3931 14' };
const C = {
  r: 'M19 5.8C18.6667 5.35 17.6 4 16 4M19 5.8C19.3333 5.35 20.4 4 22 4M19 5.8L19 18.2M19 18.2C19.3333 18.65 20.4 20 22 20M19 18.2C18.6667 18.65 17.6 20 16 20',
  s: 'M19 5.8C18.6667 5.35 17.6 4 16 4L15 4M19 5.8C19.3333 5.35 20.4 4 22 4L23 4M19 5.8L19 18.2M19 18.2C19.3333 18.65 20.4 20 22 20L23 20M19 18.2C18.6667 18.65 17.6 20 16 20L15 20',
};
const out = process.argv[2], dir = `${out}/raw/a-text-cursor`;
mkdirSync(dir, { recursive: true });
for (const [c, k] of [['regular', 'r'], ['sharp', 's']]) {
  const cap = k === 's' ? 'butt' : 'round', st = [{ kind: 'stroke', d: A[k] + C[k] }], split = [{ kind: 'muted', d: A[k] }, { kind: 'stroke', d: C[k] }];
  for (const [style, layers] of [['stroke', st], ['two-tone', split], ['duotone', split], ['fill', st]]) writeFileSync(`${dir}/Container=regular, Style=${style}, Corners=${c}.svg`, doc(layers, cap));
}
console.log('wrote a-text-cursor');
