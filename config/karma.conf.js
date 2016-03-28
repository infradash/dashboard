module.exports = function(config) {
  config.set({
    files: [
      '../test/**/*.spec.js'
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      '../test/**/*.spec.js': ['webpack']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'progress', 'coverage'],
    webpack: require('./webpack.base.js'),
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        { type : 'html', dir : '../coverage' }
      ]
    }
  });
};
