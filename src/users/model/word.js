


// model/word.js
const moduleDB = require('../../db/postgres');
const moduleWORDQUERY = require('../query/wordsQuery');

const Word = 
{
    addWords: async (words) => 
    {
        const queries = words.map(({ word, meaning, type, id_contributor }) => ({
            text: moduleWORDQUERY.INSERT_WORDS,
            values: [word, meaning, type, id_contributor],
            rowMode: 'json'
        }));

        try 
        {
            const result = await Promise.all(queries.map(query => moduleDB.oneOrNone(query)));
            console.log('Consulta SQL:', result);
            return result;
        } 
        catch (error) 
        {
            console.error('Error:', error);
            throw error;
        }
    },


    getUserContributions: async (userId) => 
    {
        try 
        {
            const result = await moduleDB.any
            ({
                text: moduleWORDQUERY.SELECT_CONTRIBUTIONS,
                values: [userId],
                rowMode: 'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        } 
        catch (error) 
        {
            console.error('Error:', error);
            throw error;
        }
    }




}

module.exports = Word;
