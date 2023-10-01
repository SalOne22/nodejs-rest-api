const nodemailer = require('nodemailer');

const { META_UA_EMAIL_FROM, META_UA_EMAIL_PASSWORD } = process.env;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_UA_EMAIL_FROM,
    pass: META_UA_EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = (data) => {
  const email = { ...data, from: META_UA_EMAIL_FROM };
  return transport.sendMail(email);
};

module.exports = sendEmail;
