var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/main.js',
        vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick', 'weixin-js-sdk']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                // vue-loader options go here
                loaders: {
                    // ...
                    sass: 'style!css!sass'
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue',
            components: path.resolve(__dirname, './src/components'),
            assets: path.resolve(__dirname, './src/assets'),
            libs: path.resolve(__dirname, './src/libs'),
            views: path.resolve(__dirname, './src/views'),
            v_vuex: path.resolve(__dirname, './src/vuex')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host:'0.0.0.0'
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
