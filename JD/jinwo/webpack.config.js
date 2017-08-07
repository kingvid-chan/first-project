var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractStyle = new ExtractTextPlugin('css/style.css'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');

var phaserModule = path.join(__dirname, '/node_modules/.2.6.2@phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.min.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.min.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.min.js');

module.exports = {
    entry: process.env.NODE_ENV === 'production' ? {
        game : './src/js/game.js',
        main : './src/js/app.bundle.js',
        chunk: ['p2', 'pixi.js', 'phaser']
    } : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/js/game.js',
        './src/js/app.bundle.js',
        './webpack.entry.js'
    ],
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './build'),
        publicPath: process.env.NODE_ENV === 'production' ? './' : ''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /(pixi\.js|p2|phaser)/,
            use: "script-loader"
        }, {
            test: /\.scss$/,
            use: process.env.NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader?minimize=true&-url&-reduceTransforms", "sass-loader"] }) : ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        }, {
            test : /\.css$/,
            use: process.env.NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader?minimize=true&-url&-reduceTransforms"] }) : ['style-loader', 'css-loader?sourceMap']
        },{
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: 'require'
                }
            }
        }, {
            test: /\.js$/,
            exclude: /(node_modules|app\.bundle\.js)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify : {
                collapseWhitespace : true,
                minifyCSS : true,
                minifyJS : true,
                removeComments : true
            }
        }),
        extractStyle,
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin({
            banner: 'This is created by chenqingwei'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "chunk", 
            filename: "js/chunk.js",
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([
            {
                from : './src/img',
                to : 'img',
                ignore : ['.gitkeep']
            },{
                from : './src/js/conf.js',
                to : 'js'
            },{
                from : './src/plugin',
                to : 'plugin',
                ignore : ['.gitkeep']
            }
        ])
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.scss', '.html', '.css'],
        alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2
        }
    }
}
