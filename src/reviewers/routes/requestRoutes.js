



const express           =   require('express');
const router            =   express.Router();
const {RequestController}  =   require('../controller/requestController');

router.get('/request/list',RequestController.new_request);



module.exports = router;