const { model } = require('mongoose');

const { contactSchema } = require('../schemas/contact');

module.exports = model('contact', contactSchema);
