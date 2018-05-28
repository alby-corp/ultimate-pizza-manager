import webpack from 'webpack';
import prod from './webpack.prod';
import dev from './webpack.dev'


const args = process.argv.slice(2);

const bundler = webpack(args[0] === 'prod'? prod: dev);

bundler.run((err, stats) => {
    console.log(`ERROR: ${err}`);
    console.log(`STATS: ${stats}`);
});