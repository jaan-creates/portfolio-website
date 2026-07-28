// One-time job: the Petz case-study mockups are 11 standalone HTML files
// (each rendered live in an <iframe>), and each one independently embeds the
// full Plus Jakarta Sans + Poppins font families as base64 data URIs inside
// <style>@font-face{...}</style> — ~28 unicode-range-subset blocks per file,
// byte-identical across all 11 files (confirmed: only 8 distinct
// family/weight/style combos exist across the whole set: Plus Jakarta Sans
// 400/500/600/700, Poppins 500/600/700/800). Since each file is a separate
// iframe document, the browser can't share/cache that data across them.
//
// Fix: strip the embedded @font-face blocks and link to Google Fonts instead
// (both families are freely available there, same weights) — one shared,
// cacheable request instead of ~2-3MB duplicated per mockup screen.
// Run with: node scripts/dedupe-petz-fonts.mjs
import { readdir, mkdir, copyFile, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PETZ_DIR = path.join(ROOT, 'public', 'assets', 'petz');
const ARCHIVE_DIR = path.join(ROOT, 'assets-originals', 'petz');

const FONT_FACE_RE = /@font-face\s*\{[^}]*\}/g;
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap';

const HEAD_LINKS = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${GOOGLE_FONTS_HREF}">`,
].join('');

async function main() {
  await mkdir(ARCHIVE_DIR, { recursive: true });

  const entries = (await readdir(PETZ_DIR)).filter((f) => f.endsWith('.html'));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of entries) {
    const srcPath = path.join(PETZ_DIR, name);
    const beforeSize = (await stat(srcPath)).size;
    totalBefore += beforeSize;

    // Archive the untouched original before rewriting.
    await copyFile(srcPath, path.join(ARCHIVE_DIR, name));

    let html = await readFile(srcPath, 'utf-8');
    const fontFaceMatches = html.match(FONT_FACE_RE) ?? [];
    html = html.replace(FONT_FACE_RE, '');
    html = html.replace('<head>', `<head>${HEAD_LINKS}`);

    await writeFile(srcPath, html, 'utf-8');
    const afterSize = Buffer.byteLength(html, 'utf-8');
    totalAfter += afterSize;
    console.log(
      `${name}: removed ${fontFaceMatches.length} embedded @font-face blocks, ` +
      `${(beforeSize / 1e6).toFixed(2)}MB -> ${(afterSize / 1e6).toFixed(2)}MB`
    );
  }

  console.log('---');
  console.log(`Total: ${(totalBefore / 1e6).toFixed(2)}MB -> ${(totalAfter / 1e6).toFixed(2)}MB`);
  console.log(`Originals archived to: ${ARCHIVE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
