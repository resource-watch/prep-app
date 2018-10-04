require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const rootPath = process.cwd();

const config = {
  entry: { app: path.join(rootPath, 'app/scripts/index.jsx') },
  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules|lib)/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.(hbs|handlebars)$/,
        loader: require.resolve('handlebars-loader'),
        options: { config: { handlebarsLoader: {} } },
      },
      { test: /\.html$/, loader: require.resolve('raw-loader') },
    ],
  },
  resolve: { extensions: [ '.js', '.jsx', '.scss' ] },
  externals: { leaflet: 'L' },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.hbs',
      inject: 'body',
      filename: 'index.html',
      prod: process.env.NODE_ENV === 'production',
      googleAnalytics: process.env.GOOGLE_ANALYTICS || 'UA-XXXXXXXX-YY',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.RW_API_URL': JSON.stringify(process.env.RW_API_URL),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.CALLBACK_URL': JSON.stringify(process.env.CALLBACK_URL),
      'process.env.RW_API_LOGIN_URL': JSON.stringify(process.env.RW_API_LOGIN_URL),
      'process.env.RW_API_IS_LOGGEDIN_URL': JSON.stringify(process.env.RW_API_IS_LOGGEDIN_URL),
      'process.env.APPLICATIONS': JSON.stringify(process.env.APPLICATIONS),
      'process.env.DATASET_ENV': JSON.stringify(process.env.DATASET_ENV),
      'process.env.CONTROL_TOWER_URL': JSON.stringify(process.env.CONTROL_TOWER_URL),
      'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS),
      config: {
        facebookUser: JSON.stringify(process.env.FACEBOOK_USER),
        twitterUser: JSON.stringify(process.env.TWITTER_USER),
        apiUrl: JSON.stringify(process.env.API_URL),
        apiUrlRW: JSON.stringify(process.env.RW_API_URL),
        basemapTileUrl: JSON.stringify(process.env.BASEMAP_TILE_URL),
        datasetEnv: JSON.stringify(process.env.DATASET_ENV),
        assetsUrl: JSON.stringify(process.env.ASSETS_URL || ''),
      },
    }),
    new DashboardPlugin(),
  ],
};

module.exports = config;
