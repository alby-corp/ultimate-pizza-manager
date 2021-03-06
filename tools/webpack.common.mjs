import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin  from 'html-webpack-plugin';


const __dirname = path.dirname(import.meta.url.replace(process.platform === "win32" ? 'file:///' : 'file://', ''));

export default {
    entry: {
        main: './app/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
        library: 'UltimatePizzaManager',
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
                exclude: [/node_modules/, 'index.html'],
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: "assets/[name].[hash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "underscore"
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })

    ]
};
