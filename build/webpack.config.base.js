const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js',
        chunkFilename: 'router/[name].[hash:6].js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: {
                //     loaders: {
                //         css: MiniCssExtractPlugin.extract({
                //             use: 'css-loader',
                //             fallback: 'vue-style-loader'
                //         })
                //     }
                // }
            },
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        }
                    },
                    // MiniCssExtractPlugin.loader,
                    'css-loader', {
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
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets/iamges',
                            esModule: false,
                        }
                    },
                    {
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
                exclude: /node_modules/
            },
            // {
            //     test: /\.vue$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyWebpackPlugin({
            patterns:
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
        new VueLoaderPlugin()
    ]
}