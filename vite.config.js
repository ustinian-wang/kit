import { defineConfig } from 'vite';
import path from 'path';
import glob from 'glob';

function getEntries() {
  const entries = {};
  const files = glob.sync('src/**/*.js');

  files.forEach(file => {
    const name = path.relative('src', file).replace(/\.js$/, ''); // 相对路径不带 .js
    entries[name] = path.resolve(__dirname, file);
  });

  return entries;
}

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      // 不设置 entry，在 rollupOptions.input 中定义多入口
      formats: ['es'],
    },
    rollupOptions: {
      input: getEntries(),
      output: {
        entryFileNames: info => `${info.name}.js`,
        dir: 'dist',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
});
