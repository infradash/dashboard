var path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './app/index.js'
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.join(__dirname, '../app')
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  }
};
