const Bitly = require('bitly');
const bitly = new Bitly(process.env.SHORT_URL_API_TOKEN);

module.exports = function(app) {

  // Url shorter
  app.get('/short', (req, res) => {
    bitly.shorten(req.query.url)
      .then((response) => {
        res.send(response);
      }, (error) => {
        throw error;
      });
  });

};
