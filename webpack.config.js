var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

process.noDeprecation = true;

module.exports = {
    entry: './source/index.js',
    output: {
        path: __dirname + '/dist/assets',
        filename: 'bundle.js',
        publicPath: 'assets',
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { url: false } }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true
        })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './source'),
        },
    }
};