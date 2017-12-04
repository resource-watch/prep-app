require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: {
    app: ['babel-polyfill', path.join(rootPath, 'app/scripts/index.jsx')]
  },

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|lib)/,
      use: ['babel-loader']
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.join(rootPath, 'app'),
      path.resolve('app/scripts'),
      path.resolve('app/styles'),
      path.join(rootPath, 'node_modules')
    ],
    alias: {
      styles: path.resolve('app/styles')
    }
  },

  resolveLoader: {
    modules: [
      path.join(rootPath, 'node_modules')
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html',
      googleAnalytics: process.env.NODE_ENV === 'production' ?
        process.env.GOOGLE_ANALYTICS : 'UA-XXXXXXXX-YY'
    }),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new webpack.DefinePlugin({
      config: {
        facebookUser: JSON.stringify(process.env.FACEBOOK_USER),
        twitterUser: JSON.stringify(process.env.TWITTER_USER),
        apiUrl: JSON.stringify(process.env.API_URL),
        apiUrlRW: JSON.stringify(process.env.RW_API_URL),
        basemapTileUrl: JSON.stringify(process.env.BASEMAP_TILE_URL),
        datasetEnv: JSON.stringify(process.env.DATASET_ENV),
        assetsUrl: JSON.stringify(process.env.ASSETS_URL)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/widget-editor/dist/images',
        to: 'images/'
      }
    ])
  ]

};

module.exports = config;
