

// routes/wordRoutes.js
const express = require('express');
const router = express.Router();
const { WordController } = require('../controller/wordController');

router.post('/words/new', WordController.addWords);

module.exports = router;
