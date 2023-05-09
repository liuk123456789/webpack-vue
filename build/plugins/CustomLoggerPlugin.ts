import { Compiler, WebpackPluginInstance } from 'webpack'

export default class LogWebpackPlugin implements WebpackPluginInstance {
  emitCallback: () => void
  doneCallback: () => void
  constructor(doneCallback: () => void, emitCallback: () => void) {
    this.emitCallback = emitCallback
    this.doneCallback = doneCallback
  }
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap('LogWebpackPlugin', () => {
      this.emitCallback()
    })
    compiler.hooks.done.tap('LogWebpackPlugin', () => {
      this.doneCallback()
    })
    compiler.hooks.compilation.tap('LogWebpackPlugin', () => {
      // compilation（'编译器'对'编译ing'这个事件的监听）
      console.log('The compiler is starting a new compilation...')
    })
    compiler.hooks.compile.tap('LogWebpackPlugin', () => {
      // compile（'编译器'对'开始编译'这个事件的监听）
      console.log('The compiler is starting to compile...')
    })
  }
}
