/* eslint-disable import/no-dynamic-require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const rootPath = path.join(process.cwd());

const app = express();

// Security
app.use(helmet({ noSniff: false }));
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
