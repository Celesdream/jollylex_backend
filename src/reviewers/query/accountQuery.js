



const AccountQuery = 
{
    GET_REVIEWER_INFO: `
SELECT
	reviewers."id", 
	reviewers.nickname, 
	reviewers.email, 
	reviewers.reviews, 
	reviewers.active
FROM
	reviewers
    WHERE reviewers."id" = $1
    `
}

module.exports = AccountQuery;