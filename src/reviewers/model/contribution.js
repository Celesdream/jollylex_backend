



const moduleDB            =   require('../../db/postgres');
const moduleCONTRIBUTIONQUERY     =   require('../query/contributionQuery');


const Contribution =
{
    select_list : async()=>
    {
        try
        {
            const result = await moduleDB.manyOrNone
            ({
                text : moduleCONTRIBUTIONQUERY.SELECT_LIST,
                rowMode : 'json',
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


    select_one: async (idContribution) => {
        try {
            const result = await moduleDB.one({
                text: moduleCONTRIBUTIONQUERY.SELECT_ONE,
                values: [idContribution],
                rowMode: 'json'
            });
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}



module.exports = Contribution;

