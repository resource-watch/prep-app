require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: {
    app: path.join(rootPath, 'app/scripts/index.jsx')
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
        use: ['css-loader', 'sass-loader', 'postcss-loader']
      })
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(rootPath, 'app'),
      path.resolve('app/scripts'),
      path.join(rootPath, 'node_modules')
    ]
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
    new ExtractTextPlugin('styles.css'),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new webpack.DefinePlugin({
      config: {
        facebookUser: JSON.stringify(process.env.FACEBOOK_USER),
        twitterUser: JSON.stringify(process.env.TWITTER_USER),
        apiUrl: JSON.stringify(process.env.API_URL),
        apiUrlRW: JSON.stringify(process.env.RW_API_URL),
        tokenUrlShorter: JSON.stringify(process.env.SHORT_URL_API_TOKEN),
        basemapTileUrl: JSON.stringify(process.env.BASEMAP_TILE_URL),
        datasetEnv: JSON.stringify(process.env.DATASET_ENV)
      }
    })
  ]

};

module.exports = config;
