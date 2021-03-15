const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    publicPath: "/",
  },
  stats: false, // 清除多余日志
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:8000"],
      },
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: "public/css", to: "./css/" },
    //     { from: "public", to: "./" },
    //   ],
    // }),
    // new HtmlWebpackTagsPlugin({
    //   tags: ["css/font-awesome.css"],
    //   append: false,
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // webpack4之后配置有修改：changelog
  // https://github.com/webpack/webpack-dev-server/blob/08a83a65f5c500a648c12faa2fa03122ee380c8b/CHANGELOG.md#400-beta0-2020-11-27
  devServer: {
    static: path.join(__dirname, "../dist"),
    port: 8000,
    compress: true,
    hot: true,
    openPage: "index.html",
    // publicPath: "/", // webpack4之后被移到了static中
    // quiet: true, // webpack4之后去掉了quiet, 使用webpack中的stats模块
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});
