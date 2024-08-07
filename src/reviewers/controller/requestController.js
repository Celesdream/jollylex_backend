



require('dotenv').config();
const moduleREQUEST     =   require('../model/request');
const moduleVALIDATOR =   require('validator'); 
const moduleVALIDATORAPI    = require('../middleware/validatorApi');



const RequestController =
{
    request_list : async(req,res)=>
    {
        try
        {

            const requestList = await moduleREQUEST.select_list();

            if(requestList)
            {
                res.status(200).json({requestList });
            }
        }
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },

    view_request : async(req,res) =>
    {
        try
        {
            const requiredFields = ['idRequest'];
            const {idRequest} = req.body;

            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return; // Detener la ejecución si hay campos faltantes
            }

            const request = await moduleREQUEST.select_one(idRequest);
            console.log("sdfgsdfsdf",request);

            if(request)
            {
                res.status(200).json({request});
                
            }
        }
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },


    update_request: async (req, res) => 
    {
        try 
        {
            const requiredFields = ['idRequest', 'status_option'];
            const { idRequest, status_option } = req.body;
            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return;
            }

            // Verificar que status_option sea 1 (aceptado) o 2 (rechazado)
            if (![1, 2].includes(status_option)) 
            {
                return res.status(400).json({ message: 'Estado inválido. Debe ser 1 (aceptado) o 2 (rechazado).' });
            }

            const updateResult = await moduleREQUEST.update_request(idRequest, status_option);

            if (updateResult) 
            {
                res.status(200).json({ message: 'Solicitud actualizada correctamente.' });
            }
        } catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },
}


module.exports = 
{
    RequestController
}