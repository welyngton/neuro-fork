import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Caminhos relativos: o mesmo build funciona na raiz (Firebase Hosting) e em subpasta (GitHub Pages).
  base: './',
  server: { port: 5173, host: true },
  build: {
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
    include: ['src/**/*.test.ts'],
    coverage: { provider: 'v8', reporter: ['text', 'html'], include: ['src/core/**/*.ts'] },
  },
});
