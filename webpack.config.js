const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
        filename: '[name].[hash:8].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json']
    },
    devServer: {
        port: 8080, // 端口号
        hot: true,
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
            }, {
                test: /\.(le|c)ss?$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')()
                            ]
                        }
                    }
                }, 'less-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit: 10240,
                            esModule: false,
                            name: '[name]_[hash:6].[ext]', // ext保留文件的后缀名
                            outputPath: 'assets/images'
                        },
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.5, 0.65],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        }
                    }
                ],
            }, 
            {
                test: /.html$/,
                use: 'html-withimg-loader'
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
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({patterns:
            [
                {
                    from: path.resolve(__dirname, 'public', 'js'),
                    to: path.resolve(__dirname, 'dist', 'js'),
                    flatten: true,
                    globOptions: {
                        ignore: ['**/test.js']
                    }
                }
            ], 
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new OptimizeCssPlugin(),
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ]
}