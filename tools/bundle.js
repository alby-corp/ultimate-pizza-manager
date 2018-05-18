import webpack from 'webpack';
import webpackConfig from './webpack.config.js'; // <-- Contains ES6+

const bundler = webpack(webpackConfig);

bundler.run();