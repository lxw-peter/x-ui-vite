import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from './config/unocss';

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
};

export default defineConfig({
  plugins: [vue(), vueJsx(), Unocss()],
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
    brotliSize: true, // 显示压缩大小报告
    cssCodeSplit: true, // 拆分css
    lib: {
      entry: './src/entry.ts',
      name: 'SmartyUI',
      fileName: 'smarty-ui',
      formats: ['esm', 'umd', 'iife'],
    },
  },
});
