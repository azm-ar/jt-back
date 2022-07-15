const {
  getAllClientJobs,
  postNewClientJob,
  putUpdateClientJob,
  getSingleClientJob,
} = require('../controllers/clientJobController');

const router = require('express').Router();

router.get('/', getAllClientJobs);

router.get('/:id', getSingleClientJob);

router.post('/:clientId', postNewClientJob);

router.put('/:id', putUpdateClientJob);

module.exports = router;
