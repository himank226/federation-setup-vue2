const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  mode: "development",
  devServer: {
    port: 8081,
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
  output: {
    publicPath: "auto",
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
      name: "user_app_vue3",
      filename: "remoteEntry.js",
      library: { type: "var", name: "user_app_vue3" },
      exposes: {
        "./vue": "vue",
        "./List": "./src/components/List.vue",
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
