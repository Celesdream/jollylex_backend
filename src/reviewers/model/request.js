



const moduleDB            =   require('../../db/postgres');
const moduleREQUESTQUERY     =   require('../query/requestQuery');


const Request =
{
    select_list : async()=>
    {
        try
        {
            const result = await moduleDB.many
            ({
                text : moduleREQUESTQUERY.SELECT_LIST,
                rowMode : 'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    }
}


module.exports = Request;