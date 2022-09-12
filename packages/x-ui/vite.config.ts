import { defineConfig, Plugin, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from './config/unocss';
import { resolve } from 'path';

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
};

export const config = {
  plugins: [vue() as Plugin, vueJsx() as Plugin, Unocss() as Plugin[]],
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },

  build: {
    rollupOptions,
    minify: 'terser', // 压缩模式
    sourcemap: false, // 是否生成 sourcemap
    // cssCodeSplit: true, // 拆分css
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'XUI',
      fileName: 'x-ui',
      formats: [
        'es',
        'esm',
        // 'umd',
        // 'iife',
      ],
    },
    outDir: './dist',
  },
};
export default defineConfig(config as UserConfig);
