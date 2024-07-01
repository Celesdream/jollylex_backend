



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
    }
}


module.exports = 
{
    RequestController
}