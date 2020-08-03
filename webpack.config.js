const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(process.env.NODE_ENV);
module.exports = {
    mode: process.env.NODE_ENV,
    devServer: {
        port: 8080, // 端口号
        open: true, // 自动打开浏览器
        quiet: false,// 静默，控制台错误以及警告不显示
        inline: true, // 默认开启inline模式，如果设置为false,开启iframe模式
        // stats: "errors-only", // 终端仅打印error
        overlay: false, // 当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
        // clientLogLevel: "silent", //日志等级
        compress: true, //是否启用 gzip 压缩
    },
    devtool: 'cheap-module-eval-source-map',// 用于开发环境
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ // 排除node_modules目录
            }
        ]
    },
    plugins: [
        // 数组 存放plugin插件
        new HtmlWebpackPlugin({
            template: './public/index.html',// 模板所在文件夹
            filename: 'index.html', // 打包生成的文件名称
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
        })
    ]
}