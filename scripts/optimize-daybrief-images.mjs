// One-time job: the Daybrief case-study PNG screenshots are already reasonably
// sized (largest is ~690KB) but a straight WebP re-encode still saves real
// bytes with no visual loss. The 4.7MB MP4 demo video is untouched — video
// compression needs ffmpeg, not sharp, and is out of scope here.
// Run with: node scripts/optimize-daybrief-images.mjs
import sharp from 'sharp';
import { mkdir, rename, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DAYBRIEF_DIR = path.join(ROOT, 'public', 'assets', 'daybrief');
const ARCHIVE_DIR = path.join(ROOT, 'assets-originals', 'daybrief');
const WEBP_QUALITY = 82;

const RENAMES = {
  'Daybreak Email-selection (1).png': 'daybrief-email-selection',
  'before_after_user_input_curation.png': 'daybrief-before-after-curation',
  'Priorities Doc-selection.png': 'daybrief-priorities-doc',
  'Day Badge-selection.png': 'daybrief-day-badge',
};

async function main() {
  await mkdir(ARCHIVE_DIR, { recursive: true });
  let totalBefore = 0;
  let totalAfter = 0;

  for (const [rawName, outBase] of Object.entries(RENAMES)) {
    const srcPath = path.join(DAYBRIEF_DIR, rawName);
    if (!existsSync(srcPath)) {
      console.warn(`Skip (not found): ${rawName}`);
      continue;
    }
    const outPath = path.join(DAYBRIEF_DIR, `${outBase}.webp`);
    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    await sharp(srcPath).webp({ quality: WEBP_QUALITY }).toFile(outPath);

    const afterSize = (await stat(outPath)).size;
    totalAfter += afterSize;
    console.log(
      `${rawName} -> ${outBase}.webp  ${(beforeSize / 1e3).toFixed(0)}KB -> ${(afterSize / 1e3).toFixed(0)}KB`
    );

    await rename(srcPath, path.join(ARCHIVE_DIR, rawName));
  }

  console.log('---');
  console.log(`Total: ${(totalBefore / 1e3).toFixed(0)}KB -> ${(totalAfter / 1e3).toFixed(0)}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
