var path              = require('path'),
    baseConfig        = require('./webpack.base.js'),
    webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = Object.create(baseConfig);

config.devtool = 'cheap-module-source-map';

config.plugins = [
  new ExtractTextPlugin("style.css", { allChunks: false }),
  new HtmlWebpackPlugin({
    template: 'index_template.html'
  })
];

module.exports = config;
