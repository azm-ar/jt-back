const {
  postNewClientDatabaseDetails,
  putUpdateClientDatabaseDetails,
  deleteClientDatabaseDetails,
} = require('../controllers/clientDatabaseDetailsController');
const {
  validateDatabaseDetailObject,
} = require('../middleware/modelValidation');

const router = require('express').Router();

router.post(
  '/:clientId',
  validateDatabaseDetailObject,
  postNewClientDatabaseDetails
);

router.put(
  '/:id',
  validateDatabaseDetailObject,
  putUpdateClientDatabaseDetails
);

router.delete('/:id', deleteClientDatabaseDetails);

module.exports = router;
