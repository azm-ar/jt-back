const { validateUUID } = require('../lib/validation');
const FtpDetail = require('../models/FtpDetail');
const { encrypt } = require('../lib/crypt');

const postNewClientFtpDetails = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(404).json({ success: false, error: 'No client found' });
  }

  const password = encrypt(body.password);

  // create new details
  const newFtp = await FtpDetail.create({
    ...body,
    clientId,
    password,
  });

  if (!newFtp) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create ftp details, please try again',
    });
  }

  res.status(200).json({ success: true, data: newFtp });
};

const putUpdateClientFtpDetails = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No ftp details found' });
  }

  // find current details
  const ftpDetail = await FtpDetail.findOne({ where: { id } });

  // check if exists
  if (!ftpDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No ftp details found' });
  }

  // update details
  ftpDetail.url = body.url;
  ftpDetail.ftpAddress = body.ftpAddress;
  ftpDetail.hostDirectory = body.hostDirectory;
  ftpDetail.login = body.login;
  ftpDetail.password = encrypt(body.password);
  await ftpDetail.save();

  res.status(200).json({ success: true, data: ftpDetail });
};

const deleteClientFtpDetails = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No ftp details found' });
  }

  const ftpDetail = await FtpDetail.findOne({ where: { id } });

  // check if exists
  if (!ftpDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No ftp details found' });
  }

  // delete detail
  await ftpDetail.destroy();

  res.status(200).json({ success: true, data: ftpDetail });
};

module.exports = {
  postNewClientFtpDetails,
  putUpdateClientFtpDetails,
  deleteClientFtpDetails,
};
