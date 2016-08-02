require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = process.cwd();

const webpackConfig = {

  entry: [
    path.join(rootPath, 'app/src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      config: {
        apiUrl: JSON.stringify(process.env.API_URL),
        apiUrlRW: JSON.stringify(process.env.RW_API_URL)
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  // Loaders
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css', 'sass'])
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    ]
  });
  // Plugins
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
  webpackConfig.plugins.push(new ExtractTextPlugin('styles-[hash].css'));
} else {
  // Activating source map
  webpackConfig.devtool = 'source-map';
  // Loaders
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: ['file?name=[path][name].[ext]']
  });
}

module.exports = webpackConfig;
