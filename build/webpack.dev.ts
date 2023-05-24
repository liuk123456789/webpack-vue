import path from 'path'

import { merge } from 'webpack-merge'

import webpack, { Configuration } from 'webpack'

import WebpackDevServer from 'webpack-dev-server'

// import { openBrowser } from './browser'

import webpackBaseConfig from './webpack.base'

const host = '127.0.0.1'
const port = 9527

const webpackDevConfig: Configuration = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map'
})

const devServer = new WebpackDevServer(
  {
    host,
    port,
    open: false,
    compress: false,
    hot: true,
    historyApiFallback: true, // history 404
    setupExitSignals: true, // 允许SIGINT和SIGTERM信号关闭开发服务器和退出进程
    static: {
      directory: path.join(__dirname, '../public')
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  webpack(webpackDevConfig)
)

devServer.start().then(() => {
  // 启动界面
  // openBrowser(`http://${host}:${port}`, true)
})

export default webpackDevConfig
