




const AuthQuery = 
{
    //selects a active staff member
    SELECT_EMAIL:
    `
SELECT
	reviewers."id",
	reviewers.nickname,
	reviewers.email,
	reviewers.reviews,
	reviewers.active 
FROM
	reviewers 
WHERE
	reviewers.email = $1 
	AND reviewers.active = 1
    `,

}



module.exports = AuthQuery;