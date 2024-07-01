



const AccountQuery = 
{
    SELECT_INFO :
    `
      SELECT 
        users.nickname,
        users.email,
        users.signin_date,
        COUNT(pure_raw_purep.id) AS contributions
    FROM 
        users
    LEFT JOIN 
        pure_raw_purep  
    ON 
        users.id = pure_raw_purep.id_contributor AND pure_raw_purep.progress = 2
    WHERE 
        users.id = $1
    GROUP BY 
        users.id
    `
}


module.exports = AccountQuery;