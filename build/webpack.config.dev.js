const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        port: 3000, // 端口号
        hot: true,
        open: true, // 自动打开浏览器
        quiet: false,// 静默，控制台错误以及警告不显示
        inline: true, // 默认开启inline模式，如果设置为false,开启iframe模式
        stats: "errors-only", // 终端仅打印error
        overlay: false, // 当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
        // clientLogLevel: "silent", //日志等级
        compress: true, //是否启用 gzip 压缩
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
})