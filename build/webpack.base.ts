import { Configuration } from 'webpack'

import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'

import { VueLoaderPlugin } from 'vue-loader'

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
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.ts', '.tsx', '.js']
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
    })
  ]
}

export default webpackBaseConfig
