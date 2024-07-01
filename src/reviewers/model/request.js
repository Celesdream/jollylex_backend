



const moduleDB            =   require('../../db/postgres');
const moduleREQUESTQUERY     =   require('../query/requestQuery');


const Request =
{
    select_list : async()=>
    {
        try
        {
            const result = await moduleDB.manyOrNone
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
    },

    select_one : async(idRequest) =>
    {
        try
        {
            const result = await moduleDB.one
            ({
                text : moduleREQUESTQUERY.SELECT_ONE,
                values : [idRequest],
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
    },


    update_request: async (idRequest, status_option) => 
    {
        try 
        {
            const result = await moduleDB.one
            ({
                text: moduleREQUESTQUERY.UPDATE_REQUEST,
                values: [status_option, idRequest],
                rowMode: 'json'
            });
            return result;
        } 
        catch (error) 
        {
            console.error('Error:', error);
            throw error;
        }
    },
}


module.exports = Request;