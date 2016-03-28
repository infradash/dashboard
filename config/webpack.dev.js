var baseConfig = require('./webpack.base.js');
var config = Object.create(baseConfig);
config.devtool = 'cheap-module-source-map';
module.exports = config;
