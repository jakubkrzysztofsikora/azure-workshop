const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package.json");
const _ = require("lodash");

module.exports = {
  entry: {
    js: "./client/index",
    vendor: _.keys(pkg.dependencies)
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.bundle.js"
    }),
    new HtmlWebpackPlugin({
      template: "client/index.html", // Load a custom template
      inject: "body", // Inject all scripts into the body
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx"]
  }
};
