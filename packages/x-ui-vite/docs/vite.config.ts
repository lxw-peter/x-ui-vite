import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from '../x-ui-vite/config/unocss';

export default defineConfig({
  plugins: [vueJsx(), Unocss()],
});
