





const AuthQuery = 
{
    //selects a active staff member
    SELECT_EMAIL:
    `
    SELECT
        users.id,
        users.email,
        users.active 
    FROM
        users 
    WHERE
        users.email = $1 
        AND users.active = 1
    `,

}



module.exports = AuthQuery;