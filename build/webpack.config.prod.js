const path = require('path');
const webpack = require('webpack');

const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');// 压缩js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    // optimization: {
    //     //优化项
    //     minimizer: [
    //         new TerserWebpackPlugin({
    //             test: /\.js(\?.*)?$/i,
    //             cache: true, //指定cache第一次构建时会略慢
    //             parallel: 3,
    //             sourceMap: true
    //         }),
    //         new OptimizeCssPlugin()
    //     ]
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssPlugin(),
        new CopyWebpackPlugin({
            patterns:
                [
                    {
                        from: path.resolve(__dirname, '..', 'public/js'),
                        to: path.resolve(__dirname, '..', 'dist/js'),
                        flatten: true,
                        globOptions: {
                            ignore: ['**/test.js']
                        }
                    }
                ],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'auto',// 允许控制在将块包含到HTML中之前应如何对其进行排序
        }),
    ]
}));