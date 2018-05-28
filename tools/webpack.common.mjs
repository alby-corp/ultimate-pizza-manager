import path from 'path';
import webpack from 'webpack';

const __dirname = path.dirname(import.meta.url.replace('file:///', ''));

export default {
    entry: {
        main: './app/main.js',
        vendor: './app/vendors.js',
    },
    output: {
        path: path.join(__dirname, '../dist'),
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
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "underscore"
        })
    ]
};
