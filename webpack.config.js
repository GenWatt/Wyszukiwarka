const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: ["./script.js", "./SCSS/style.scss"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
        test: /\.s[ac]ss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader",  "sass-loader"],
        }),
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
      template: "./index.html"
    }),
    new ExtractTextPlugin("style.css"),
  ],
};