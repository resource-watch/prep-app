const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig, {

  output: { filename: '[name].[chunkhash].js' },

  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: { progressive: true },
            gifsicle: { interlaced: false },
            optipng: { optimizationLevel: 7 },
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
      })
    }]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     evaluate: true,
    //     if_return: true,
    //     join_vars: true
    //   },
    //   output: { comments: false }
    // }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    process.env.BUNDLE_ANALIZE ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : () => {}
  ],

  externals: {
    leaflet: 'L',
    'esri-leaflet': 'L.esri'
  }

});
