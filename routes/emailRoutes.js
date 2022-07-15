const {
  postNewClientEmailDetails,
  putUpdateClientEmailDetails,
  deleteClientEmailDetails,
} = require('../controllers/clientEmailDetailsController');
const { validateEmailDetailObject } = require('../middleware/modelValidation');

const router = require('express').Router();

router.post('/:clientId', validateEmailDetailObject, postNewClientEmailDetails);

router.put('/:id', validateEmailDetailObject, putUpdateClientEmailDetails);

router.delete('/:id', deleteClientEmailDetails);

module.exports = router;
