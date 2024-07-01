


const moduleDB            =   require('../../db/postgres');
const moduleREQUESTQUERY     =   require('../query/requestQuery');

const Request =
{
    insert_request : async(email,test)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text : moduleREQUESTQUERY.INSERT_NEW_REQUEST,
                values : [email,test],
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