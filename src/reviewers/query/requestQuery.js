



const RequestQuery = 
{
    SELECT_LIST :
    `
    SELECT
        join_request."id",
        join_request.email,
        join_request.test,
        join_request.status_option 
    FROM
	    join_request 
    WHERE
	    join_request.status_option = 0
    `
}


module.exports = RequestQuery;