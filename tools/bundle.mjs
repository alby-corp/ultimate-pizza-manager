import webpack from 'webpack';
import prod from './webpack.config.mjs'; // <-- Contains ES6+

const bundler = webpack(prod);

bundler.run();