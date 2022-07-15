const { validateUUID } = require('../lib/validation');
const DatabaseDetail = require('../models/DatabaseDetail');
const { encrypt } = require('../lib/crypt');

const postNewClientDatabaseDetails = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(202).json({ success: false, error: 'No client found' });
  }

  const password = encrypt(body.password);

  // create new details
  const newDatabaseDetail = await DatabaseDetail.create({
    ...body,
    clientId,
    password,
  });

  if (!newDatabaseDetail) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create database details, please try again',
    });
  }

  res.status(200).json({ success: true, data: newDatabaseDetail });
};

const putUpdateClientDatabaseDetails = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No database details found' });
  }

  // find current details
  const databaseDetail = await DatabaseDetail.findOne({ where: { id } });

  // check if exists
  if (!databaseDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No database details found' });
  }

  // update details
  databaseDetail.url = body.url;
  databaseDetail.databaseName = body.databaseName;
  databaseDetail.username = body.username;
  databaseDetail.password = encrypt(body.password);
  await databaseDetail.save();

  res.status(200).json({ success: true, data: databaseDetail });
};

const deleteClientDatabaseDetails = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No database details found' });
  }

  const databaseDetail = await DatabaseDetail.findOne({ where: { id } });

  // check if exists
  if (!databaseDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No database details found' });
  }

  // delete detail
  await databaseDetail.destroy();

  res.status(200).json({ success: true, data: databaseDetail });
};

module.exports = {
  postNewClientDatabaseDetails,
  putUpdateClientDatabaseDetails,
  deleteClientDatabaseDetails,
};
