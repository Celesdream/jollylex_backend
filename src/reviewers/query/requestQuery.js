



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
    `,
    


    SELECT_ONE:
    `
    SELECT
        join_request."id", 
        join_request.email, 
        join_request.test, 
        join_request.status_option, 
        join_request.log_date
    FROM
	    join_request
    WHERE
        join_request.status_option = 0 AND
        join_request."id" = $1
    
    `,


    UPDATE_REQUEST: `
    UPDATE join_request
    SET status_option = $1,
        log_date = CASE 
                    WHEN $1 = 1 THEN CURRENT_TIMESTAMP 
                    ELSE log_date 
                   END
    WHERE id = $2
    RETURNING *
`,
}


module.exports = RequestQuery;