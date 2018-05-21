const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");

// const __dirname = path.dirname(import.meta.url.replace('file:///', ''));

module.exports = {
    entry: {
        main: './app/main.js',
        vendor: ['jquery', 'bootstrap', 'underscore'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
        ]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        // runtimeChunk: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "underscore"
        })
    ]
};
