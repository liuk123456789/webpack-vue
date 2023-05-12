import WebpackChain from 'webpack-chain'

import path from 'path'

import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import HtmlWebpackPlugin from 'html-webpack-plugin'

import { VueLoaderPlugin } from 'vue-loader'

const chainConfig = new WebpackChain()

const isPro = (env: string): env is string => env === 'production'

chainConfig
  .entry('app')
  .add('src/index.ts')
  .end()
  .entry('main')
  .add('src/main.ts')
  .end()
  .output.path('dist')
  .filename('[name].[contenthash:8].js')
  .publicPath('/')
  .chunkFilename('[name].[contenthash:8].js')
  .end()
  .resolve.alias.set('@', path.join(__dirname, '../src'))
  .end()
  .extensions.add('.vue')
  .add('.ts')
  .add('.js')
  .end()
  .modules.add('node_modules')
  .end()

chainConfig
  .when(isPro(process.env.NODE_ENV), (config) =>
    config.optimization
      .minimize(true)
      .usedExports(true)
      .sideEffects(true)
      .runtimeChunk({
        name: 'runtime'
      })
      .splitChunks({
        chunks: 'all',
        minSize: 20000, // 允许新拆出 chunk 的最小体积，也是异步 chunk 公共模块的强制拆分体积
        maxAsyncRequests: 6, // 每个异步加载模块最多能被拆分的数量
        maxInitialRequests: 6, // 每个入口和它的同步依赖最多能被拆分的数量
        enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值并忽略其他限制
        // 分隔代码
        cacheGroups: {
          libs: {
            // 提取node_modules代码
            test: /node_modules/, // 只匹配node_modules里面的模块
            name: 'chunk-libs', // 提取文件命名为vendors,js后缀和chunkhash会自动加
            chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
            priority: 10 // 提取优先级为1
          },
          // 公共模块包，同步模块 chunks 包含同步和异步
          commons: {
            name: 'chunk-commons', // 提取文件命名为commons
            minChunks: 2, // 只要使用两次就提取出来
            minSize: 0, // 提取代码体积大于0就提取出来
            reuseExistingChunk: true // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
          }
        }
      })
      .minimizer('css')
      .use(CssMinimizerPlugin)
      .end()
      .minimizer('terser')
      .use(TerserPlugin)
      .tap((args) => [
        ...args,
        {
          parallel: true, // 开启多线程压缩
          terserOptions: {
            compress: {
              pure_funcs: ['console.log'] // 删除console.log
            }
          }
        }
      ])
      .end()
  )
  .plugin('vue-loader')
  .use(VueLoaderPlugin)
  .end()
  .plugin('html')
  .use(HtmlWebpackPlugin, [
    {
      title: 'Koona Webpack',
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      // 压缩html资源
      minify: {
        collapseWhitespace: true, // 去空格
        removeComments: true // 去注释
      }
    }
  ])
  .end()
  .plugin('ScriptExtHtmlPlugin')
  .after('html')
  .use('script-ext-html-webpack-plugin', [
    {
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }
  ])
  .end()
  .when(isPro(process.env.NODE_ENV), (config) => {
    config
      .plugin('copy')
      .use(CopyPlugin, [
        {
          patterns: [
            {
              from: path.resolve(__dirname, '../public'),
              to: path.resolve(__dirname, '../dist'),
              filter: (source: string) => !source.includes('index.html')
            }
          ]
        }
      ])
      .end()
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin, [
        {
          filename: 'css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
        }
      ])
      .end()
      .plugin('compress')
      .use(CompressionPlugin, [
        {
          test: /\.(js|css)$/, // 只生成css,js压缩文件
          filename: '[path][base].gz', // 文件命名
          algorithm: 'gzip', // 压缩格式,默认是gzip
          threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
          minRatio: 0.8 // 压缩率,默认值是 0.8
        }
      ])
  })
  .module.rule('compile')
  .test(/\.vue$/)
  .use('vue-loader')
  .end()
  .rule('js')
  .exclude.add((file) => /node_modules/.test(file) && !/\.vue\.js/.test(file))
  .end()
  .test(/\.js$/)
  .use('babel-loader')
  .end()
  .rule('ts')
  .exclude.add(/node_modules/)
  .end()
  .use('babel-loader')
  .end()

console.log(chainConfig.toConfig())
