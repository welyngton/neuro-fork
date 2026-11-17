import { defineConfig } from 'vitest/config';

/**
 * Estrutura de pastas do build:
 *  - src/index.html  -> entrada do Vite (o HTML do jogo);
 *  - public/         -> arquivos copiados como estão (ícone, manifest, service worker);
 *  - dist/           -> jogo compilado, VERSIONADO no git: o GitHub Pages serve a
 *                       branch main e o index.html da raiz redireciona para ./dist/.
 * `base: './'` gera caminhos relativos, então o mesmo build roda em qualquer subpasta.
 */
export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../public',
  envDir: '..',
  server: { port: 5173, host: true },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: { provider: 'v8', reporter: ['text', 'html'], include: ['core/**/*.ts'] },
  },
});
