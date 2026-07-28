// One-time job: the Swiggy case-study "SVGs" are Figma exports that wrap a
// full raster PNG in an SVG pattern-fill (e.g. image 34.svg displays at
// 254x164 but embeds a 780x524 PNG as base64) — several hundred KB each for
// no visual benefit. Rasterizing the SVG itself (not hand-extracting the
// embedded PNG) preserves whatever crop/scale the pattern-fill applies.
// Also archives the 12 SVGs in this folder that no page actually references
// (public/ is copied to dist/ verbatim regardless of usage, so unused files
// still ship). Run with: node scripts/optimize-swiggy-images.mjs
import sharp from 'sharp';
import { mkdir, rename, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SWIGGY_DIR = path.join(ROOT, 'public', 'assets', 'swiggy');
const ARCHIVE_DIR = path.join(ROOT, 'assets-originals', 'swiggy');
const UNUSED_DIR = path.join(ROOT, 'assets-originals', 'swiggy-unused');
const WEBP_QUALITY = 82;
const RASTER_DENSITY = 144; // 2x the SVG's default 72dpi rasterization

// Referenced from SwiggyCaseStudy.tsx — raster-wrap "SVGs" to convert to WebP.
// { source filename (in public/assets/swiggy/) : [clean output basename, displayWidth, displayHeight] }
const USED = {
  'Frame 11.svg':     ['frame-11',     206, 303],
  'Frame 20 1.svg':   ['frame-20-1',   169, 318],
  'Frame 49 1.svg':   ['frame-49-1',   265, 341],
  'Group 53.svg':     ['group-53',     256, 448],
  'Group 57.svg':     ['group-57',     155, 318],
  'Group 60.svg':     ['group-60',     280, 783],
  'Group 61.svg':     ['group-61',     270, 783],
  'Group 62.svg':     ['group-62',     302, 783],
  'Group 63.svg':     ['group-63',     278, 783],
  'Group 64.svg':     ['group-64',     412, 138],
  'image 35.svg':     ['image-35',     239, 171],
  'image 37.svg':     ['image-37',     279, 196],
  'image 39.svg':      ['image-39',    158, 158],
};

// Present in public/assets/swiggy/ but not referenced anywhere in src/ (confirmed
// via `grep -r assets/swiggy/ src/`) — archived out of public/ rather than shipped for nothing.
const UNUSED = [
  'Frame 10.svg',
  'Frame 43 (1) 1.svg',
  'Frame 8.svg',
  'Frame 9.svg',
  'Group 51.svg',
  'Group 56.svg',
  'Group 59.svg',
  'image 34.svg',
  'image 36.svg',
  'image 38.svg',
  'image 46.svg',
  'image 47.svg',
];

async function main() {
  await mkdir(ARCHIVE_DIR, { recursive: true });
  await mkdir(UNUSED_DIR, { recursive: true });

  let totalBefore = 0;
  let totalAfter = 0;

  for (const [rawName, [outBase, w, h]] of Object.entries(USED)) {
    const srcPath = path.join(SWIGGY_DIR, rawName);
    if (!existsSync(srcPath)) {
      console.warn(`Skip (not found): ${rawName}`);
      continue;
    }
    const outPath = path.join(SWIGGY_DIR, `${outBase}.webp`);
    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    await sharp(srcPath, { density: RASTER_DENSITY })
      .resize({ width: w * 2, height: h * 2, fit: 'fill' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);

    const afterSize = (await stat(outPath)).size;
    totalAfter += afterSize;
    console.log(
      `${rawName} -> ${outBase}.webp  ${(beforeSize / 1e3).toFixed(0)}KB -> ${(afterSize / 1e3).toFixed(0)}KB`
    );

    await rename(srcPath, path.join(ARCHIVE_DIR, rawName));
  }

  let unusedBytes = 0;
  for (const rawName of UNUSED) {
    const srcPath = path.join(SWIGGY_DIR, rawName);
    if (!existsSync(srcPath)) continue;
    unusedBytes += (await stat(srcPath)).size;
    await rename(srcPath, path.join(UNUSED_DIR, rawName));
    console.log(`Archived unused: ${rawName}`);
  }

  console.log('---');
  console.log(`Used assets: ${(totalBefore / 1e6).toFixed(2)}MB -> ${(totalAfter / 1e6).toFixed(2)}MB`);
  console.log(`Unused assets removed from public/: ${(unusedBytes / 1e6).toFixed(2)}MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
