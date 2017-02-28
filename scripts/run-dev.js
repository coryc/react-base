import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

// create the webpack
const pack = webpack(config);

browserSync({
    port: 3000,
    ui: {
        port: 3001
    },
    server: {
        baseDir: 'src',
        middleware: [
            webpackDevMiddleware(pack, {
                publicPath: config.output.publicPath,
                noInfo: false,
                quiet: false,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                },
            }),
            webpackHotMiddleware(pack)
        ]
    },
    files: [
        'src/*.html'
    ]
});
