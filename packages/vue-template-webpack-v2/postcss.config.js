const path = require("path");
const glob = require("glob");

const SRC_PATH = path.resolve(__dirname, "./src");
const htmlPath = path.resolve(__dirname, "./template/index.html");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    "autoprefixer",
    "postcss-preset-env",
    // css module tree shaking :https://github.com/FullHuman/purgecss/issues/163
    !isDev && [
      "@fullhuman/postcss-purgecss",
      {
        // 查找入口范围
        content: [
          htmlPath,
          ...glob.sync(path.join(SRC_PATH, "**/*.{js}"), {
            nodir: true,
          }),
        ],
      },
    ],
  ],
};
