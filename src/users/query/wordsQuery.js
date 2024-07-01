// query/wordQuery.js



const WordsQuery = 
{
    INSERT_WORDS :
    `    INSERT INTO pure_raw_purep (word, meaning, type, id_contributor)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`
}

module.exports = WordsQuery;