const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig, {

  output: { filename: '[name]-[hash].js' },

  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '75-90',
              speed: 4
            }
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, '../../postcss.config.js')
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, '../../app/styles')
            ]
          }
        }]
      })
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('styles.css'),
    new UglifyJSPlugin(),
    process.env.BUNDLE_ANALIZE ? new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }) : function() {}
  ],

  externals: {
    leaflet: 'L',
    'esri-leaflet': 'L.esri'
  }

});
