import fs from 'fs';
import path from 'path';
import { build } from 'esbuild';

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString());

console.log(`Building ${pkg.version} of ${pkg.name}`);

await build({
  bundle: true,
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
  entryPoints: ['src/index.ts'],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'https',
    'fs',
    'path',
    'url',
  ],
  format: 'esm',
  minify: false,
  outfile: 'dist/index.js',
  platform: 'node',
  sourcemap: false,
  target: ['esnext'],
});
