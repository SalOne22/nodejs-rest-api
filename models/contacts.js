const { model } = require('mongoose');

const { contactSchema } = require('../schemas/contact-schema');

module.exports = model('contact', contactSchema);
