const path = require('path');

//webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PostcssPresetEnv = require('postcss-preset-env')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name]-[contenthash:4].js',
        path: path.resolve(__dirname, '../', 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[hash:4][ext][query]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style-[contenthash:4].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/template.html",
            title: "nowa aplikacja",
        }),
        // "postcss-preset-env",
        // new PostcssPresetEnv(),
    ],
}