const register = require('./registerUser');
const login = require('./loginUser');
const logout = require('./logoutUser');
const current = require('./currentUser');
const updateSubscription = require('./updateUserSubscription');
const updateAvatar = require('./updateUserAvatar');
const verifyEmail = require('./verifyUserEmail');

const { controllerWrapper } = require('../../decorators');

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
  verifyEmail: controllerWrapper(verifyEmail),
};
