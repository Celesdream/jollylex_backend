

require('dotenv').config();
const moduleAUTH     =   require('../model/auth');
const moduleJWT       =   require('jsonwebtoken'); 
const moduleVALIDATOR =   require('validator'); 
const moduleVALIDATORAPI    = require('../middleware/validatorApi');



const AuthController = 
{
    //funcion para el inicio de sesion
    verify_mail: async(req,res) =>
    {
        
        try
        {
            const requiredFields = ['mail'];
            const {mail} = req.body;
            const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                return; // Detener la ejecución si hay campos faltantes
            }

            const deleteBlank = moduleVALIDATOR.trim(mail);


            //verificamos si es un email valido y pertenece al dominio indicado
            if(!moduleVALIDATOR.isEmail(deleteBlank))
            {
                return res.status(400).json({message : 'Mail invalido'});
            }


            
            const user   =   await moduleAUTH.select_mail(deleteBlank);
            const rol      =   'USER';

            if(user)
            {
                //guardamos en el payload el mail, el id y el rol del staff
                const jwtPayload    =   { email : deleteBlank, userId: user.id, rol : rol  };
                const jwtOptions    =   { expiresIn : '24h' };
                const secretkey     =   process.env.TOKEN_USER;
                const token         =   moduleJWT.sign(jwtPayload,secretkey,jwtOptions);
                const decodedToken  =   moduleJWT.verify(token,secretkey);

                res.status(200).json({message : 'Login Success', token });
            }
            else
            {
                res.status(400).json({message: "user not found"});
            }
        }
        catch(error)
        {
            res.status(500).json({message: "Error",error});
        }

    },

}



module.exports = 
{
    AuthController
}