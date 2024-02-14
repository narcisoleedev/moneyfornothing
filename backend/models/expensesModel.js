const pool = require('../database/database.js');

async function expensesModelPost(expenses){
    try{
        const client = await pool.connect();
        console.log(expenses.userEmail);
        const response = await client.query(
            `INSERT INTO expenses(expenseName, expenseDescription, expenseType, expenseValue, expenseDate, userEmail) VALUES ('${expenses.name}', '${expenses.description}', '${expenses.type}', ${expenses.value}, '${expenses.date}', '${expenses.userEmail}')`
        );
        client.release();
        return response;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {expensesModelPost}