let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
//let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let fs = require('fs');
// require local config if exists
let localConfig = fs.existsSync(__dirname + '/webpack.local.js') ? require(__dirname + '/webpack.local.js') : {};

/*
 const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
 */

module.exports = webpackMerge({
    bail: true,
    profile: true,

    entry: {
        styles: __dirname + '/resources/assets/sass/app.scss',
        polyfills: __dirname + '/resources/assets/js/polyfills.ts',
        vendor: __dirname + '/resources/assets/js/vendor.ts',
        app: __dirname + '/resources/assets/js/app/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',

    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'js/[name].js', // 'js/[name].[hash].js',
        chunkFilename: 'js/[id].chunk.js' // '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /vendor/,
                use: [
                    'ng-router-loader',
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'html-loader', query: {minimize: false}}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[hash].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=font/[name].[ext]'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=font/[name].[ext]'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=font/[name].[ext]'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=font/[name].[ext]'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=font/[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
    ]
}, localConfig);