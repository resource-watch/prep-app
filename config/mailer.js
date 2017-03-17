const SparkPost = require('sparkpost');
const mailClient = new SparkPost(process.env.SPARKPOST_API_KEY);

module.exports = function(mailSettings) {

  mailClient.transmissions.send({
    content: {
      from: process.env.MAIL_FROM,
      subject: mailSettings.subject,
      html: mailSettings.body
    },
    recipients: [
      { address: process.env.MAIL_RECIPIENTS }
    ]
  })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });

};
