
const express           =   require('express');
const router            =   express.Router();
const {RequestController}  =   require('../controller/requestController');

router.post('/request/new',RequestController.new_request);



module.exports = router;