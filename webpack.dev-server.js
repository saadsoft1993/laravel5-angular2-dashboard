let webpack = require('webpack');
let webpackMerge = require('webpack-merge');

let fs = require('fs');

let common = fs.existsSync(__dirname + '/webpack.config.js') ? require(__dirname + '/webpack.config.js') : {};

module.exports = webpackMerge(common, {
    output: {
        publicPath: 'http://localhost:8080/',
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        port: 8080,
    }
});