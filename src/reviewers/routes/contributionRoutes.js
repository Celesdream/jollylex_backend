



const express           =   require('express');
const router            =   express.Router();
const {ContributionController}  =   require('../controller/contributionController');

router.get('/contribution/list-pending',ContributionController.list_pending);
router.post('/contribution/view', ContributionController.view_contribution);
router.post('/contribution/update', ContributionController.update_contribution);

module.exports = router;

