


// model/user.js
const moduleDB = require('../../db/postgres');
const moduleACCOUNTQUERY = require('../query/accountQuery');

const Account = {
    getUserInfo: async (userId) => {
        try {
            const result = await moduleDB.oneOrNone({
                text: moduleACCOUNTQUERY.SELECT_INFO,
                values: [userId],
                rowMode: 'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

module.exports = Account;
