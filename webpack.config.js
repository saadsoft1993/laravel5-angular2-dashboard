let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
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
        extensions: ['', '.ts', '.js']
    },

    // devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: __dirname + '/public',
        publicPath: 'http://localhost:8080/', // '/'
        filename: 'js/[name].js', // 'js/[name].[hash].js',
        chunkFilename: '[id].chunk.js' // '[id].[hash].chunk.js'
    },

    devServer: {
        // compress: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 8080,
        inline: true,
        progress: true
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript', 'angular2-template']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
            }
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            // }

            // {
            //     test: /\.css$/,
            //     exclude: __dirname + '/src/app',
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            // },
            // {
            //     test: /\.css$/,
            //     include: __dirname + '/src/app',
            //     loader: 'raw'
            // }
        ]
    },

    // htmlLoader: {
    //     minimize: false // workaround for ng2
    // },

    plugins: [
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.DedupePlugin(),

        // https://github.com/angular/angular/issues/10618
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: {
        //         keep_fnames: true
        //     }
        // }),

        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'ENV': JSON.stringify(ENV)
        //     }
        // }),

        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        // new HtmlWebpackPlugin({
        //     template: __dirname + '/src/dist/index.html'
        // })
    ]
}, localConfig);