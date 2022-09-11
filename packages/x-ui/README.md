# 基于 Vite 的组件库工程化

[![CI](https://github.com/lxw-peter/smarty-ui-vite/actions/workflows/main.yml/badge.svg)](https://github.com/lxw-peter/smarty-ui-vite/actions/workflows/main.yml)

## 安装

```sh
pnpm i x-ui-vite
```

## 使用

```js
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import 'x-ui-vite/dist/assets/entry.683fa2f4.css';
import SmartyUI, { SFCButton, JSXButton, SButton } from 'x-ui-vite';

const app = createApp({
  template: `
    <div style="margin-bottom:20px;">
      <SButton color="blue">主要按钮</SButton>
      <SButton color="green">绿色按钮</SButton>
      <SButton color="gray">灰色按钮</SButton>
      <SButton color="yellow">黄色按钮</SButton>
      <SButton color="red">红色按钮</SButton>
    </div>
    <div style="margin-bottom:20px;">
      <SButton color="blue" plain>朴素按钮</SButton>
      <SButton color="green" plain>绿色按钮</SButton>
      <SButton color="gray" plain>灰色按钮</SButton>
      <SButton color="yellow" plain>黄色按钮</SButton>
      <SButton color="red" plain>红色按钮</SButton>
    </div>
    <div style="margin-bottom:20px;">
      <SButton size="small" plain>小按钮</SButton>
      <SButton size="medium" plain>中按钮</SButton>
      <SButton size="large" plain>大按钮</SButton>
    </div>
    <div style="margin-bottom:20px;">
      <SButton color="blue" round plain icon="search">搜索按钮</SButton>
      <SButton color="green" round plain icon="edit">编辑按钮</SButton>
      <SButton color="gray" round plain icon="check">成功按钮</SButton>
      <SButton color="yellow" round plain icon="message">提示按钮</SButton>
      <SButton color="red" round plain icon="delete">删除按钮</SButton>
    </div>
    <div style="margin-bottom:20px;">
      <SButton color="blue" round plain icon="search"></SButton>
      <SButton color="green" round plain icon="edit"></SButton>
      <SButton color="gray" round plain icon="check"></SButton>
      <SButton color="yellow" round plain icon="message"></SButton>
      <SButton color="red" round plain icon="delete"></SButton>
    </div>
  `,
});
app.use(SmartyUI);
app.mount('#app');
```
