module.exports = function(config) {
  config.set({
    files: [
      'test/**/*.spec.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'progress'],
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};