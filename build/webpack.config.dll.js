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
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, '../dist/dll'),
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