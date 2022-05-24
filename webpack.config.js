var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        headers: {
            "X-Frame-Options" : "DENY",
            "Cache-Control" : "Cache-Control: no-cache, no-store, must-revalidate",
            "X-XSS-Protection" : "0",
            "X-Content-Type-Options" : "nosniff"
        }

    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://bank.sytes.net:3011',
            mainUrl: 'http://bank.sytes.net:3001'
        })
    }
}