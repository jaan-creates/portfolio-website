import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import path from 'path';

const SRC = 'public/assets/spiral';
const OUT = 'public/spiral';
const W = 1000;
const H = 1250;

const ORDER = [
  'DSCF8324.jpg',                                        // 01 beach sunset silhouette
  'WhatsApp Image 2026-06-17 at 4.44.06 PM.jpeg',       // 02 freediver
  'DSCF0820.jpg',                                        // 03 Theyyam ritual
  'WhatsApp Image 2026-06-17 at 4.31.47 PM.jpeg',       // 04 rose at Pokhara lake
  'IMG_5005.jpg',                                        // 05 mountain sunrise
  'DSCF6701.jpg',                                        // 06 Bangkok Chinatown night
  'DSCF2614.jpg',                                        // 07 Nature sign + lake
  'DSCF7493.jpg',                                        // 08 Grand Palace temple
  'DSCF6609.jpg',                                        // 09 misty country path
  'WhatsApp Image 2026-06-17 at 4.37.22 PM.jpeg',       // 10 dog + yellow flower
  'DSCF2607.jpg',                                        // 11 aerial lake islands
  'WhatsApp Image 2026-06-17 at 4.44.37 PM.jpeg',       // 12 scuba divers
  'DSCF6043.jpg',                                        // 13 mountain peaks
  'DSCF7202.jpg',                                        // 14 Bangkok aerial
  'DSCF6050.jpg',                                        // 15 hikers on ridge
];

await mkdir(OUT, { recursive: true });

for (let i = 0; i < ORDER.length; i++) {
  const num = String(i + 1).padStart(2, '0');
  const input = path.join(SRC, ORDER[i]);
  const output = path.join(OUT, `${num}.webp`);
  await sharp(input)
    .resize(W, H, { fit: 'cover', position: 'centre' })
.webp({ quality: 82 })
    .toFile(output);
  const { size } = await import('fs').then(m => m.promises.stat(output));
  console.log(`${num}.webp  ${(size / 1024).toFixed(0)} KB  ← ${ORDER[i]}`);
}
console.log('\nDone.');
