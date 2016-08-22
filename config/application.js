const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Bitly = require('bitly');
const Twitter = require('twitter');

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

const bitly = new Bitly(process.env.SHORT_URL_API_TOKEN);

// Url shorter
app.get('/short', (req, res) => {
  bitly.shorten(req.query.url)
    .then((response) => {
      res.send(response);
    }, (error) => {
      throw error;
    });
});

// Twitter feed

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/api/twitter', (req, res) => {
  const urlPath = 'statuses/user_timeline';
  const params = { screen_name: process.env.TWITTER_USER, count: 10 };
  twitterClient.get(urlPath, params, (err, timeline) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(timeline);
    }
  });
});

// Load environment config
require(path.join(__dirname, 'environments', process.env.NODE_ENV || 'development'))(app);

module.exports = app;
