require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: { app: [path.join(rootPath, 'app/scripts/index.jsx')] },

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      exclude: /(node_modules|lib)/,
      loader: require.resolve('babel-loader')
    }, {
      test: /\.(hbs|handlebars)$/,
      loader: require.resolve('handlebars-loader')
    }, {
      test: /\.html$/,
      loader: require.resolve('raw-loader')
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      styles: path.resolve('app/styles'),
      constants: path.resolve('app/scripts/constants'),
      pages: path.resolve('app/scripts/pages'),
      components: path.resolve('app/scripts/components'),
      containers: path.resolve('app/scripts/containers'),
      modules: path.resolve('app/scripts/modules'),
      helpers: path.resolve('app/scripts/helpers'),
      lib: path.resolve('app/scripts/lib'),
      actions: path.resolve('app/scripts/actions'),
      selectors: path.resolve('app/scripts/selectors'),
      services: path.resolve('app/scripts/services'),
      layout: path.resolve('app/scripts/layout')
    }
  },

  resolveLoader: {
    modules: [
      path.join(rootPath, 'node_modules')
    ]
  },

  externals: { leaflet: 'L' },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.hbs',
      inject: 'body',
      filename: 'index.html',
      prod: process.env.NODE_ENV === 'production',
      googleAnalytics: process.env.GOOGLE_ANALYTICS || 'UA-XXXXXXXX-YY'
    }),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      config: {
        facebookUser: JSON.stringify(process.env.FACEBOOK_USER),
        twitterUser: JSON.stringify(process.env.TWITTER_USER),
        apiUrl: JSON.stringify(process.env.API_URL),
        apiUrlRW: JSON.stringify(process.env.RW_API_URL),
        basemapTileUrl: JSON.stringify(process.env.BASEMAP_TILE_URL),
        datasetEnv: JSON.stringify(process.env.DATASET_ENV),
        assetsUrl: JSON.stringify(process.env.ASSETS_URL || '')
      }
    })
  ]

};

module.exports = config;
