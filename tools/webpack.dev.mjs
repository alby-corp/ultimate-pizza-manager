import merge from 'webpack-merge';
import common from './webpack.common';
import webpack from "webpack";

export default merge(common, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});