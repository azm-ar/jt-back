const { validateUUID } = require('../lib/validation');
const EmailDetail = require('../models/EmailDetail');
const { encrypt } = require('../lib/crypt');

const postNewClientEmailDetails = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(202).json({ success: false, error: 'No client found' });
  }

  const password = encrypt(body.password);

  // create new details
  const newEmail = await EmailDetail.create({ ...body, clientId, password });

  if (!newEmail) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create email details, please try again',
    });
  }

  res.status(200).json({ success: true, data: newEmail });
};

const putUpdateClientEmailDetails = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No email details found' });
  }

  // find current details
  const emailDetail = await EmailDetail.findOne({ where: { id } });

  // check if exists
  if (!emailDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No email details found' });
  }

  // update details
  emailDetail.domain = body.domain;
  emailDetail.email = body.email;
  emailDetail.password = encrypt(body.password);
  await emailDetail.save();

  res.status(200).json({ success: true, data: emailDetail });
};

const deleteClientEmailDetails = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No email details found' });
  }

  const emailDetail = await EmailDetail.findOne({ where: { id } });

  // check if exists
  if (!emailDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No email details found' });
  }

  // delete detail
  await emailDetail.destroy();

  res.status(200).json({ success: true, data: emailDetail });
};

module.exports = {
  postNewClientEmailDetails,
  putUpdateClientEmailDetails,
  deleteClientEmailDetails,
};
