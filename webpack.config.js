var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpackConfig = {
        entry: {
            app: './src/main.js',
            vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'fastclick', 'weixin-js-sdk', 'scriptjs', 'vue-swipe', 'alloytouch']
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/dist/',
            filename: 'js/[name].js',
            // filename: 'js/[name].[hash].js'
        },
        module: {
            rules: [
                /*
                {
                    enforce: 'pre',
                    test: /.vue$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                },
                */
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'style-loader!css-loader?minimize&-autoprefixer!sass-loader',
                        },
                        postcss: [
                            require('autoprefixer')({
                                browsers: ['last 5 versions']
                            })
                        ]
                    }
                }, {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }, {
                    test: /\.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                }, {
                    test: /\.json$/,
                    loader: 'json-loader'
                }, {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&minetype=application/font-woff'
                }, {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }, {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'images/[name].[hash].[ext]'
                    }
                }
            ]
        },
        resolve: {
            alias: {
                components: path.resolve(__dirname, './src/components'),
                libs: path.resolve(__dirname, './src/libs'),
                views: path.resolve(__dirname, './src/views'),
                images: path.resolve(__dirname, './src/assets/images'),
                style: path.resolve(__dirname, './src/assets/scss'),
            },
            extensions: ['.js', '.json', '.vue']
        },
        devServer: {
            // contentBase: './dist',
            hot: true,
            host: '0.0.0.0'
        },
        plugins: [
            // new ExtractTextPlugin('style.css'),
            new webpack.ProvidePlugin({
                utils: path.resolve(__dirname, './src/libs/utils.js')
            }),
            new webpack.ProvidePlugin({
                APP: path.resolve(__dirname, './src/libs/appConfig.js')
            }),
        ],
        // devtool: '#eval-source-map'
    };
if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#source-map',
    // http://vue-loader.vuejs.org/en/workflow/production.html
    // webpackConfig.output.filename = 'js/[name].[hash].js';
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
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
            filename: 'js/vendor.js',
            // filename: 'js/vendor.[hash].js'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './template/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: false, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        })
    ]);
}
module.exports = webpackConfig;