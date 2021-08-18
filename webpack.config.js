const path = require('path');

module.exports = {
    entry: './src/pages/index.js',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
    }
};