# 基于 Vite 的组件库工程化
<p align="center">
  <a href="https://github.com/lxw-peter/smarty-ui-vite/actions/workflows/main.yml">
    <img src="https://github.com/lxw-peter/smarty-ui-vite/actions/workflows/main.yml/badge.svg?branch=master" alt="build status" style="max-width: 100%;">
    </a>
</p>
## 搭建开发环境

1. 新建目录

```sh
mkdir smarty-ui-vite
cd smarty-ui-vite
```

2. 初始化

```sh
# 没有安装pnpm 建议安装下
npm install pnpm -g
pnpm init -y
```

3. 安装 Vite

```sh
pnpm i vite -D
```

4. 创建测试文件

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smarty UI</title>
</head>

<body>
  <div id="app">smarty ui</div>
  <script type="module" src="./src/index.ts"></script>
</body>

</html>
```

```ts
// ./src/index.ts
const arr: number[] = [1,2,3]
```

5. 启动项目

```sh
# 使用 npx 执行软件包中的可执行文件
# 相当于执行 node_modules/.bin
npx vite
```

为了方便后续操作，可以再 `package.json` 中添加启动脚本，然后可以使用 `pnpm dev` 启动

```json
{
  "script": {
    "dev": "vite"
  }
}
```

## 组件库搭建

### 让 `Vite` 支持 `SFC` 和 `JSX` 语法，并支持 `tsx` 文件导入

1. 安装插件

```sh
# 前者支持 SFC 语法， 后者用以 JSX 语法
pnpm install @vitejs/plugin-vue @vitejs/plugin-vue-jsx -D
```

2. 创建 vite.config.ts

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```

3. 创建类型声明文件

```ts
// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

4. 创建tsconfig.json

```json
{
  "compilerOptions": {
    "declaration": true /* 生成相关的 '.d.ts' 文件。 */,
    "declarationDir": "./dist/types" /* '.d.ts' 文件输出目录 */,
    "jsx": "preserve"
  },
  "include": ["./**/*.*", "./shims-vue.d.ts"],
  "exclude": ["node_modules"],
  "esModuleInterop": true,
  "allowSyntheticDefaultImports": "true"
}

```

### 组件库的封装形式

- 按需引入
- 全量引入

```ts
// src/entry.ts
import { App } from "vue";
import MyButton from "./button";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";

// 导出单独组件

export {MyButton, SFCButton, JSXButton}

export default {
  install(app:App):void {
    app.component(MyButton.name, MyButton)
    app.component(SFCButton.name, SFCButton)
    app.component(JSXButton.name, JSXButton)
  }
}
```

```ts
// 单独引入
import { createApp } from "vue/dist/vue.esm-bundler.js";
import { SFCButton, JSXButton, MyButton } from "../../dist/smarty-ui.esm.js";

createApp({emplate: `<SButton/><JSXButton/><SFCButton/>`})
  .component(SFCButton.name, SFCButton)
  .component(JSXButton.name, JSXButton)
  .component(MyButton.name, MyButton).mount('#app')
```

```ts
import { createApp } from "vue/dist/vue.esm-bundler.js";
import SmartyUI from "../../dist/smarty-ui.esm.js";
// 全量引入
createApp({template: `<SButton/><JSXButton/><SFCButton/>`})
  .use(SmartyUI).mount('#app')
```

### 使用 `Vite` 构建库文件

```ts
// vite.config.ts
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    rollupOptions,
    minify: false,
    lib: {
      entry: './src/entry.ts',
      name: 'SmartyUI',
      fileName: 'smarty-ui',
      formats: ['esm', 'umd', 'iife']
    }
  }
});
```

## CSS 样式 - 用Unocss实现原子化CSS

`Taiwind` 和 `Unocss` 都可以实现原子样式，为什么采用 `Unocss` ?

- 性能更好，更强的可定制型和易用性
- 无需解析、无需AST、无需扫描，即时生成
- 对 Vite 的支持性更好

### 安装

```sh
# @iconify-json/ic 图标库可自行选用 
pnpm i -D unocss @iconify-json/ic
```

### 配置

```ts
// config/unocss
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';
// 配置 safelist, UnoCSS 默认是按需生成方式， 需要定制安全列表才会根据 safelist 生成样式
const safelist = [
  ...colors.map((v) => `bg-${v}-100`),
]
export default () =>
  Unocss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()],
  });

// vite.config.ts
import Unocss from './config/unocss';
defineConfig({
  plugins: [vue(), vueJsx(), Unocss()],
  // ...
})
```

### 使用

```tsx
import 'uno.css';

export default defineComponent({
  name: 'SButton',
  props,
  setup(props, { slots }) {
    return <button class="bg-color-500 cursor-pointer"></button>
  })
```

## VitePress 生成组件文档

### 安装插件

```sh
# 这里没有使用vitepress@1.0RC版本是因为 vitepress-theme-demoblock 插件还未适配
pnpm i vitepress@0.22.4 vitepress-theme-demoblock@1.4.2 -D
pnpm i @types/node -D
```

### 文件目录示例

```
├─index.md                 // 自定义内容
├─vite.config.ts           // 配置vite
├─components
|     ├─button
|     |   └index.md        // 自定义内容
├─.vitepress
|     ├─config.ts          // vitepress 配置
|     ├─theme
|     |   └index.ts        // 主题配置

```

### vite.config.ts

```ts
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from '../config/unocss';

export default defineConfig({
  plugins: [vueJsx(), Unocss()],
});
```

### .vitepress/config.ts

```ts
// 配置侧边栏
const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      children: [{ text: 'Button 按钮', link: '/components/button/' }],
    },
    
  ],
};
const config = {
  title: 'VitePress',
  description: 'Just playing around.',
  themeConfig: {
    sidebar,
  },
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock');
      md.use(demoBlockPlugin);
    },
  },
};
export default config;

```

### .vitepress/theme/index.ts

```ts
import DefaultTheme from 'vitepress/theme';
import SmartyUI from '../../../src/entry';
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css';
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(SmartyUI);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);
  },
};
```
