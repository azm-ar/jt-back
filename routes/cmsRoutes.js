const {
  postNewClientCmsDetails,
  putUpdateClientCmsDetails,
  deleteClientCmsDetails,
} = require('../controllers/clientCmsDetailsController');
const { validateCmsDetailObject } = require('../middleware/modelValidation');

const router = require('express').Router();

router.post('/:clientId', validateCmsDetailObject, postNewClientCmsDetails);

router.put('/:id', validateCmsDetailObject, putUpdateClientCmsDetails);

router.delete('/:id', deleteClientCmsDetails);

module.exports = router;
