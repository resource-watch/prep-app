const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const rootPath = path.join(process.cwd());

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));

// Proxy for iframes
app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (url) {
    request(req.query.url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body); // Show the HTML for the Google homepage.
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

// Load environment config
require(path.join(__dirname, 'environments', process.env.NODE_ENV || 'development'))(app);

module.exports = app;
