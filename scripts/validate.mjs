import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const files = [
  'dist/index.html', 'dist/style.css', 'dist/app.js',
  'dist/assets/site-1.jpg', 'dist/assets/site-2.jpg',
  'dist/assets/site-3.jpg', 'dist/assets/progress-diptych.png',
  'dist/assets/sitevantage-k-konsulting-preview.png',
];
for (const path of files) {
  const info = await stat(new URL(path, root));
  if (!info.isFile() || info.size === 0) throw new Error(`Missing or empty file: ${path}`);
}
const html = await readFile(new URL('dist/index.html', root), 'utf8');
if (!html.includes('SiteVantage')) throw new Error('Expected SiteVantage application entry.');
for (const ref of [/href="style\.css(?:\?[^" ]*)?"/, /src="app\.js(?:\?[^" ]*)?"/]) {
  if (!ref.test(html)) throw new Error(`Missing application reference: ${ref}`);
}
execFileSync(process.execPath, ['--check', fileURLToPath(new URL('dist/app.js', root))], { stdio: 'inherit' });
console.log(`SiteVantage validated: ${files.length} deployment files ready in dist/.`);

const socialImage = 'https://ai-powered-site.onrender.com/assets/sitevantage-k-konsulting-preview.png';
for (const tag of [
  `<meta property="og:image" content="${socialImage}">`,
  '<meta property="og:url" content="https://ai-powered-site.onrender.com/">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta name="twitter:card" content="summary_large_image">',
]) {
  if (!html.includes(tag)) throw new Error(`Missing social preview metadata: ${tag}`);
}
const png = await readFile(new URL('dist/assets/sitevantage-k-konsulting-preview.png', root));
if (png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
  throw new Error('Expected a 1200 × 630 PNG social preview.');
}
console.log('Public social preview metadata and image validated.');
