var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/main.js',
        vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick', 'weixin-js-sdk','scriptjs']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                // vue-loader options go here
                loaders: {
                    // extra style file
                    sass: ExtractTextPlugin.extract({
                            loader: ['css-loader', 'sass-loader'],
                            fallbackLoader: 'style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                        // sass:'style-loader!css-loader!sass-loader'
                }
            }
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js',
            'vue-resource$': 'vue-resource/dist/vue-resource.min.js',
            'vue-router$': 'vue-router/dist/vue-router.min.js',
            components: path.resolve(__dirname, './src/components'),
            assets: path.resolve(__dirname, './src/assets'),
            libs: path.resolve(__dirname, './src/libs'),
            views: path.resolve(__dirname, './src/views')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host: '0.0.0.0'
    },
    plugins: [
            new ExtractTextPlugin("style.css"),
            new webpack.ProvidePlugin({
                utils: path.resolve(__dirname, './src/libs/utils.js')
            }),
            new webpack.ProvidePlugin({
                APP: path.resolve(__dirname, './src/app_config.js')
            })
        ]
        // devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#source-map',
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //zip js file
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}