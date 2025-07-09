const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  devServer: {
    port: 8082,
    hot: false,
    liveReload: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.js$/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "edit_user_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Edit": "./src/web-component.js",
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new VueLoaderPlugin(),
  ],
};
