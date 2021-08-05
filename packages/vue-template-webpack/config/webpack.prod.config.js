const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 这个插件在webpack5之后弃用
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 分析打包体积的时候开启这个插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// 这个插件对于css module无法支持
// const PurgeCSSWebpackPlugin = require("purgecss-webpack-plugin");

const baseConfig = require("./webpack.base.config");

const plugins = [new CleanWebpackPlugin()];
if (process.env.volume) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  plugins: plugins,
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"], passes: 2 },
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
});
