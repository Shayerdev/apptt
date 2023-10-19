const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require('webpack');

/*
* Assets Theme files
*/
const entry = {};
const themeScript = require('./webpack.assets');

themeScript.map( file => {
    return entry[file.name] = path.resolve(process.cwd(), `${file.assets}${file.name}${file.ext}`);
});


module.exports = {
    entry: entry,
    mode: "development",
    output: {
        filename: './assets/js/[name].js',
        path: path.resolve(__dirname, 'src')
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: './assets/style/main.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                loader: 'svgo-loader',
                options: {
                    multipass: true,
                    js2svg: {
                        indent: 2,
                        pretty: true,
                    }
                }
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        hot: true,
        port: 3000,
    },
};
