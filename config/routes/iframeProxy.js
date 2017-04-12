const request = require('request');

module.exports = (app) => {
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
};
