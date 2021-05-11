import path from "path";

import { defineConfig } from "vite";
import ReactRefreshPlugin from "@vitejs/plugin-react-refresh";
import eslint from "@rollup/plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";
import vitePluginImp from "vite-plugin-imp";

// vite plugins
// https://github.com/vitejs/awesome-vite#plugins

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      ...eslint({
        fix: true,
        include: "**/*.(js|ts|jsx|tsx)",
        exclude: "node_modules/**",
        throwOnError: true,
        throwOnWarning: true,
      }),
      enforce: "pre", // 需要配置，否则会编译源文件
    },
    new ReactRefreshPlugin(), // 这里eslint和react-refresh插件的顺序存在bug，强制eslint在前，否则会出错
    vitePluginImp({
      // 解决vite中antd样式按需引入，组件默认已经支持按需引入
      // https://github.com/vitejs/vite/issues/1389
      libList: [
        {
          libName: "antd",
          style: (name) => {
            return `antd/lib/${name}/style/index.less`; // 因为替换主题色，所以使用less
          },
        },
      ],
    }),
  ],
  server: {
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 不拆分chunk
      },
      plugins: [
        visualizer({
          open: !!process.env.volume,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
});
