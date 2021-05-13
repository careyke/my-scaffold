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
  cache: true,
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
  // webpack-dev-server4之后配置有修改：changelog
  // https://github.com/webpack/webpack-dev-server/blob/08a83a65f5c500a648c12faa2fa03122ee380c8b/CHANGELOG.md
  devServer: {
    static: path.join(__dirname, "../dist"),
    port: 8000,
    compress: true,
    hot: true,
    open: ["index.html"],
    // openPage: "index.html", // webpack-dev-server4之后被移除，使用open统一配置
    // publicPath: "/", // webpack-dev-server4之后被移到了static中
    // quiet: true, // webpack-dev-server4之后去掉了quiet, 使用webpack中的stats模块
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
});
