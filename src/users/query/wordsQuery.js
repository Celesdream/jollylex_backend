// query/wordQuery.js



const WordsQuery = 
{
    INSERT_WORDS :
    `    INSERT INTO pure_raw_purep (word, meaning, type, id_contributor)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,



    SELECT_CONTRIBUTIONS :
    `
    SELECT 
        word,
        meaning,
        type,
        log_date,
        progress,
    CASE
            WHEN progress = 2 THEN 'Aceptada'
            WHEN progress = 3 THEN 'Rechazada'
            ELSE 'Pendiente'
        END AS status
    FROM 
        pure_raw_purep
    WHERE 
        id_contributor = $1
    ORDER BY 
        log_date DESC
    
    `,
}

module.exports = WordsQuery;