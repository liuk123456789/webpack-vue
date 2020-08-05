require('./check-versions')(); // 检查版本

const opn = require('opn');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

const port = process.env.port || config.dev.port;

var autoOpenBrowser = !!config.dev.autoOpenBrowser;

const compile = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true
});

