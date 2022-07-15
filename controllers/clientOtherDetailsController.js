const { validateUUID } = require('../lib/validation');
const OtherClientDetail = require('../models/OtherClientDetail');
const { encrypt } = require('../lib/crypt');

const postNewClientOtherDetails = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(202).json({ success: false, error: 'No client found' });
  }

  const password = encrypt(body.password);

  // create new details
  const newOtherDetail = await OtherClientDetail.create({
    ...body,
    clientId,
    password,
  });

  if (!newOtherDetail) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create account details, please try again',
    });
  }

  res.status(200).json({ success: true, data: newOtherDetail });
};

const putUpdateClientOtherDetails = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No account details found' });
  }

  // find current details
  const otherDetail = await OtherClientDetail.findOne({ where: { id } });

  // check if exists
  if (!otherDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No account details found' });
  }

  // update details
  otherDetail.name = body.name;
  otherDetail.username = body.username;
  otherDetail.email = body.email;
  otherDetail.password = encrypt(body.password);
  otherDetail.notes = body.notes;
  await otherDetail.save();

  res.status(200).json({ success: true, data: otherDetail });
};

const deleteClientOtherDetails = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No account details found' });
  }

  const otherDetail = await OtherClientDetail.findOne({ where: { id } });

  // check if exists
  if (!otherDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No account details found' });
  }

  // delete detail
  await otherDetail.destroy();

  res.status(200).json({ success: true });
};

module.exports = {
  postNewClientOtherDetails,
  putUpdateClientOtherDetails,
  deleteClientOtherDetails,
};
