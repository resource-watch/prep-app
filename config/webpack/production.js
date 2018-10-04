// const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const sharedConfig = require('./shared.js');

const rootPath = path.resolve(process.cwd());

module.exports = merge(sharedConfig, {
  mode: 'production',
  output: { filename: '[name].[chunkhash].js' },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: false },
              optipng: { optimizationLevel: 7 },
              pngquant: { quality: '75-90', speed: 4 },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ { loader: MiniCssExtractPlugin.loader }, 'css-loader' ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [ path.resolve(rootPath, './app/styles') ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: { compress: { inline: false } },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: true,
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].[id].css',
    }),
    new ManifestPlugin(),
  ],
  externals: { leaflet: 'L', 'esri-leaflet': 'L.esri' },
});
