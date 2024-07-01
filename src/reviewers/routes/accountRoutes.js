



// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const { AccountController } = require('../controller/accountController');

router.post('/account/info', AccountController.getReviewerInfo);

module.exports = router;