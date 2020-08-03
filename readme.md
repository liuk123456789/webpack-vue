# webpack的搭建项目说明 #

## 版本说明 ##

webpack: 4.44.1
webpack-cli: 3.3.12

## 本文主要分为3个部分 ##
 1. 通过webpack搭建一个vue项目
 2. 一些loader、plugin的使用
 3. 优化打包速度

## 1.通过webpack搭建vue项目 ##

 1. webpack的核心概念

	- entry: 入口
	- output: 输出
	- loader: 模块转换器，用于把模块原内容按照需求转为新内容
	- 插件（plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

 2. 初始化项目

	1. 新建一个文件夹webpack-vue

		1. 使用npm init -y 初始化项目，这时候生成一个package.json的包文件
		2. npm install webpack webpack-cli -D 安装webpack、webpack-cli包
		3. 根目录下新建src/index.js 文件
		4. 从 wepack V4.0.0 开始， webpack 是开箱即用的，在不引入任何配置文件的情况下就可以使用。使用npx webpack --mode=development进行构建，默认是production模式，我们为了更清楚打包后的代码，使用development模式

 3. 将JS转义为低版本 --使用我们前面提到过的loader,这里使用babel-loader

	babel-loader 还需要一些babel的配置依赖来进行语法转换和polyfill(兼容环境确实的特性)
		
		npm install @babel/core @babel/preset-env @@babel/plugin-transform-runtime -D
		
		npm install @babel/runtime @babel/runtime-corejs3	
	
	1. @babel/core --Babel的核心功能模块，不适用无法进行babel编译
	2. @babel/preset-env 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill，在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的JS特性(ES2015,ES2016等，不包含 stage 阶段)，将其转换成ES5代码。例如，如果你的代码中使用了可选链(目前，仍在 stage 阶段)，那么只配置 @babel/preset-env，转换时会抛出错误，需要另外安装相应的插件。
	3. @babel/plugin-transform-runtime 通常搭配@babel/runtime 是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。
	4. @babel/runtime-corejs3 主要作用时加载polyfill

	> https://juejin.im/post/6844904008679686152

 4. 新建webpack.config.js --具体看文件，注意此时打包还是不会进行语法转换的，因为没有配置.babelrc

		// 这里说明下use的几种用法
		// 字符串 --只有一个loader的情况
		use: 'babel-loader'

		// 数组
		use: ['style-loader', 'css-loader']
		// 对象的情况 --需要通过options字段进行配置
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		},
		exclude: /node_modules/
		
 5. 配置babel 根目录下新建一个.babelrc （也可以向上面那样通过options配置）
 6. development和production 环境的配置配置的mode --后续会通过文件将他们分开
 7. 浏览器查看页面 --具体看页面的配置

		npm install html-webpack-plugin -D
	1. 根目录新建public文件夹，文件夹下新建一个index.html文件夹
 8. 脚本区分环境 

		npm install cross-env -D

	安装完依赖后

		{
    		"scripts": {
        		"dev": "cross-env NODE_ENV=development webpack",
        		"build": "cross-env NODE_ENV=production webpack"
    		}
		}

	cross-env参考：[https://www.cnblogs.com/jiaoshou/p/12187504.html](https://www.cnblogs.com/jiaoshou/p/12187504.html)
	
	浏览器中实时预览 --开发环境状态下（process.env.NODE_ENV === 'development'）

		npm install webpack-dev-server -D

	修改下package.json脚本命令
		
		"scripts": {
			"dev": "cross-env NODE_ENV=development webpack-dev-server",
			"build": "cross-env NODE_ENV=production webpack"
		}

	配置dev-server

 9. devTool --映射源码

	生产环境一般使用：'cheap-module-eval-source-map'
	开发环境：none/source-map

	以下几种方式的对比图
	
    <table>
        <thead>
            <tr>
                <th>devtool</th>
                <th>构建速度</th>
                <th>重新构建速度</th>
                <th>生产环境</th>
                <th>品质(quality)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>none</td>
                <td>+++</td>
                <td>+++</td>
                <td>yes</td>
                <td>打包后的代码</td>
            </tr>
            <tr>
                <td>eval</td>
                <td>+++</td>
                <td>+++</td>
                <td>no</td>
                <td>生成后的代码</td>
            </tr>
            <tr>
                <td>cheap-eval-source-map</td>
                <td>+</td>
                <td>++</td>
                <td>no</td>
                <td>转换过的代码（仅限行）</td>
            </tr>
            <tr>
                <td>eval-source-map</td>
                <td>--</td>
                <td>+</td>
                <td>no</td>
                <td>原始源代码</td>
            </tr>
            <tr>
                <td>cheap-source-map</td>
                <td>+</td>
                <td>o</td>
                <td>no</td>
                <td>转换过的代码（仅限行）</td>
            </tr>
            <tr>
                <td>cheap-module-source-map</td>
                <td>o</td>
                <td>-</td>
                <td>no</td>
                <td>原始源代码（仅限行）</td>
            </tr>
            <tr>
                <td>inline-cheap-source-map</td>
                <td>+</td>
                <td>o</td>
                <td>no</td>
                <td>转换过的代码（仅限行）</td>
            </tr>
            <tr>
                <td>inline-cheap-module-source-map</td>
                <td>o</td>
                <td>-</td>
                <td>no</td>
                <td>原始源代码（仅限行）</td>
            </tr>
            <tr>
                <td>source-map</td>
                <td>--</td>
                <td>--</td>
                <td>yes</td>
                <td>原始源代码</td>
            </tr>
            <tr>
                <td>inline-source-map</td>
                <td>--</td>
                <td>--</td>
                <td>no</td>
                <td>原始源代码</td>
            </tr>
            <tr>
                <td>hidden-source-map</td>
                <td>--</td>
                <td>--</td>
                <td>yes</td>
                <td>原始源代码</td>
            </tr>
            <tr>
                <td>nosources-source-map</td>
                <td>--</td>
                <td>--</td>
                <td>yes</td>
                <td>无源代码内容</td>
            </tr>
            <tr>
                <td>cheap-module-source-map</td>
                <td>o</td>
                <td>-</td>
                <td>no</td>
                <td>原始源代码（仅限行）</td>
            </tr>
        </tbody>
    </table>

	品质说明：
	
	<code>打包后的代码</code> -一大块代码

	<code>生成后的代码</code> -每个模块互相分离，并用模块名称注释。可以看到 webpack 生成的代码。示例：你会看到类似 var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();，而不是 import {test} from "module"; test();。

	<code>转换过的代码</code> -每个模块互相分离，并用模块名称注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 import {test} from "module"; var A = function(_test) { ... }(test);，而不是 import {test} from "module"; class A extends test {}。

	<code>原始源代码</code> -每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持

	<code>无代码内容</code> -source map中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 output.devtoolModuleFilenameTemplate，以匹配源代码的 url。

	<code>仅限行</code> - - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。

## 处理css ##

   说明：webpack不能直接处理css