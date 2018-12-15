'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')
const env = process.env.NODE_ENV
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ReactReduxFirebase',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    firebase: {
      commonjs: 'firebase',
      commonjs2: 'firebase',
      amd: 'firebase',
      root: 'Firebase'
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: 'PropTypes'
    }
  },
  plugins: []
}

if (config.mode === 'production') {
  if (process.env.SIZE) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
}

config.plugins.push(
  new webpack.BannerPlugin(
    {
      banner: `${pkg.name}${env === 'production' ? '.min' : ''}.js v${pkg.version}`,
      raw: false,
      entryOnly: true
    }
  )
)

module.exports = config
