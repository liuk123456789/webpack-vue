# webpack的搭建项目说明 #

## 版本说明 ##

webpack: 4.44.1
webpack-cli: 3.3.12

## webpack 重要的几个概念 ##

module --> chunk --> bundle

module: 模块，webpack的最小单位，包含了代码脚本js、通过import/require引入的文件，js,css,img等。

chunk: 模块组合变成了块，包括入口文件、import/require引入的module、拆分的代码块
bundle: webpack将chunk打包输出的便是bundle,所以bundle和chunk存在一一对应的关系

## 主要分为3个部分 ##

 1. webpack的基本配置
 2. 一些loader、plugin的使用，配置vue环境是否可正常本地运行以及打包，配置开发以及生产环境
 3. 借助插件等来优化打包

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

	[ https://juejin.im/post/6844904008679686152]( https://juejin.im/post/6844904008679686152)

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

   说明：webpack不能直接处理css,需要借助loader.如果是.css,需要style-loader,css-loader因为css3的一些样式存在兼容性，所以还需要加上postcss-loader,和autoprefixer（自动添加前缀） ，如果是less或者sass的话，需压迫less.loader和sass.loader。这次我们以less和css为例

		npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D

   说明：

   1. style-loader动态创建style标签，将css插入到head中
   2. css-loader负责处理@import等语句
   3. postcss-loader和autoprefixer,自动生成兼容浏览器前缀
   4. less-loader负责处理编译.less文件，将其转换为css

   注意：

	loader的执行顺序是从右向左执行，也就是后面的loader先执行，
	loader存在一个参数enforce,值可以为pre(优先执行),post(滞后执行)。

## 图片/字体处理 ##

我们可以使用url-loader或者file-loader来处理本地资源文件，url-loader和file-loader的功能类似，但是url-loader可以指定文件大小小于限制时，返回DataUrl（base64）

	npm install url-loader -D

会提示安装file-loader,也安装好这个依赖

 1. 找到一张小于10k的图片，控制查看下这个元素的url对应的是否是base64格式的

 2. esModule 设置为 false，否则，`<img src={require('XXX.jpg')} />` 会出现 <img src=[Module Object] />

### 处理html的本地图片 ###

安装依赖

	npm install html-withimg-loader -D

## 入口配置 --entry ##

	entry:值可以是一个字符串，一个数组，或者是一个对象
	为数组时，表示多个主入口

## 出口配置 ##

	output: {
		path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
		filename: '[name].[hash:8].js', // 输出文件名称
		publicPath: '/',
	}

## 每次打包前清空dist目录 ##

安装依赖
	
	npm install clean-webpack-plugin -D

	//webpack.config.js
	const { CleanWebpackPlugin } = require('clean-webpack-plugin');

	module.exports = {
    	//...
    	plugins: [
        	//不需要传参数，它可以找到 outputPath
        	new CleanWebpackPlugin() 
    	]
	}

### 希望dist目录下某个文件夹不被清空 ###

	//webpack.config.js
	module.exports = {
    	//...
    	plugins: [
        	new CleanWebpackPlugin({
            	cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        	})
    	]
	}


## 2.webpack的进一步配置 ##

### 1.静态资源拷贝 ###

说明：拷贝静态资源是不需要经过webpack打包的一些文件，使用的是copy-webpack-plugin

		npm install copy-webpack-plugin -D

使用：看具体的代码

参数说明： 

flatten 这个参数，设置为 true，那么它只会拷贝文件，而不会把文件夹路径都拷贝

ignore 忽略一些文件

注意： copy-webpack-plugin^6.0.3版本配置如下

    new CopyWebpackPlugin({
        patterns: [{
            from: path.join(__dirname,'../static'),
            to: 'static',
            globOptions: {
                ignore: [
                    '**/.*'
                ]
            }
        }]
    })

### 2.抽离css ###

1.安装依赖

	npm install mini-css-extract-plugin -D

    mini-css-extract-plugin 和 extract-text-webpack-plugin 相比:

	1. 异步加载
	2. 不会重复编译
	3. 更能容易使用
	4. 只适用CSS

2.压缩CSS --开发环境不需要配置CSS压缩
	
	npm install optimize-css-assets-webpack-plugin -D

3.说明：如果将optimize-css-assets-webpack-plugin 配置在plugins中，正常压缩。如果配置在optimization中则需要配置下js压缩

     optimization: {
       minimizer: [
         new UglifyJsPlugin({
           cache: true,
           parallel: true,
           sourcMap: true
         }),
         new OptimizeCssAssetsPlugin({
           assetNameRegExp: /\.optimize\.css$/g,
           cssProcessor: require('cssnano'),
           cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
           canPrint: true
         }),
       ],
     },

### 3.按需加载 -- import(***)语法，异步操作，返回一个promise.使用then回调 ###

需要 @babel/plugin-syntax-dynamic-import 的插件支持

	使用场景vue路由懒加载

	const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue');

	webpackChunkName：代表打包后的名字

### 4.热更新 ###

 1. 配置devServer的hot 为true
 2. 并且在plugins中增加new webpack.HotModuleReplacementPlugin()
 3. 不希望整个页面刷新的话，需要在入口文件配置

 		if(module && module.hot) {
    		module.hot.accept()
		}

### 5.多页面应用的打包 --跳过###

### 6.resolve配置 ###

概述：resolve配置webpack如何查找模块对应文件的规则

 1. module

	resolve.module配置webpack去哪些目录下寻找第三方模块，默认情况下只会去node_modules下寻找，如果我们项目中某个文件夹下的模块经常被导入，不希望写很长的路径，那么就可以通过配置 resolve.modules 来简化。

    // 比如
    module.exports = {
        //....
        resolve: {
            modules: ['./src/components', 'node_modules'] //从左到右依次查找
        }
    }
 2. alias 别名
 3. extensions --查找文件的优先级

         //webpack.config.js
         module.exports = {
             //....
             resolve: {
                 extensions: ['web.js', '.js'] //当然，你还可以配置 .json, .css
             }
         }


### 7.区分不同的环境 ###

说明：在这里我们选择跟vue一样，新建三个文件webpack.dev.js,webpack.prod.js,webpack.base.js

 - webpack.dev.js 开发环境的配置
 - webpack.prod.js 生产环境的配置
 - webpack.base.js 公共配置

这里因为需要merge(合并)webpack.base.js的配置。所以需要借助一个共webpack-merge

	npm install webpack-merge -D


### 8.搭建vue环境所需依赖 ###

	安装版本说明：
    vue版本：vue^2.6.11
	vue-loader版本： vue-loader^15.9.3
	vue-template-compiler版本：vue-template-compiler^2.6.11
	vue-router版本：^3.3.4

测试步骤

 1. webpack配置vue-loader

    	// 配置如下
    	{
        	test: /\.vue$/,
        	loader: 'vue-loader',
    	},
    -- 注意 vue-loader 15.x之后，必须手动配置VueLoaderPlugin
    
 2. 设置入口文件main.js，webpack配置的入口

 3. 新建App.vue，作为主路由

		<template>
    		<div id="app">
        		<router-view />
    		</div>
		</template>

		<script>
    		export default {
        		name: 'App',
        		data: () => ({
        		}),
        		created() {
        		}
    		}
		</script>

    --注意：只有配置路由信息，<router-view />才会生效，否则报错

 4. main.js 文件配置Vue以及路由相关信息 --如下

         import Vue from 'vue';
         import App from './App.vue';
         import routes from './routes';
         import VueRouter from 'vue-router';

         Vue.config.productionTip = false;
         Vue.use(VueRouter);

         const router = new VueRouter({
             mode: 'hash',
             routes
         })
         new Vue({
             router,
             render: h => h(App)
         }).$mount("#app")

         if (module && module.hot) {
             module.hot.accept()
         }

	--注意：vue代码版本存在compile(模板)模式和runtime(运行)模式 vue 2.x采用了runtime模式：

        // runtime写法
        new Vue({
            router,
            render: h => h(App)
        }).$mount("#app") 

        // compile写法
        new Vue({
            el: '#app',
            router,
            components: { App },
            template: '<App/>'
        })

 5. 创建路由，简单调试下 --代码见页面

 6. 路由懒加载 + npm run build 名字设置

	// 比如
	component: () => import(/*wbpackChunkName: "home" */"@/views/home/home.vue")
	
	// 当前版本的"@babel/preset-env": "^7.11.0",已经预设了@babel/plugin-syntax-dynamic-import，所以不需配置

	// 否则

		1. 安装依赖

		npm install --save-dev @babel/plugin-syntax-dynamic-import

		2. 配置

		.babelrc文件中配置

		"plugins": ["@babel/plugin-syntax-dynamic-import"]

 7. 引入样式、图片等看看打包是否可以正常运行

	图片是正常的
	问题：抽离出来的css 文件名称是不对的，需要处理vue-loader。还在查看别人写的webpack对于这个处理


-----------提交至master分支，大部分的骨架已经出来，接下来就是细分生产环境和开发环境的一些，开始写的优点乱，同时有些东西是固定的，需要改成动态的，同时常用的几种方式优化打包速度---------

 提取步骤：

 1. 更目录下新建一个build文件夹，将webpack.config.**文件放入文件夹中
 2. 抽离出生产和开发共同配置放入webpack.config.base.js文件 --具体看代码
 
	大概以下几点 --这里根据需要根据自己的配置来修改

	1. entry、ouput 出入口
	2. resolve 配置
	3. rules的配置

 3. 开发环境/生产环境的区别

	开发环境注重的是热更新、代码调试、本地服务的构建速度、构建错误提醒等等，至于代码压缩，样式、图片、js,懒加载这些优化打包速度以及打包文件大小是生产环境主动的


### 3.打包优化 ###

 插件使用：speed-measure-webpack-plugin，用于测量各个插件和loader所花费时间

 1. exclude/include 确保转移尽可能少的文件，exclude指定要排除的文件，include指定要包含的文件

	exclude 的优先级高于 include，在 include 和 exclude 中使用绝对路径数组，尽量避免 exclude，更倾向于使用 include。这样缩小了查找范围

	具体看webpack.config.prod.js的配置

 2. cache-loader 在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中。默认保存在 node_modueles/.cache/cache-loader 目录下
   
    -------------------- 以上的优化提交在webpack_1.1分支--------------------

 3. externals + cdn 优化打包文件体积

	1. externals 设置vue和vue-router不参与打包

			// webpack.config.prod.js

			externals: {
				'vue': 'Vue',
				'vue-router': 'VueRouter',
        		'element-ui': 'ElementUI'
				'lodash': '_'
			}
--------------代码提交至webpack_1.2分支，是在webpack_1.1分支下创建的分支--------
 4. noParse
 
	如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash

	// 举例， webpack.config.base.js
	noParse: /lodash/

 5. IgnorePlugin --webpack内置插件，作用是忽略第三方包指定目录

	// 语法格式
	new webpack.IgnorePlugin(requestRegExp, contextRegExp);
	
	参数： 
		requestRegExp 匹配资源请求路径的正则表达式
		contextRegExp （可选）匹配test资源的上下文的正则表达式

----------------------------这部分不做演示---------------------------------

 6. DllPlugin
	
	简述一下DllPlugin 的步骤

	1. build文件夹新建webpack.config.dll.js文件

            // 具体如下
             const webpack = require('webpack');
             const path = require('path');

             // 需要打包进来的文件
             const vendors = [
                 'vue',
                 'vue-router',
                 'element-ui'
             ];
             module.exports = {
                 entry: {
                    vendor: vendors
                 },
                 mode: 'production',
                 output: {
                     filename: '[name].dll.[hash:6].js', // 输出的名字
                     path: path.resolve(__dirname, '../dist/dll'), // 路径
                     library: '[name]_dll', // 暴露给外部使用
                     // librayTarget 指定如何暴露内容，缺省时就是 var
                 },
                 plugins: [
                     new webpack.DllPlugin({
                         // name必须和library一致
                         name: '[name]_dll',
                         path: path.resolve(__dirname, '../dist/dll/mainfest.json') //manifest.json的生成路径
                     })
                 ]
             };

	2. package.json配置脚本

            "scripts": {
                "dev": "cross-env NODE_ENV=development webpack-dev-server --config=build/webpack.config.dev.js",
                "build": "cross-env NODE_ENV=production node build/build.js",
                "build:dll": "webpack --config build/webpack.config.dll.js", // 重点关注这个就行
            },
	3. webpack.config.prod.js文件配置DLLReferencePlugin让mainfest.json映射到相关依赖上

			plugins: [
				new webpack.DllReferencePlugin({
            		manifest: path.resolve(__dirname, '../dist/dll/mainfest.json')
        		})
			]

--------------------这部分代码提交webpack_1.3分支上 -----------------------------

 7. 抽离公共代码splitChunk --webpack 4.x自带的插件，默认存在 --还不太懂

	说明：webpack4之前使用的commonsChunkPlugin的进行块分割

	一般多用于多入口的打包，重复引入第三方库时使用，

	不需要安装splitChunksPlugin 因为自带
	
	默认配置是这样的

    module.exports = {
        optimization: {
            splitChunks: {
                chunks: "async",// all async initial
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: "~",
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
    };

	参数：
	 - minSize(默认是30000): 形成一个新代码块最小的体积
	 - minChunks(默认是1):在分割之前，这个代码块最小应该被应用的次数
	 - maxInitialRequests（默认是3）：一个入口最大的并行请求数
	 - maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数。
	 - chunks (默认是async) ：initial、async和all
	 - test: 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
	 - name（打包的chunks名字）：字符串或者函数(函数可以根据条件自定义名字)
	 - priority：缓存组打包的先后优先级。
	 - cacheGroup:缓存组，抽取公共模块都是在这里使用
	 - minChunks:最小块，即当块的数量大于等于minChunks时，才起作用
	
	我也是在参考这篇文章先写个demo：[https://juejin.im/post/6844903614759043079](https://juejin.im/post/6844903614759043079)

	后面会完善这部分，因为很重要

目前先说说webpack构建webpack 构建Vue多页面应用

## 构建Vue多页面应用 ##


	
 1. webpack自身的优化

	2. tree-shaking

		使用ES6的import语法，那么生产环境下移除没有使用的代码

	2. scope hosting作用域提升

		变量提升，可以减少一些变量声明。在生产环境下，默认开启。生产环境默认开启


-----------------------以下未提及的两种优化------------------------------

 9. happypack 
 
	大量文件需要处理和解析，主要就是让webpack同一时刻处理多个任务

	1. 安装依赖 

			npm install happypack -D
	2. 修改配置文件 webpack.config.base.js

            const Happypack = require('happypack');
            module.exports = {
                //...
                module: {
                    rules: [
                        {
                            test: /\.js[x]?$/,
                            use: 'Happypack/loader?id=js',
                            include: [path.resolve(__dirname, 'src')]
                        },
                        {
                            test: /\.css$/,
                            use: 'Happypack/loader?id=css',
                            include: [
                                path.resolve(__dirname, 'src'),
                                path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                            ]
                        }
                    ]
                },
                plugins: [
                    new Happypack({
                        id: 'js', //和rule中的id=js对应
                        //将之前 rule 中的 loader 在此配置
                        use: ['babel-loader'] //必须是数组
                    }),
                    new Happypack({
                        id: 'css',//和rule中的id=css对应
                        use: ['style-loader', 'css-loader','postcss-loader'],
                    })
                ]
            }
 10. HardSourceWebpackPlugin

	HardSourceWebpackPlugin 为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source。

	1. 安装依赖

		npm install hard-source-webpack-plugin -D

	2. 修改webpack.config.base.js配置

        //webpack.config.js
        const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
        module.exports = {
            //...
            plugins: [
               new HardSourceWebpackPlugin()
            ]
        }
