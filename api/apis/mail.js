const R = require('ramda');
const nodemailer = require('nodemailer');
const { PASS_EMAIL } = process.env;
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'Alternativa_2287@hotmail.com', // generated ethereal user
    pass: PASS_EMAIL, // generated ethereal password
  },
});
// TODO: Add url when api is will deployed
const createMailMetadata = data => {
  const { email: to, url } = data;
  return {
    to,
    from: 'Alternativa_2287@hotmail.com',
    subject: 'Reset password phone book',
    text: `Testing sending email: ${url}`,
  };
};

function sendMail(userData) {
  const mailData = R.o(
    createMailMetadata,
    R.pick(['name', 'email', 'url']),
  )(userData);
  return transporter.sendMail(mailData);
}

module.exports = { sendMail };
