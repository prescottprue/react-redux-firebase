const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: './dist',
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
              {
                "modules": false
              }
          ],
          'react'
        ],
        plugins: []
      },
      include: [
        path.resolve(__dirname, 'src/app')
      ]
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new BabiliPlugin()
  ],
  resolve: {
    modules: [
      path.join(process.cwd(), 'app'),
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  devtool: false
};
