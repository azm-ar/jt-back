const Client = require('../models/Client');
const Address = require('../models/Address');
const { validateUUID } = require('../lib/validation');
const FtpDetail = require('../models/FtpDetail');
const EmailDetail = require('../models/EmailDetail');
const DatabaseDetail = require('../models/DatabaseDetail');
const CmsDetail = require('../models/CmsDetail');
const OtherClientDetail = require('../models/OtherClientDetail');
const { decrypt } = require('../lib/crypt');
const ClientJob = require('../models/ClientJob');

const getAllClients = async (req, res) => {
  // find all clients
  const clients = await Client.findAll({ order: [['name', 'ASC']], raw: true });

  res.status(200).json({ success: true, data: clients });
};

const getAllClientsSearch = async (req, res) => {
  // find all clients, just name & id
  const clients = await Client.findAll({
    attributes: ['name', 'id'],
    order: [['name', 'ASC']],
    raw: true,
  });

  res.status(200).json({ success: true, data: clients });
};

const getSingleClient = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res.status(404).json({ success: false, error: 'No Client Found' });
  }

  // find client
  const client = await Client.findOne({ raw: true, where: { id } });

  // check if client exists
  if (!client) {
    return res.status(404).json({ success: false, error: 'No Client Found' });
  }

  // find relevant client details and decrypt passwords
  const address = await Address.findOne({
    raw: true,
    where: { id: client.address },
  });

  const ftpDetails = await FtpDetail.findAll({
    raw: true,
    where: { clientId: id },
    order: [['createdAt', 'ASC']],
  });

  const ftps = [];

  for (let i = 0; i < ftpDetails.length; i++) {
    const ftp = ftpDetails[i];

    const p = decrypt(ftp.password);

    const f = {
      ...ftp,
      password: p,
    };

    ftps.push(f);
  }

  const emailDetails = await EmailDetail.findAll({
    raw: true,
    where: {
      clientId: id,
    },
    order: [['createdAt', 'ASC']],
  });

  const emails = [];

  for (let i = 0; i < emailDetails.length; i++) {
    const email = emailDetails[i];

    const p = decrypt(email.password);

    const e = {
      ...email,
      password: p,
    };

    emails.push(e);
  }

  const databaseDetails = await DatabaseDetail.findAll({
    raw: true,
    where: {
      clientId: id,
    },
    order: [['createdAt', 'ASC']],
  });

  const dbs = [];

  for (let i = 0; i < databaseDetails.length; i++) {
    const db = databaseDetails[i];

    const p = decrypt(db.password);

    const d = {
      ...db,
      password: p,
    };

    dbs.push(d);
  }

  const cmsDetails = await CmsDetail.findAll({
    raw: true,
    where: {
      clientId: id,
    },
    order: [['createdAt', 'ASC']],
  });

  const cmss = [];

  for (let i = 0; i < cmsDetails.length; i++) {
    const cms = cmsDetails[i];

    const p = decrypt(cms.password);

    const c = {
      ...cms,
      password: p,
    };

    cmss.push(c);
  }

  const otherDetails = await OtherClientDetail.findAll({
    raw: true,
    where: {
      clientId: id,
    },
    order: [['createdAt', 'ASC']],
  });

  const others = [];

  for (let i = 0; i < otherDetails.length; i++) {
    const other = otherDetails[i];

    const p = decrypt(other.password);

    const o = {
      ...other,
      password: p,
    };

    others.push(o);
  }

  // get jobs
  const jobs = await ClientJob.findAll({
    where: { clientId: id },
    raw: true,
    order: [['createdAt', 'DESC']],
  });

  // client to show to user
  const fullClient = {
    ...client,
    address,
    ftpDetails: ftps,
    emailDetails: emails,
    databaseDetails: dbs,
    cmsDetails: cmss,
    otherDetails: others,
    jobs,
  };

  res.status(200).json({ success: true, data: fullClient });
};

const postNewClient = async (req, res) => {
  const { address, client } = req.body;

  const newAddress = await Address.create(address, { raw: true });

  const newClient = await Client.create({
    ...client,
    address: newAddress.id,
  });

  // check if client created successfully
  if (!newClient) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create client, please try again',
    });
  }

  // client to show to user
  const fullNewClient = { ...newClient.dataValues, address: newAddress };

  res.status(200).json({ success: true, data: fullNewClient });
};

const putUpdateClient = async (req, res) => {
  const { id } = req.params;
  const { address, client } = req.body;

  // validate id
  if (!validateUUID(id)) {
    return res.status(404).json({ success: false, error: 'No Client Found' });
  }

  const foundClient = await Client.findOne({ where: { id } });
  const foundAddress = await Address.findOne({
    where: { id: foundClient.address },
  });

  // check if client or address not found
  if (!foundAddress || !foundClient) {
    return res
      .status(400)
      .json({ error: 'Unable to update client, please try again' });
  }

  // update address
  foundAddress.addressLine1 = address.addressLine1;
  foundAddress.addressLine2 = address.addressLine2;
  foundAddress.town = address.town;
  foundAddress.county = address.county;
  foundAddress.postCode = address.postCode;
  foundAddress.country = address.country;
  await foundAddress.save();

  // then update client
  foundClient.name = client.name;
  foundClient.primaryContactName = client.primaryContactName;
  foundClient.primaryContactNumber = client.primaryContactNumber;
  foundClient.primaryContactEmail = client.primaryContactEmail;
  foundClient.secondaryContactNumber = client.secondaryContactNumber;
  foundClient.secondaryContactEmail = client.secondaryContactEmail;
  foundClient.generalNotes = client.generalNotes;
  await foundClient.save();

  // client to show to user
  const fullClient = { ...foundClient.dataValues, address: foundAddress };

  res.status(200).json({ success: true, data: fullClient });
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  // validate id
  if (!validateUUID(id)) {
    return res.status(404).json({ success: false, error: 'No Client Found' });
  }

  // find client
  const client = await Client.findOne({ where: { id } });

  // then find address
  const address = await Address.findOne({ where: { id: client.address } });

  // check if client or address exists
  if (!client || !address) {
    return res.status(400).json({
      success: false,
      error: 'Unable to delete client, please try again',
    });
  }

  await client.destroy();
  await address.destroy();

  res.status(200).json({ success: true });
};

module.exports = {
  getAllClients,
  getAllClientsSearch,
  getSingleClient,
  postNewClient,
  putUpdateClient,
  deleteClient,
};
