import webpack from 'webpack';
import config from '../webpack.config.prod.js';

process.env.NODE_ENV = 'production';

console.log('Building...');

webpack(config).run((err, stats) => {

    if (err) { // so a fatal error occurred. Stop here.
        console.log(err);
        return 1;
    }

    console.log(`Webpack stats: ${stats}`);

    console.log('Production Build completed');

    return 0;
});
