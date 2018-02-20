/* eslint-disable import/no-dynamic-require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const rootPath = path.join(process.cwd());

const app = express();

// Security
app.use(helmet({ noSniff: false }));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"],
    connectSrc: [
      "'self'",
      'https://production-api.globalforestwatch.org',
      'https://api.resourcewatch.org',
      'https://staging.prepdata.org',
      'https://preproduction.prepdata.org',
      'https://prepdata.org'
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
      'https://unpkg.com',
      'https://cdnjs.cloudflare.com'
    ],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://maps.googleapis.com',
      'https://www.google-analytics.com',
      'https://unpkg.com'
    ],
    fontSrc: [
      "'self'",
      'data:',
      'https://cdnjs.cloudflare.com',
      'https://fonts.gstatic.com'
    ],
    imgSrc: [
      "'self'",
      'data:',
      'https://s3.amazonaws.com',
      'https://csi.gstatic.com',
      'https://*'
    ],
    formAction: ["'self'", 'https://*'],
    objectSrc: ["'none'"],
    frameSrc: ["'self'", 'https://*'],
    frameAncestors: ["'self'", 'http://*', 'https://*']
  }
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));

// Proxy for iframes
require('./routes/iframeProxy')(app);
// Url shorter
require('./routes/shortUrl')(app);
// Twitter feed
require('./routes/twitterFeed')(app);
// Contact mail
require('./routes/contact')(app);

// Load environment config
require(path.join(__dirname, 'environments', process.env.NODE_ENV || 'development'))(app);

module.exports = app;
