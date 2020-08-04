const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssPlugin()
    ]
})