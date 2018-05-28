import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';

import UglifyJSPlugin from 'uglifyjs-webpack-plugin';


export default merge(common, {
    mode: 'production',
    devtool: '',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});