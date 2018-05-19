import webpack from 'webpack';
import {prod} from './webpack.config.js'; // <-- Contains ES6+

const bundler = webpack(prod);

bundler.run();