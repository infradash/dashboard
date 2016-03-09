var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?/,
      loaders: ['react-hot', 'babel?'+JSON.stringify(
          {
            presets: ['react', 'es2015'],
            'plugins': [
              'syntax-class-properties',
              'syntax-decorators',
              'syntax-object-rest-spread',

              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
      )],
      include: path.join(__dirname, 'src')
    },{
      test: /\.json?/,
      loaders: ['json-loader'],
      include: path.join(__dirname, 'node_modules')
    }]
  }
};
