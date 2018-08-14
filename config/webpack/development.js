const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig, {

  devtool: 'inline-source-map',

  stats: { errorDetails: true },

  output: { pathinfo: true },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }]
      }, {
        test: /\.(scss|sass)$/,
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, {
          loader: 'postcss-loader',
          options: { config: { path: path.resolve(__dirname, '../../postcss.config.js') } }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, '../../app/styles')
            ]
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true })
  ]

});
