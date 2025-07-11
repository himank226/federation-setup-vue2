const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  devServer: {
    port: 8080,
    hot: true,
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
    clean: true,
  },

  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
    },
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
      name: "shell_vue2",
      filename: "remoteEntry.js",
      remotes: {
        user_app_vue3: "user_app_vue3@http://localhost:8081/remoteEntry.js",
        edit_user_app_vue3:
          "edit_user_app_vue3@http://localhost:8082/remoteEntry.js",
      },
      exposes: {
        "./i18n": "./src/translation/i18n", // Exposing the i18n instance to remotes
      },
      shared: {
        vue: { singleton: true, eager: true },
        "vue-i18n": { singleton: true, eager: true },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
  ],
};
