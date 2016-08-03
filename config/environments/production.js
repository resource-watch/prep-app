const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const indexPath = path.join(process.cwd(), 'dist/index.html');

module.exports = (app) => {
  app.use(favicon(`${process.cwd()}/public/favicon.ico`));
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
};
