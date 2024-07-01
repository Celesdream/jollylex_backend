

const RequestQuery = 
{
    INSERT_NEW_REQUEST :
    `INSERT INTO 
        join_request ( email, test )
    VALUES
	    ( $1,$2 )
    RETURNING email
    `
}


module.exports = RequestQuery;