import react from '@vitejs/plugin-react';
import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import wasm from 'vite-plugin-wasm';

export default defineConfig(async () => {
  return {
    build: {
      target: 'esnext',
    },
    plugins: [
      visualizer(),
      react(),
      wasm(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
    ],
  };
});
