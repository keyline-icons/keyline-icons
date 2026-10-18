// Writing raw/<name>/Container=<c>, Style=<s>, Corners=<k>.svg from layer lists, in the 1.4.0
// batch's format (tools/batch-1-4-0/rawio.mjs), with the container named.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { doc } from '../batch-1-4-0/rawio.mjs';
export function writeVariants(root, name, container, byCorners) {
  const dir = join(root, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [corners, styles] of Object.entries(byCorners))
    for (const [style, layers] of Object.entries(styles))
      writeFileSync(join(dir, `Container=${container}, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round'));
}
