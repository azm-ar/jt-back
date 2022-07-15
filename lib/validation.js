const { validate } = require('uuid');

const validateUUID = (id) => {
  return validate(id);
};

module.exports = {
  validateUUID,
};
