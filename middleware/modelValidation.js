const {
  JoiClientObject,
  JoiAddressObject,
  JoiFtpDetailObject,
  JoiDatabaseDetailObject,
  JoiCmsDetailObject,
  JoiEmailDetailObject,
  JoiOtherAccountDetailObject,
} = require('../lib/joiModelSchemas');

const validateClientAndAddressObject = async (req, res, next) => {
  try {
    const validC = await JoiClientObject.validateAsync(req.body.client);
    const validA = await JoiAddressObject.validateAsync(req.body.address);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const validateFtpDetailObject = async (req, res, next) => {
  try {
    const valid = await JoiFtpDetailObject.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const validateDatabaseDetailObject = async (req, res, next) => {
  try {
    const valid = await JoiDatabaseDetailObject.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const validateCmsDetailObject = async (req, res, next) => {
  try {
    const valid = await JoiCmsDetailObject.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const validateEmailDetailObject = async (req, res, next) => {
  try {
    const valid = await JoiEmailDetailObject.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const validateOtherAccountDetailObject = async (req, res, next) => {
  try {
    const valid = await JoiOtherAccountDetailObject.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  validateClientAndAddressObject,
  validateFtpDetailObject,
  validateDatabaseDetailObject,
  validateCmsDetailObject,
  validateEmailDetailObject,
  validateOtherAccountDetailObject,
};
