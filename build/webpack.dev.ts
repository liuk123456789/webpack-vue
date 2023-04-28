import path from 'path'

import { merge } from 'webpack-merge'

import { Configuration as WebpackConfiguration } from 'webpack'

import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

interface WebpackDevConfiguraion extends WebpackConfiguration {
  devServer: WebpackDevServerConfiguration
}

import webpackBaseConfig from './webpack.base'

const webpackDevConfig: WebpackDevConfiguraion = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9527,
    open: true,
    compress: false,
    hot: true,
    historyApiFallback: true, // history 404
    setupExitSignals: true, // 允许SIGINT和SIGTERM信号关闭开发服务器和退出进程
    static: {
      directory: path.join(__dirname, '../public')
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}) as WebpackDevConfiguraion

export default webpackDevConfig
