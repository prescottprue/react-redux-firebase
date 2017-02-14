'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')
const env = process.env.NODE_ENV

const config = {
  module: {
    loaders: [
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
    redux: {
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux',
      root: 'Redux'
    },
    'react-redux': {
      commonjs: 'react-redux',
      amd: 'react-redux',
      root: 'ReactRedux'
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false
      }
    })
  )
}

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new webpack.BannerPlugin(
    `${pkg.name}${env === 'production' ? '.min' : ''}.js v${pkg.version}`,
    { raw: false, entryOnly: true }
  )
)
module.exports = config
