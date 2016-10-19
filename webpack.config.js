var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var plugins = [
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    })
];

module.exports = {
    entry:{
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            components: path.join(__dirname, './src/components'),
            assets: path.join(__dirname, './src/assets'),
            libs: path.join(__dirname, './src/libs'),
            views: path.join(__dirname, './src/views'),
            v_vuex:path.join(__dirname, './src/vuex')
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
                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
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
    plugins: plugins

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
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
