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

       