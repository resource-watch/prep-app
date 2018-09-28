const path = require('path');
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');

const rootPath = path.resolve(process.cwd());

module.exports = merge(sharedConfig, {
  devtool: 'eval',
  mode: 'development',
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif|svg)$/i, use: [ 'file-loader' ] },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
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
});
