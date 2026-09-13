import { readFile, writeFile, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const dataUrl = async (path, type) => `data:${type};base64,${(await readFile(new URL(path, root))).toString('base64')}`;
let [html, css, js] = await Promise.all(['dist/index.html', 'dist/style.css', 'dist/app.js'].map(read));
const images = await Promise.all([1, 2, 3].map(i => dataUrl(`dist/assets/site-${i}.jpg`, 'image/jpeg')));
const imageLoader = 'const img=i=>`assets/site-${i+1}.jpg`;';
if (!js.includes(imageLoader)) throw new Error('Image loader changed; update the standalone exporter.');
js = js.replace(imageLoader, `const imageData=${JSON.stringify(images)};const img=i=>imageData[i];`);
const progress = await dataUrl('dist/assets/progress-diptych.png', 'image/png');
css = css.replaceAll('assets/progress-diptych.png', progress);
js = js.replaceAll('assets/progress-diptych.png', progress);
html = html.replace(/<link rel="stylesheet" href="style\.css(?:\?[^"]*)?">/, () => `<style>${css}</style>`)
  .replace(/<script src="app\.js(?:\?[^"]*)?"><\/script>/, () => `<script>${js}</script>`);
if (html.includes('assets/') || html.includes('<script src=')) throw new Error('Standalone demo has unresolved local files.');
await mkdir(new URL('releases/', root), { recursive: true });
await writeFile(new URL('releases/SiteVantage_Demo.html', root), html);
console.log('Saved releases/SiteVantage_Demo.html with embedded styles, scripts and images.');
