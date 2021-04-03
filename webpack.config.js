const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = path.join(__dirname, '../dist')
// const publicPath = __DEV__ ?'/': 'https://mycdn.com/rnw/'
const staticPath = path.join(__dirname, '../static')

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: path.resolve(__dirname, 'src/assets'), to: 'assets' }],
    // }),
    // new CopyWebpackPlugin([{from: 'src/assets/data/1.jpg', to: 'dist'}])
    // new CopyWebpackPlugin([
    //   { context: outputPath, from: '*.png', to: 'images/' },
    //   { context: outputPath, from: staticPath, to: 'static/' },
    // ]),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: 'dist/assets' }
        // { from: path.resolve(__dirname, 'src/assets'), to: 'temp' }
        // { from: Path.resolve('./modules/web/static/favicon.ico'), to: './' },
      ]
    }),
  ]
};
