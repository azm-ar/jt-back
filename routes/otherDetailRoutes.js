const {
  postNewClientOtherDetails,
  putUpdateClientOtherDetails,
  deleteClientOtherDetails,
} = require('../controllers/clientOtherDetailsController');
const {
  validateOtherAccountDetailObject,
} = require('../middleware/modelValidation');

const router = require('express').Router();

router.post(
  '/:clientId',
  validateOtherAccountDetailObject,
  postNewClientOtherDetails
);

router.put(
  '/:id',
  validateOtherAccountDetailObject,
  putUpdateClientOtherDetails
);

router.delete('/:id', deleteClientOtherDetails);

module.exports = router;
