


// controller/userController.js
const moduleACCOUNT = require('../model/account');
const moduleVALIDATORAPI    = require('../middleware/validatorApi');


const AccountController = 
{
    getUserInfo: async (req, res) => 
        {
        try 
        {
            const requiredFields = ['userId']
            const { userId } = req.body;

            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return;
            }

            // Llamar al servicio para obtener la información del usuario
            const userInfo = await moduleACCOUNT.getUserInfo(userId);

            // Responder con la información del usuario
            if (userInfo) {
                res.status(200).json({ userInfo });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado.' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }
}

module.exports = {
    AccountController
}
