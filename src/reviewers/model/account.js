



const moduleDB = require('../../db/postgres');
const moduleACCOUNTQUERY = require('../query/accountQuery');

const Account = {
    getReviewerInfo: async (reviewerId) => {
        try {
            const result = await moduleDB.oneOrNone({
                text: moduleACCOUNTQUERY.GET_REVIEWER_INFO,
                values: [reviewerId],
                rowMode: 'json'
            });
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

module.exports = Account;