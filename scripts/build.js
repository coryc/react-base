/*
import webpack from 'webpack';
import config from '../webpack.config';

process.env.NODE_ENV = 'production';

console.log('---- HERE ----');

webpack(config).run((err, stats) => {
    if (err) {
        console.log(err);
    }

    if (stats) {
        console.log(`Webpack stats: ${stats}`);
    }

    console.log('Build completed!');

});
*/

var webpack = require('webpack');
var config  = require('../webpack.config');

webpack(config).run(function(err, stats){
    if (err) {
        console.log(err);
    }

    var jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors;
    }

    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: ');
        console.log(jsonStats.warnings);
    }

    console.log('build completed');
});
