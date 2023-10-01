const nodemailer = require('nodemailer');

const { NODEMAILER_EMAIL_FROM, NODEMAILER_EMAIL_PASSWORD } = process.env;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL_FROM,
    pass: NODEMAILER_EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = (data) => {
  const email = { ...data, from: NODEMAILER_EMAIL_FROM };
  return transport.sendMail(email);
};

module.exports = sendEmail;
