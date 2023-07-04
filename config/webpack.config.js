const path = require('path');

//webpack plugins
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, '../', 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../', 'src/'),
            watch: true,
        },
        compress: true,
        port: 3000,
        liveReload: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/name-[hash:4][ext][query]'
                }
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', "sass-loader"]
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
        // new MiniCssExtractPlugin({
        //     filename: 'css/style-[contenthash:6].css'
        // }),
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                filename: "index.html",
                template: "src/template.html",
                title: "moja formatka",
                inject: "body",
            }
        )
    ],
}