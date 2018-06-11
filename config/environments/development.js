const path = require('path');
const logger = require('morgan');
const PrettyError = require('pretty-error');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('../webpack/development.js');

const indexPath = path.join(process.cwd(), 'dist/index.html');

module.exports = (app) => {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'app',
    stats: { colors: true }
  });

  app.use(middleware);
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(indexPath));
    res.end();
  });

  // Logs
  app.use(logger('dev'));

  // Error handling
  const pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use((err, req, res, next) => {
    console.error(pe.render(err));
    next();
  });
};
