


const moduleDB            =   require('../../db/postgres');
const moduleAUTHQUERY     =   require('../query/authQuery');



const Auth =
{
    select_mail: async(mail)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text    :   moduleAUTHQUERY.SELECT_EMAIL,
                values  :   [mail],
                rowMode :   'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        }
        catch(error)
        {
            throw new Error(`Error when finding staff: ${error.message}`);
        }
    },



}



module.exports = Auth;