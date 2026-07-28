// One-time batch job: compress the raw camera photos that back <SpiralGallery />
// into web-sized WebP files, and archive the big originals outside public/ so
// they aren't shipped to visitors. Run with: node scripts/optimize-spiral-images.mjs
import sharp from 'sharp';
import { readdir, mkdir, rename, unlink, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SPIRAL_DIR = path.join(ROOT, 'public', 'assets', 'spiral');
const ARCHIVE_DIR = path.join(ROOT, 'assets-originals', 'spiral');
const MAX_EDGE = 1600;
const WEBP_QUALITY = 78;

// Maps raw source filename -> clean output basename (no spaces/mixed case chaos).
const RENAMES = {
  'DSCF8324.jpg': 'travel-01',
  'DSCF7493.jpg': 'travel-02',
  'IMG_5005.jpg': 'travel-03',
  'DSCF2614.jpg': 'travel-04',
  'DSCF0820.jpg': 'travel-05',
  'DSCF6043.jpg': 'travel-06',
  'DSCF6609.jpg': 'travel-07',
  'DSCF6050.jpg': 'travel-08',
  'DSCF6701.jpg': 'travel-09',
  'DSCF2607.jpg': 'travel-10',
  'DSCF7202.jpg': 'travel-11',
  'WhatsApp Image 2026-06-17 at 4.37.22 PM.jpeg': 'travel-12',
  'WhatsApp Image 2026-06-17 at 4.31.47 PM.jpeg': 'travel-13',
  'WhatsApp Image 2026-06-17 at 4.44.06 PM.jpeg': 'travel-14',
  'WhatsApp Image 2026-06-17 at 4.44.37 PM.jpeg': 'travel-15',
  'IMG_5398.JPG.jpeg': 'travel-16',
  'IMG_5397.JPG.jpeg': 'travel-17',
  'IMG_5400.PNG': 'travel-18',
  'IMG_5399.JPG.jpeg': 'travel-19',
};

// Files large enough to be worth archiving as "originals" (roughly >1MB raw).
const ARCHIVE_THRESHOLD_BYTES = 1_000_000;

async function main() {
  if (!existsSync(SPIRAL_DIR)) {
    console.error(`Not found: ${SPIRAL_DIR}`);
    process.exit(1);
  }
  await mkdir(ARCHIVE_DIR, { recursive: true });

  const entries = await readdir(SPIRAL_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const [rawName, outBase] of Object.entries(RENAMES)) {
    const outPath = path.join(SPIRAL_DIR, `${outBase}.webp`);
    if (!entries.includes(rawName)) {
      if (existsSync(outPath)) {
        console.log(`Already done: ${rawName} -> ${outBase}.webp`);
      } else {
        console.warn(`Skip (not found): ${rawName}`);
      }
      continue;
    }
    const srcPath = path.join(SPIRAL_DIR, rawName);
    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    await sharp(srcPath)
      .rotate() // respect EXIF orientation before resizing
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);

    const afterSize = (await stat(outPath)).size;
    totalAfter += afterSize;
    console.log(
      `${rawName} -> ${outBase}.webp  ${(beforeSize / 1e6).toFixed(1)}MB -> ${(afterSize / 1e6).toFixed(2)}MB`
    );

    try {
      if (beforeSize > ARCHIVE_THRESHOLD_BYTES) {
        await rename(srcPath, path.join(ARCHIVE_DIR, rawName));
      } else {
        await unlink(srcPath);
      }
    } catch (err) {
      console.warn(`Could not remove/move original "${rawName}" (locked?): ${err.message}`);
    }
  }

  console.log('---');
  console.log(`Total before: ${(totalBefore / 1e6).toFixed(1)}MB`);
  console.log(`Total after:  ${(totalAfter / 1e6).toFixed(2)}MB`);
  console.log(`Originals archived to: ${ARCHIVE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
