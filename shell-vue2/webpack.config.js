const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { remoteApps } = require("./remoteConfig");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  // Dynamically build remotes URLs based on env (dev/prod)
  const remotes = remoteApps.reduce((acc, app) => {
    const url = isProd ? app.prodUrl : app.devUrl;
    acc[app.app_name] = `${app.app_name}@${url}`;
    return acc;
  }, {});

  return {
    entry: "./src/main.js",

    mode: isProd ? "production" : "development",
    devtool: isProd ? false : "inline-source-map",
    devServer: isProd
      ? undefined
      : {
          port: 8080,
          hot: true,
          headers: { "Access-Control-Allow-Origin": "*" },
          historyApiFallback: true,
        },

    output: {
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      chunkFilename: isProd ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "auto",
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
        {
          test: /\.css$/,
          use: isProd
            ? [MiniCssExtractPlugin.loader, "css-loader"]
            : ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new VueLoaderPlugin(),

      new ModuleFederationPlugin({
        name: "shell_vue2",
        filename: "remoteEntry.js",
        remotes: remotes, // dynamically set remotes from remoteApps
        exposes: {
          "./i18n": "./src/translation/i18n",
        },
        shared: {
          vue: { singleton: true, eager: true },
          "vue-i18n": { singleton: true, eager: true },
        },
      }),

      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),

      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),

      ...(isProd
        ? [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })]
        : []),
    ],

    optimization: isProd
      ? {
          splitChunks: {
            chunks: "all",
          },
          runtimeChunk: "single",
        }
      : {},
  };
};
