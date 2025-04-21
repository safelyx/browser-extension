import * as esbuild from 'npm:esbuild@0.25.2';
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@0.11.1';

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['public/ts/background.ts'],
  outfile: './dist/background.bundle.js',
  bundle: true,
  format: 'esm',
});

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['public/ts/popup.ts'],
  outfile: './dist/popup.bundle.js',
  bundle: true,
  format: 'esm',
});

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['public/ts/settings.ts'],
  outfile: './dist/settings.bundle.js',
  bundle: true,
  format: 'esm',
});

esbuild.stop();
