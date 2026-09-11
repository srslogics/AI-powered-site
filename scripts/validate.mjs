import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const files = [
  'dist/index.html', 'dist/style.css', 'dist/app.js',
  'dist/assets/site-1.jpg', 'dist/assets/site-2.jpg',
  'dist/assets/site-3.jpg', 'dist/assets/progress-diptych.png',
];
for (const path of files) {
  const info = await stat(new URL(path, root));
  if (!info.isFile() || info.size === 0) throw new Error(`Missing or empty file: ${path}`);
}
const html = await readFile(new URL('dist/index.html', root), 'utf8');
if (!html.includes('SiteVantage')) throw new Error('Expected SiteVantage application entry.');
for (const ref of ['href="style.css"', 'src="app.js"']) {
  if (!html.includes(ref)) throw new Error(`Missing application reference: ${ref}`);
}
execFileSync(process.execPath, ['--check', fileURLToPath(new URL('dist/app.js', root))], { stdio: 'inherit' });
console.log(`SiteVantage validated: ${files.length} deployment files ready in dist/.`);
