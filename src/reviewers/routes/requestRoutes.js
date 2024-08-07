



const express           =   require('express');
const router            =   express.Router();
const {RequestController}  =   require('../controller/requestController');

router.get('/request/list',RequestController.request_list);
router.post('/request/view',RequestController.view_request);

router.post('/request/update', RequestController.update_request);


module.exports = router;