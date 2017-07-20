'use strict'

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '../src/index.tsx'),
  ],

  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '../public'),
    hot: true
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [

      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, use: ['react-hot-loader/webpack', 'awesome-typescript-loader'], exclude: /node_modules/ },
      { 
        test: /\.scss$/,
        use: [
            'style-loader',
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}],
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules/ }
    ]
  }
};
