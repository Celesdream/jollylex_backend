



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
    },



    update_contribution: async (idContribution, status_option, idReviewer) => {
        try {
            const contribution = await moduleDB.one({
                text: moduleCONTRIBUTIONQUERY.SELECT_ONE,
                values: [idContribution],
                rowMode: 'json'
            });

            if (status_option === 1) {
                const normalizedWord = normalizeWord(contribution.word);

                const duplicateCheck = await moduleDB.oneOrNone({
                    text: moduleCONTRIBUTIONQUERY.CHECK_DUPLICATE_SIMILARITY,
                    values: [normalizedWord],
                    rowMode: 'json'
                });

                if (duplicateCheck) {
                    return { message: 'Palabra duplicada encontrada.' };
                }

                await moduleDB.none({
                    text: moduleCONTRIBUTIONQUERY.INSERT_APPROVED,
                    values: [contribution.word, contribution.meaning, contribution.type, idReviewer],
                    rowMode: 'json'
                });

                await moduleDB.none({
                    text: moduleCONTRIBUTIONQUERY.INCREMENT_REVIEW_COUNT,
                    values: [idReviewer],
                    rowMode: 'json'
                });
            }

            await moduleDB.none({
                text: moduleCONTRIBUTIONQUERY.UPDATE_CONTRIBUTION,
                values: [status_option, idContribution],
                rowMode: 'json'
            });

            return { message: 'Contribución actualizada correctamente.' };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }



}


function normalizeWord(word) {
    return word
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['"`]/g, '')
        .toLowerCase()
        .trim();
}



module.exports = Contribution;

