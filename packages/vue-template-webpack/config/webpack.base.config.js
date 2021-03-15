const path = require("path");
const webpack = require("webpack");
//plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const SRC_PATH = path.resolve(__dirname, "../src");
const NODE_MODULE_PATH = path.resolve(__dirname, "../node_modules");
const BUILD_PATH = path.resolve(__dirname, "../dist");
const isDev = process.env.NODE_ENV === "development";

const jsName = isDev ? "js/[name].js" : "js/[name]_[chunkhash:8].js";
const cssName = isDev ? "css/[name].css" : "css/[name]_[contenthash:8].css";
const cssClassName = "[name]_[local]_[hash:base64:4]";

module.exports = {
  target: "web",
  entry: {
    app: path.resolve(SRC_PATH, "index.ts"),
  },
  output: {
    filename: jsName,
    path: BUILD_PATH,
    publicPath: "./",
  },
  resolve: {
    // modules: [path.resolve(__dirname, "../node_modules")], 模板为了调试不打开，单独的项目建议打开
    extensions: [".ts", ".tsx", ".js", ".vue"],
    alias: {
      "@": SRC_PATH,
      "@components": path.resolve(SRC_PATH, "components"),
      "@businessComponents": path.resolve(SRC_PATH, "businessComponents"),
      "@routes": path.resolve(SRC_PATH, "routes"),
      "@utils": path.resolve(SRC_PATH, "utils"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintWebpackPlugin({
      extensions: ["tsx", "ts", "js", "vue"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../template/index.html"),
      filename: path.resolve(BUILD_PATH, "index.html"),
      cache: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new MiniCssExtractPlugin({ filename: cssName }),
    // new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV), // 不明白为啥使用JSON.stringify
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        include: SRC_PATH,
        use: ["cache-loader", "babel-loader?cacheDirectory=true"],
      },
      {
        test: /\.vue$/,
        include: SRC_PATH,
        use: ["vue-loader"],
      },
      {
        // 处理antd的样式文件，不能使用css module
        test: /\.css$/,
        include: NODE_MODULE_PATH,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        include: SRC_PATH,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: cssClassName,
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: SRC_PATH,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "img/[name]_[contenthash:8].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
};
