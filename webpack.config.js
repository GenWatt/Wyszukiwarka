var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "https://GenWatt.github.io/Wyszukiwarka",
  },
  module: {
    rules: [{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",

          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        loader: "buble-loader",
        include: path.join(__dirname, "src"),
        options: {
          objectAssign: "Object.assign",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./sb.html",
    }),
    autoprefixer
  ],
};