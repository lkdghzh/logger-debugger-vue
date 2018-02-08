const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const FlowtypePlugin = require('flowtype-loader/plugin');

const DIST_JS_PATH = path.resolve(__dirname, '../dist')
const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules')
const SRC_PATH = path.resolve(__dirname, '../src')

const TPL_PATH = path.resolve(__dirname, '../examples/unar/index.ejs')
const DIST_HTML_PATH = path.resolve(__dirname, '../dist/index.html')

module.exports = {
    entry: {
        Unar: ['webpack-hot-middleware/client', './src/platforms/web/entry-runtime-with-compiler.js']
    },
    output: {
        path: DIST_JS_PATH,
        publicPath: '/',
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
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias:{
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
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'eval-source-map' //这个占的打包太大，上线去掉
}