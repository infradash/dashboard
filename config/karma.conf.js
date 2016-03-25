var webpackConfig = require('./webpack.base.js');
module.exports=function(config) {
  config.set({
    files: [
      '../app/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      '../app/**/*.spec.js': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],
    webpack: Object.keys(webpackConfig).filter(function(name) {
      return name!=='plugins';
  	}).reduce(function(result, current){
      result[current] = webpackConfig[current];
      return result;
    }, {}),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
