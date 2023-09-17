const register = require('./registerUser');
const login = require('./loginUser');
const logout = require('./logoutUser');
const current = require('./currentUser');

const { controllerWrapper } = require('../../decorators');

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
};
