import * as fs from 'fs-extra';
import { resolve } from 'path';
import { config } from '../vite.config';
import { build, InlineConfig, defineConfig, UserConfig } from 'vite';
const buildAll = async () => {
  // const inline: InlineConfig =
  //   viteConfig;

  // 全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig);
  // await build(defineConfig({}))

  const srcDir = resolve(__dirname, '../src/');
  const originOutDir = config.build.outDir;
  const fileList = fs.readdirSync(srcDir);
  fileList
    .filter((name) => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = resolve(srcDir, name);
      const isDir = fs.lstatSync(componentDir).isDirectory();
      return isDir && fs.readdirSync(componentDir).includes('index.ts');
    })
    .forEach(async (name) => {
      const outDir = resolve(originOutDir, name);
      const custom = {
        lib: {
          entry: resolve(srcDir, name),
          name, // 导出模块名
          fileName: `index`,
          formats: [
            `es`,
            'esm',
            //  `umd`
          ],
        },
        outDir,
      };

      Object.assign(config.build, custom);
      await build(defineConfig(config as UserConfig) as InlineConfig);

      fs.outputFile(
        resolve(outDir, `package.json`),
        `{
          "name": "x-ui-vite/${name}",
          "main": "index.umd.js",
          "module": "index.umd.js",
        }`,
        `utf-8`
      );
    });
};

buildAll();
