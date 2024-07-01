


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
    
    `
}



module.exports = ContributionQuery;