import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,      // 本地预览端口，可自定义
    open: true,      // 启动后自动打开浏览器
  },
  build: {
    lib: {
      entry: 'index.js', // 入口文件，根据实际情况调整
      name: 'kit',    // 打包后全局变量名
      fileName: (format) => `kit.${format}.js`,
      formats: ['es', 'umd'], // 输出格式
    },
    rollupOptions: {
      // 确保外部化处理你不想打包进库的依赖
      external: [],
      output: {
        globals: {
          // 例如: react: 'React'
        },
      },
    },
  },
});
