var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/main.js',
        vendors: ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick', 'weixin-js-sdk']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            components: path.join(__dirname, './src/components'),
            assets: path.join(__dirname, './src/assets'),
            libs: path.join(__dirname, './src/libs'),
            views: path.join(__dirname, './src/views'),
            v_vuex: path.join(__dirname, './src/vuex')
        },
        extensions: ['', '.js', '.json', '.scss', '.css', '.vue']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!sass-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap")
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        //将样式统一发布到style.css中
        new ExtractTextPlugin("style.css", {
            allChunks: true,
            disable: false
        })
    ]
}
var TEM_PATH = path.resolve(__dirname, './src/templates');
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlwebpackPlugin({
            template: path.resolve(TEM_PATH, 'index.tpl'),
            filename: 'index.html',
            chunks: ['app', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        })

    ])
}
