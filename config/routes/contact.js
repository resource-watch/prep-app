const formidable = require('formidable');
const mailer = require('../mailer');

module.exports = (app) => {
  app.post('/contact', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      if (!err) {
        const mailTemplate = `<body>
          <h2>${fields.MMERGE3}</h2>
          <p><strong>Contact name</strong>: ${fields.FNAME} ${fields.LNAME}</p>
          <p><strong>Email</strong>: ${fields.EMAIL}</p>
          <p><strong>Organization</strong>: ${fields.MMERGE5}</p>
          <p><strong>Message</strong>:<br> ${fields.MMERGE4}</p>
        </body>`;

        mailer({
          from: fields.EMAIL,
          subject: fields.MMERGE3,
          body: mailTemplate
        });

        res.json({ success: 'Mail sent correctly.' });
      }
    });
  });
};
