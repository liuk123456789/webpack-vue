import { Configuration } from 'webpack'

import merge from 'webpack-merge'

import webpackBaseConfig from './webpack.base'

import CopyPlugin from 'copy-webpack-plugin'

import path from 'path'

const webpackProdConfig: Configuration = merge(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: (source) => !source.includes('index.html')
        }
      ]
    })
  ]
})

export default webpackProdConfig
