import { createApp } from 'vue/dist/vue.esm-bundler.js';
import SmartUI, { MyButton, SFCButton, JSXButton } from './entry';

const app = createApp({
  template: `<div>
  <SButton round plain icon="search" color="blue">蓝色按钮</SButton>
  <SButton round plain icon="edit" color="green">绿色按钮</SButton>
  <SButton round plain icon="check"  color="gray">灰色按钮</SButton>
  <SButton round plain icon="message" color="yellow"></SButton>
  <SButton round plain icon="delete" color="red">红色按钮</SButton>
  </div>`,
});
app.use(SmartUI);
app.mount('#app');
