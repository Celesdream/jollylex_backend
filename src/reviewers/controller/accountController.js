



// controller/accountController.js
const moduleACCOUNT = require('../model/account');
const moduleVALIDATORAPI    = require('../middleware/validatorApi');


const AccountController = {
    getReviewerInfo: async (req, res) => {
        try 
        {
            const requiredFields = ['reviewerId'];
            const { reviewerId } = req.body;

            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return; // Detener la ejecución si hay campos faltantes
            }

            // Llamar al servicio para obtener la información del revisor
            const reviewerInfo = await moduleACCOUNT.getReviewerInfo(reviewerId);

            // Responder con la información del revisor
            if (reviewerInfo) {
                res.status(200).json({ reviewerInfo });
            } else {
                res.status(404).json({ message: 'Revisor no encontrado.' });
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
