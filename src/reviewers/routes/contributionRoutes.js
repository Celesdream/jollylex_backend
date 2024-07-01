



const express           =   require('express');
const router            =   express.Router();
const {ContributionController}  =   require('../controller/contributionController');

router.get('/contribution/list-pending',ContributionController.list_pending);


module.exports = router;