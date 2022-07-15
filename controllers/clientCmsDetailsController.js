const { validateUUID } = require('../lib/validation');
const CmsDetail = require('../models/CmsDetail');
const { encrypt } = require('../lib/crypt');

const postNewClientCmsDetails = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(202).json({ success: false, error: 'No client found' });
  }

  const password = encrypt(body.password);

  // create new details
  const newCms = await CmsDetail.create({ ...body, clientId, password });

  if (!newCms) {
    return res
      .status(400)
      .json({ error: 'Unable to create cms details, please try again' });
  }

  res.status(200).json({ success: true, data: newCms });
};

const putUpdateClientCmsDetails = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No cms details found' });
  }

  // find current details
  const cmsDetail = await CmsDetail.findOne({ where: { id } });

  // check if exists
  if (!cmsDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No cms details found' });
  }

  // update details
  cmsDetail.url = body.url;
  cmsDetail.email = body.email;
  cmsDetail.login = body.login;
  cmsDetail.password = encrypt(body.password);
  await cmsDetail.save();

  res.status(200).json({ success: true, data: cmsDetail });
};

const deleteClientCmsDetails = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res
      .status(404)
      .json({ success: false, error: 'No cms details found' });
  }

  const cmsDetail = await CmsDetail.findOne({ where: { id } });

  // check if exists
  if (!cmsDetail) {
    return res
      .status(404)
      .json({ success: false, error: 'No cms details found' });
  }

  // delete detail
  await cmsDetail.destroy();

  res.status(200).json({ success: true, data: cmsDetail });
};

module.exports = {
  postNewClientCmsDetails,
  putUpdateClientCmsDetails,
  deleteClientCmsDetails,
};
