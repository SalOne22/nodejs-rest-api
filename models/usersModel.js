const { model } = require('mongoose');

const { userSchema } = require('../schemas/user');

module.exports = model('user', userSchema);
