


const express           =   require('express');
const router            =   express.Router();
const {AuthController}  =   require('../controller/authController');

router.post('/auth/verify-email',AuthController.verify_mail);   //#1 STAFF INICIO DE SESION



module.exports = router;