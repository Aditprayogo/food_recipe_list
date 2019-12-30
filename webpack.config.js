{
    const webpack = require('webpack');
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const config = {
        entry: './src/js/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                    },
                    exclude: /node_modules/
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'My App',
                filename: 'index.html',
                template: './src/index.html'
            })
        ]
    };

    module.exports = config;
}