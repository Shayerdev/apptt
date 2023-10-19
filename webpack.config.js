const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
    mode: "production",
    output: {
        filename: './assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Указываем исходный HTML-файл
            //filename: 'index.html',      // Указываем имя итогового HTML-файла
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/style/main.[contenthash].css',
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
                type: "asset",
                loader: 'svgo-loader',
                options: {
                    multipass: true,
                    js2svg: {
                        indent: 2,
                        pretty: true,
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
    },
};
