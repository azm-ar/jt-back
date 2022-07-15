const {
  postNewClientFtpDetails,
  putUpdateClientFtpDetails,
  deleteClientFtpDetails,
} = require('../controllers/clientFtpDetailsController');
const { validateFtpDetailObject } = require('../middleware/modelValidation');

const router = require('express').Router();

router.post('/:clientId', validateFtpDetailObject, postNewClientFtpDetails);

router.put('/:id', validateFtpDetailObject, putUpdateClientFtpDetails);

router.delete('/:id', deleteClientFtpDetails);

module.exports = router;
