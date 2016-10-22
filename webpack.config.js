var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: './src/main.js',
        vendors: ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick', 'weixin-js-sdk']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
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
                'style', 'css?sourceMap!sass-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style', 'css')
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
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
    // devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false, }, compress: { warnings: false } }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("style.css"),

    ])
}
