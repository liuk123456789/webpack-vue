import webpackProdConfig from './webpack.prod'

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { merge } from 'webpack-merge'

// import SpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin'

// const smp = new SpeedMeasureWebpackPlugin()

const webpackAnalyConfig = merge(webpackProdConfig, {
  plugins: [new BundleAnalyzerPlugin()]
})

export default webpackAnalyConfig
