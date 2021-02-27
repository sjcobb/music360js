// https://github.com/edwinwebb/three-seed/blob/master/webpack.config.js

const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
    entry: ['./src/js/app.js'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js'
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/')
            }, {
                test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: 'file-loader',
                exclude: path.resolve(__dirname, './node_modules/')
            }
        ]
    },
    plugins: [
        // TODO: how to customize html dist output
        new HtmlWebpackPlugin({'title': 'music360js'})
    ]
}