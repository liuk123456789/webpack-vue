import { Configuration, DefinePlugin } from 'webpack'

import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'

import { VueLoaderPlugin } from 'vue-loader'

import Dotenv from 'dotenv-webpack'

import { generateCssLoader } from './utils'

const webpackBaseConfig: Configuration = {
  entry: path.join(__dirname, '../src/main.ts'),
  output: {
    filename: '[name]_[contenthash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // babel
      {
        test: /\.js$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: ['babel-loader']
      },
      // ts
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      ...generateCssLoader()
    ]
  },
  resolve: {
    extensions: ['.vue', '.ts', '.tsx', '.js', '.less', '.scss', '.sass', '.styl'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Koona Webpack',
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      // 压缩html资源
      minify: {
        collapseWhitespace: true, // 去空格
        removeComments: true // 去注释
      }
    }),
    new Dotenv({
      path: path.join(__dirname, '../.env.' + process.env.BASE_ENV)
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      GLOBAL_INFO: JSON.stringify({
        BASE_ENV: process.env.BASE_ENV,
        NODE_ENV: process.env.NODE_ENV
      })
    })
  ]
}

export default webpackBaseConfig
