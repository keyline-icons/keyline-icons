import { writeFileSync } from 'node:fs';
import * as I from './icons.mjs';
import { sheet, shipped } from './sheet.mjs';

const out = process.argv[2] ?? 'sheet.svg';
const SUNDISC = 'M16.5 12C16.5 14.4854 14.4854 16.5 12 16.5C9.5147 16.5 7.5 14.4854 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4854 7.5 16.5 9.5147 16.5 12Z';

const rows = [
  { name: 'phone', note: 'pads 7 wide at the ends of a band 4 wide, on two arcs about (20,4).\nink 1..23, the outer arc tangent to both pads by construction', paths: [I.phone()] },
  { name: 'phone  mirrored', note: 'the same drawing flipped', paths: [I.phone({ mirror: true })] },
  { name: 'phone-off', note: 'the base MIRRORED, so the band crosses the slash square-on.\ncut ends 4.00 above the line, buried on it below — the family constant',
    paths: [I.phoneOff()], ref: { name: 'message-off', paths: shipped('message-off') } },
  { name: 'phone-off  as the base is drawn', note: 'unmirrored, the band runs PARALLEL to the slash 0.90 away.\nboth paint a unit either side, so the inks overlap by 1.10', paths: [I.phoneOffWrong()] },
  { name: 'phone-message', note: 'the full 6-unit modifier box, flush in the corner the handset opens onto', paths: [I.phoneMessage()] },
  { name: 'quote', note: 'block + hook. this is the 99 form, which is what\nthe closing pair looks like', paths: [I.quote()] },
  { name: 'quote  66 form', note: 'the same mark flipped — the opening pair', paths: [I.quote({ flip: true })] },
  { name: 'message-quote', note: 'the pair inside the bubble, 5 wide each', paths: [I.messageQuote()] },
  { name: 'message-lines', note: 'two rules, left aligned, 4 apart', paths: [I.messageLines()] },
  { name: 'layers', note: 'a plate on a 1:2 slope over two chevrons.\ngap 2.22, ink 2..22', paths: [I.layers()] },
  { name: 'sun', note: 'shipped, for the comparison — rays painted 7.5..11', paths: shipped('sun') },
  { name: 'sun-medium', note: 'rays painted 7.5..10.25', paths: [I.sunMedium()] },
  { name: 'sun-dim', note: 'marks painted 7.5..9.5 (filled, 2 across)',
    paths: [{ d: SUNDISC }, { d: I.sunDots(8.5), fill: true }] },
  { name: 'language', note: 'a bubble that is also a globe: the message body carrying\nthe globe’s own equator and meridian', paths: [I.languageA()] },
  { name: 'language  alternative', note: 'a bubble carrying a globe', paths: [I.languageB()] },
];

writeFileSync(out, sheet(rows, { note: 'keyline-icons — v0.5.0 drawings for review' }));
console.log(`wrote ${out}`);
