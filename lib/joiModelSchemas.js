const Joi = require('joi');

const JoiClientObject = Joi.object({
  name: Joi.string().required(),
  primaryContactName: Joi.string().required(),
  primaryContactNumber: Joi.string().required(),
  primaryContactEmail: Joi.string().required(),
  secondaryContactNumber: Joi.string().optional(),
  secondaryContactEmail: Joi.string().optional(),
  generalNotes: Joi.string().optional(),
}).required();

const JoiAddressObject = Joi.object({
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().optional(),
  town: Joi.string().required(),
  county: Joi.string().optional(),
  postCode: Joi.string().required(),
  country: Joi.string().required(),
}).required();

const JoiFtpDetailObject = Joi.object({
  url: Joi.string().required(),
  ftpAddress: Joi.string().required(),
  hostDirectory: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const JoiDatabaseDetailObject = Joi.object({
  url: Joi.string().required(),
  databaseName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const JoiCmsDetailObject = Joi.object({
  url: Joi.string().required(),
  email: Joi.string().required(),
  username: Joi.string().optional(),
  password: Joi.string().required(),
}).required();

const JoiEmailDetailObject = Joi.object({
  domain: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const JoiOtherAccountDetailObject = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
  notes: Joi.string().optional(),
}).required();

module.exports = {
  JoiClientObject,
  JoiAddressObject,
  JoiFtpDetailObject,
  JoiDatabaseDetailObject,
  JoiCmsDetailObject,
  JoiEmailDetailObject,
  JoiOtherAccountDetailObject,
};
