const { model } = require('mongoose');

const { contactSchema } = require('../schemas');

module.exports = model('contact', contactSchema);
