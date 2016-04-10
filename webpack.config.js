const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pkg = require('./package.json');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    root: PATHS.app
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'index_template.html'
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: PATHS.app,
        exclude: /node_modules|test/
      }
    ],
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json?/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass']
        }
      ]
    }
  });
} else if(TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new CleanWebpackPlugin([PATHS.build]),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
} else {
  module.exports = common;
}
