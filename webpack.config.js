const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: `${__dirname}/dist/js`,
        filename: "bundle.js"
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            ["env", {
                                "targets": {
                                "browsers": ["last 2 versions", "safari >= 7"]
                                }
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: '../css/style.css'
        })
    ]
}
