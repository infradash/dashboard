var path              = require('path'),
    baseConfig        = require('./webpack.base.js'),
    webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = Object.create(baseConfig);

config.devtool = 'source-map';

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }),
  new ExtractTextPlugin("style.css", { allChunks: false }),
  new HtmlWebpackPlugin({
    template: 'index_template.html'
  })
];

module.exports = config;
