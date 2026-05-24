import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assetsDir = path.resolve('dist/client/assets');

function pickLatest(files, prefix, suffix) {
  const candidates = files.filter((f) => f.startsWith(prefix) && f.endsWith(suffix));
  if (candidates.length === 0) {
    throw new Error(`Asset tidak ditemukan untuk pola ${prefix}*${suffix}`);
  }
  return candidates.sort().at(-1);
}

const files = await readdir(assetsDir);
const entryJs = pickLatest(files, 'index-', '.js');
const stylesCss = pickLatest(files, 'styles-', '.css');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Apamurahbanget</title>
    <link rel="stylesheet" href="/assets/${stylesCss}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entryJs}"></script>
  </body>
</html>
`;

await writeFile(path.resolve('dist/client/index.html'), html, 'utf8');
console.log('Generated dist/client/index.html for Vercel');
