import { defineConfig } from "vite";
import ReactRefreshPlugin from "@vitejs/plugin-react-refresh";
import eslint from "@rollup/plugin-eslint";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new ReactRefreshPlugin(),
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
  ],
  server: {
    port: 8000,
  },
});
