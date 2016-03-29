var path              = require('path'),
    baseConfig        = require('./webpack.base.js'),
    webpack           = require('webpack');

var config = Object.create(baseConfig);

Array.prototype.push.apply(config.plugins, [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]);

module.exports = config;
