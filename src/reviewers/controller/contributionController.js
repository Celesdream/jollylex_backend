



require('dotenv').config();
const moduleCONTRIBUTION     =   require('../model/contribution');
const moduleVALIDATOR =   require('validator'); 
const moduleVALIDATORAPI    = require('../middleware/validatorApi');


const ContributionController =
{
    list_pending : async(req,res) =>
    {
        try
        {
            const listPending = await moduleCONTRIBUTION.select_list();

            if(listPending)
                {
                    res.status(200).json({listPending});
                }
        }
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },

    view_contribution: async (req, res) => {
        try {
            const requiredFields = ['idContribution'];
            const { idContribution } = req.body;
            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return;
            }

            const contribution = await moduleCONTRIBUTION.select_one(idContribution);
            if (contribution) {
                res.status(200).json({ contribution });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },


    update_contribution: async (req, res) => {
        try {
            const requiredFields = ['idContribution', 'status_option', 'idReviewer'];
            const { idContribution, status_option, idReviewer } = req.body;

            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return;
            }

            if (![1, 2].includes(status_option)) {
                return res.status(400).json({ message: 'Estado inválido. Debe ser 1 (aceptado) o 2 (rechazado).' });
            }

            const updateResult = await moduleCONTRIBUTION.update_contribution(idContribution, status_option, idReviewer);

            if (updateResult) {
                res.status(200).json({ message: 'Contribución actualizada correctamente.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }


    
}


module.exports = 
{
    ContributionController
}


