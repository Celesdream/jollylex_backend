

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { AccountController } = require('../controller/accountController');

router.post('/account/info', AccountController.getUserInfo);

module.exports = router;
