import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from 'glob';

function getEntries() {
  // 递归查找 src 目录下所有 js 文件
  const files = glob.sync('src/**/*.js');
  const entries = {};
  files.forEach(file => {
    // 去掉 src/ 前缀和 .js 后缀，作为输出文件名
    const outFile = file.replace(/^src\//, '').replace(/\.js$/, '');
    entries[outFile] = resolve(__dirname, file);
  });
  const files2 = glob.sync('index.js');
  files2.forEach(file => {
    const outFile = file.replace(/^src\//, '').replace(/\.js$/, '');
    entries[outFile] = resolve(__dirname, file);
  });

  return entries;
}

export default defineConfig({
  server: {
    port: 3000,      // 本地预览端口，可自定义
    open: true,      // 启动后自动打开浏览器
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getEntries(), // 多入口
      output: {
        entryFileNames: '[name].js', // 输出文件名
        format: 'es',
        // preserveModules: true, // 保持模块结构
        preserveModulesRoot: 'src', // 以 src 为根目录
      },
      external: ['moment'],
    },
    emptyOutDir: true,
  },
});
