var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.js'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
            },
            inject: true
        })
    ],
    module: {
        rules: [
          {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']}
        ]
    }
}
