const { validateUUID } = require('../lib/validation');
const Client = require('../models/Client');
const ClientJob = require('../models/ClientJob');

const getAllClientJobs = async (req, res) => {
  // find all jobs
  const jobs = await ClientJob.findAll({
    raw: true,
    order: [['createdAt', 'DESC']],
  });

  // find all client names & ids
  const allJobs = [];
  const allClients = [];

  for (let i = 0; i < jobs.length; i++) {
    const client = await Client.findOne({
      where: { id: jobs[i].clientId },
      attributes: ['name', 'id'],
      raw: true,
    });

    const job = { ...jobs[i], client };

    allJobs.push(job);
    allClients.push(client);
  }

  // get unique clients
  let clients = [];
  let clientss = [];

  allClients.forEach((item) => {
    if (!clients.includes(item.id)) {
      clients.push(item.id);
      clientss.push(item);
    }
  });

  // sort clients
  const c = clientss.sort((a, b) => ('' + a['name']).localeCompare(b['name']));

  res.status(200).json({ success: true, data: { allJobs, allClients: c } });
};

const getSingleClientJob = async (req, res) => {
  const { id } = req.params;

  // find all jobs
  const job = await ClientJob.findOne({
    where: { id },
    raw: true,
    order: [['createdAt', 'ASC']],
  });

  // check job exists
  if (!job) {
    return res.status(404).json({ success: false, error: 'No job found' });
  }

  res.status(200).json({ success: true, data: job });
};

const postNewClientJob = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(clientId)) {
    return res.status(404).json({ success: false, error: 'No client found' });
  }

  const newJob = await ClientJob.create({
    ...body,
    cost: parseFloat(body.cost),
    clientId,
  });

  // check if job created successfully
  if (!newJob) {
    return res.status(400).json({
      success: false,
      error: 'Unable to create client job, please try again',
    });
  }

  res.status(200).json({ success: true });
};

const putUpdateClientJob = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // validate id
  if (!validateUUID(id)) {
    return res.status(404).json({ success: false, error: 'No job found' });
  }

  // find job
  const job = await ClientJob.findOne({ where: { id } });

  // check exists
  if (!job) {
    return res.status(404).json({ success: false, error: 'No job found' });
  }

  // update details
  job.title = body.title;
  job.status = body.status;
  job.cost = parseFloat(body.cost);
  job.includingVat = body.includingVat;
  job.department = body.department;
  job.type = body.type;
  job.completedDate = body.completedDate;
  job.createdDate = body.createdDate;
  await job.save();

  res.status(200).json({ success: true, data: job });
};

module.exports = {
  getAllClientJobs,
  getSingleClientJob,
  postNewClientJob,
  putUpdateClientJob,
};
