const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    clean: true,
  },
  entry: "./src/main.ts",
  mode: isProd ? "production" : "development",
  devServer: {
    port: 8082,
    hot: false,
    liveReload: true,
    client: {
      overlay: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
  },
  stats: {
    all: false,
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      { test: /\.js$/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "edit_user_app_vue3",
      filename: "remoteEntry.js",
      exposes: {
        "./Edit": "./src/components/Edit.vue",
        "./mount": "./src/mount.ts",
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
  ],
};
