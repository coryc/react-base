import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
    target: 'web',
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'app.js'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
            },
            inject: true,
            title: "react-base"
        })
    ],
    module: {
        rules: [
          {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']}
        ]
    }
};
