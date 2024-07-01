


require('dotenv').config();
const moduleREQUEST     =   require('../model/request');
const moduleVALIDATOR =   require('validator'); 
const moduleVALIDATORAPI    = require('../middleware/validatorApi');



const RequestController =
{
    new_request : async(req,res)=>
    {
        try
        {
            const requiredFields = ['email','test']
            const {email,test} = req.body;

            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return; // Detener la ejecución si hay campos faltantes
            }

            const deleteBlank = moduleVALIDATOR.trim(email);


            //verificamos si es un email valido y pertenece al dominio indicado
            if(!moduleVALIDATOR.isEmail(deleteBlank))
            {
                return res.status(400).json({message : 'Mail invalido'});
            }

            const newRequest = await moduleREQUEST.insert_request(email,test);

            if(newRequest)
            {
                res.status(200).json({newRequest });
            }

        
        }
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }
}


module.exports = 
{
    RequestController
}