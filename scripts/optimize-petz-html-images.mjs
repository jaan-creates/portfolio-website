// One-time job: the Petz case-study mockups are 11 standalone HTML files
// (each rendered live in an <iframe> — see PetzCaseStudy.tsx). A prior pass
// (dedupe-petz-fonts.mjs) stripped their embedded @font-face blocks; the
// remaining weight is embedded <img src="data:image/png;base64,...">
// avatars/photos — several hundred KB of base64 text per image, inflated
// further by base64's ~33% size overhead, and not shareable/cacheable across
// the 11 separate iframe documents.
//
// Fix: extract each embedded PNG, recompress to WebP, write it once to
// public/assets/petz/img/ (deduped by content hash — identical avatars reused
// across mockups collapse to one file), and rewrite the <img src="..."> to
// point at the external file. Archives the pre-rewrite HTML to
// assets-originals/petz-images/ first.
// Run with: node scripts/optimize-petz-html-images.mjs
import sharp from 'sharp';
import { readdir, mkdir, copyFile, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PETZ_DIR = path.join(ROOT, 'public', 'assets', 'petz');
const IMG_DIR = path.join(PETZ_DIR, 'img');
const ARCHIVE_DIR = path.join(ROOT, 'assets-originals', 'petz-images');
const WEBP_QUALITY = 82;

const DATA_URI_RE = /src="data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=]+)"/g;

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(ARCHIVE_DIR, { recursive: true });

  const files = (await readdir(PETZ_DIR)).filter((f) => f.endsWith('.html'));
  const cache = new Map(); // hash -> webp filename, dedupes identical embedded images
  let totalBefore = 0;
  let totalAfter = 0;
  let embeddedCount = 0;

  for (const name of files) {
    const srcPath = path.join(PETZ_DIR, name);
    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    await copyFile(srcPath, path.join(ARCHIVE_DIR, name));

    const html = await readFile(srcPath, 'utf-8');
    const replacements = [];

    for (const match of html.matchAll(DATA_URI_RE)) {
      const [full, , base64] = match;
      const buffer = Buffer.from(base64, 'base64');
      const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 12);

      if (!cache.has(hash)) {
        const outName = `${hash}.webp`;
        await sharp(buffer).webp({ quality: WEBP_QUALITY }).toFile(path.join(IMG_DIR, outName));
        cache.set(hash, outName);
        embeddedCount += 1;
      }

      replacements.push([full, `src="/assets/petz/img/${cache.get(hash)}"`]);
    }

    let rewritten = html;
    for (const [from, to] of replacements) {
      rewritten = rewritten.replace(from, to);
    }

    await writeFile(srcPath, rewritten, 'utf-8');
    const afterSize = Buffer.byteLength(rewritten, 'utf-8');
    totalAfter += afterSize;
    console.log(
      `${name}: inlined ${replacements.length} image(s), ` +
      `${(beforeSize / 1e6).toFixed(2)}MB -> ${(afterSize / 1e6).toFixed(2)}MB`
    );
  }

  console.log('---');
  console.log(`${embeddedCount} distinct images extracted to ${path.relative(ROOT, IMG_DIR)}/`);
  console.log(`HTML total: ${(totalBefore / 1e6).toFixed(2)}MB -> ${(totalAfter / 1e6).toFixed(2)}MB`);
  console.log(`Pre-rewrite originals archived to: ${path.relative(ROOT, ARCHIVE_DIR)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
