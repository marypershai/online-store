/* eslint-disable no-undef */

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/img/[name][ext][query]',
                  },

            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                type: "asset/resource",
                generator: {
                    filename: 'assets/css/[name].css[query]',
                },
                use: [{
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            sourceMap: true,
                            sourceMapEmbed: true,
                            outputStyle: 'expanded',
                        },
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  
        clean: true,
        filename: 'index.[contenthash].js',
        assetModuleFilename: pathData => {
            const filepath = path
              .dirname(pathData.filename)
              .split('/')
              .slice(1)
              .join('/');
              return `assets/${filepath}/[name][ext]`;
          },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
