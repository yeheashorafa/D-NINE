import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./vitest.setup.ts'],
  pool: 'threads',
  maxWorkers: 1,
  fileParallelism: false,
  server: {
    deps: {
      inline: ['next-intl']
    }
  },
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
},
});
