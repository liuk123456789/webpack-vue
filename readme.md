# webpack的搭建项目说明 #

## 版本说明 ##

webpack: 4.44.1
webpack-cli: 3.3.12

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

 2. esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />

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
        	//不需要传参数喔，它可以找到 outputPath
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


-----------在这里做了一次提交git，大部分的骨架已经显露出来，接下来就是细分生产环境和开发环境的一些，开始写的优点乱，同时有些东西是固定的，需要改成动态的--------