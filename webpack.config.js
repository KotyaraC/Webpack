const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getPostcssOptions } = require('postcss-loader/dist/utils');
let mode = 'development';

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, './build'),
        filename: '[name]-[fullhash].js',
        clean: true
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'

                                    ]
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        port: 4000,
        static: {
            directory: join(__dirname, 'src')
        },
    }
}