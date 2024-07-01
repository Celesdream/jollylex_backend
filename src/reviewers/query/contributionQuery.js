


const ContributionQuery = 
{
    SELECT_LIST : 
    `
    SELECT
        pure_raw_purep.word,
        pure_raw_purep.meaning,
        pure_raw_purep."type",
        pure_raw_purep.id_contributor,
        pure_raw_purep.progress,
        pure_raw_purep.log_date,
        pure_raw_purep."id" AS id_contribution,
        users.nickname,
        users.email,
        users.active 
    FROM
        pure_raw_purep
        INNER JOIN users ON pure_raw_purep.id_contributor = users."id" 
    WHERE
        pure_raw_purep.progress = 0 AND users.active = 1
    
    `,

    SELECT_ONE: 
    `
    SELECT
        pure_raw_purep.word,
        pure_raw_purep.meaning,
        pure_raw_purep.type,
        pure_raw_purep.id_contributor,
        pure_raw_purep.progress,
        pure_raw_purep.log_date,
        pure_raw_purep.id AS id_contribution,
        users.nickname,
        users.email,
        users.active 
    FROM
        pure_raw_purep
        INNER JOIN users ON pure_raw_purep.id_contributor = users.id 
    WHERE
        pure_raw_purep.id = $1
    `,


    CHECK_DUPLICATE_SIMILARITY: `
        SELECT word
        FROM pure_repo_purep
        WHERE word % $1
        ORDER BY similarity(word, $1) DESC
        LIMIT 1
    `,

    INSERT_APPROVED: `
        INSERT INTO pure_repo_purep (word, meaning, type, log_date, id_reviewer)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
    `,

    UPDATE_CONTRIBUTION: `
        UPDATE pure_raw_purep
        SET progress = $1
        WHERE id = $2
    `,

    INCREMENT_REVIEW_COUNT: `
    UPDATE reviewers
    SET reviews = reviews + 1
    WHERE id = $1
`


}



module.exports = ContributionQuery;
