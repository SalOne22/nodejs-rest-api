const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = {
  validateAtUpdate,
};
