// const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname,'..','dist'),
        filename: '[name].[hash:6].js',
        chunkFilename: 'router/[name].[hash:6].js',
        publicPath: '/'
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ElementUI',
        'lodash': '_'
    },
    resolve: {
        // modules: [path.resolve(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '..', 'src')
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: ['vue-loader'],
                include: [path.resolve(__dirname, '../src')]
            },
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                // exclude: /node_modules/
                include: [path.resolve(__dirname, '../src')]
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
                    include: [path.resolve(__dirname, '../src')]
                    // exclude: /node_modules/
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
                include: [path.resolve(__dirname, '../src')]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new VueLoaderPlugin()
    ]
}