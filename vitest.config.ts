import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts', './mswSetup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
});
