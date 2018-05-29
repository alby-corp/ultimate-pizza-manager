import webpack from 'webpack';
import prod from './webpack.prod';
import dev from './webpack.dev'


const args = process.argv.slice(2);

const options = args[0] === 'prod'? prod: dev;

webpack(options, (err, stats) => {
    console.log(`ERROR: ${err}`);
    console.log(`STATS: ${stats}`);
});