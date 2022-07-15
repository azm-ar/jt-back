const router = require('express').Router();

const ftpRoutes = require('./ftpRoutes');
const emailRoutes = require('./emailRoutes');
const databaseRoutes = require('./databaseRoutes');
const cmsRoutes = require('./cmsRoutes');
const otherDetailRoutes = require('./otherDetailRoutes');

const {
  getAllClients,
  getAllClientsSearch,
  getSingleClient,
  postNewClient,
  putUpdateClient,
  deleteClient,
} = require('../controllers/clientController');
const {
  validateClientAndAddressObject,
} = require('../middleware/modelValidation');

router.use('/ftp-details', ftpRoutes);

router.use('/email-details', emailRoutes);

router.use('/database-details', databaseRoutes);

router.use('/cms-details', cmsRoutes);

router.use('/other-details', otherDetailRoutes);

router.get('/', getAllClients);

router.get('/search', getAllClientsSearch);

router.get('/:id', getSingleClient);

router.post('/', validateClientAndAddressObject, postNewClient);

router.put('/:id', validateClientAndAddressObject, putUpdateClient);

router.delete('/:id', deleteClient);

module.exports = router;
