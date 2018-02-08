const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const FlowtypePlugin = require('flowtype-loader/plugin');

const DIST_JS_PATH = path.resolve(__dirname, '../examples/unar/')
const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules')
const SRC_PATH = path.resolve(__dirname, '../src')
console.log(1, path.resolve(__dirname, '../../../src/core/'))

const TPL_PATH = path.resolve(__dirname, '../examples/unar/index.ejs')
const DIST_HTML_PATH = path.resolve(__dirname, '../examples/unar/index.html')
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: DIST_JS_PATH,
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        enforce: 'pre',
        exclude: NODE_MODULES_PATH,
        include: SRC_PATH,
        use: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: NODE_MODULES_PATH,
        include: SRC_PATH,
        use: "babel-loader"
      },
      {
        test: /\.js$/,
        loader: 'flowtype-loader',
        enforce: 'pre',
        exclude: NODE_MODULES_PATH,
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
    //   core: path.resolve(__dirname, './src/core/'),
    //   shared: path.resolve(__dirname, './src/core/'),
    //   web: path.resolve(__dirname, './src/core/'),
    //   compiler: path.resolve(__dirname, './src/core/'),
      vue: path.resolve(__dirname, '../src/platforms/web/entry-runtime-with-compiler'),
      compiler: path.resolve(__dirname, '../src/compiler'),
      core: path.resolve(__dirname, '../src/core'),
      shared: path.resolve(__dirname, '../src/shared'),
      web: path.resolve(__dirname, '../src/platforms/web'),
      weex: path.resolve(__dirname, '../src/platforms/weex'),
      server: path.resolve(__dirname, '../src/server'),
      entries: path.resolve(__dirname, '../src/entries'),
      sfc: path.resolve(__dirname, '../src/sfc')
    }
  },
  plugins: [
    new FlowtypePlugin(),
    new htmlWebpackPlugin({
        filename: DIST_HTML_PATH,
        template: TPL_PATH,
    }),
  ]
}
