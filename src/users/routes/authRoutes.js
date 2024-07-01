


const express           =   require('express');
const router            =   express.Router();
const {AuthController}  =   require('../controller/authController');

router.post('/auth/verify-email',AuthController.verify_mail);



module.exports = router;