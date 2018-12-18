'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = (env, argv) => {
  const { mode } = argv

  const plugins = [
    new LodashModuleReplacementPlugin(),
    new webpack.BannerPlugin({
      banner: `${pkg.name}${mode === 'production' ? '.min' : ''}.js v${
        pkg.version
      }`,
      raw: false,
      entryOnly: true
    })
  ]

  if (mode === 'production') {
    if (env && env.size) {
      plugins.push(new BundleAnalyzerPlugin())
    }
  }

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        }
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
      'react-is': {
        commonjs: 'react-is',
        commonjs2: 'react-is',
        amd: 'react-is',
        root: 'ReactIs'
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
    plugins
  }
}
