const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': path.resolve(__dirname, 'src/app')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      query: {
        presets: [
          [
            "es2015",
              // {
              //   "modules": false
              // }
          ],
          'react'
        ],
        plugins: []
      },
      include: [
        path.resolve(__dirname, 'src')
      ]
    }]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    // }),
  ],
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  devtool: false
};
