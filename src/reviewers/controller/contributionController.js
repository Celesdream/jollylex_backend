



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
    }
}


module.exports = 
{
    ContributionController
}