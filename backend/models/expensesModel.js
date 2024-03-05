const pool = require("../database/database.js");

async function expensesModelGet(userEmail) {
  try {
    const client = await pool.connect();
    const response = await client.query(
      `SELECT expenseName, expenseDescription, expenseType, expenseValue, expenseDate FROM expenses WHERE userEmail = '${userEmail}'`,
    );
    client.release();
    const expenses = {
      expenseName: response.rows.map((row) => row["expensename"]),
      expenseDescription: response.rows.map((row) => row["expensedescription"]),
      expenseType: response.rows.map((row) => row["expensetype"]),
      expenseValue: response.rows.map((row) => row["expensevalue"]),
      expenseDate: response.rows.map((row) => row["expensedate"]),
    };
    console.log(response);
    return expenses;
  } catch (err) {
    return null;
  }
}

async function expensesModelPost(expenses) {
  try {
    const client = await pool.connect();
    const response = await client.query(
      `INSERT INTO expenses(expenseName, expenseDescription, expenseType, expenseValue, expenseDate, userEmail) VALUES ('${expenses.name}', '${expenses.description}', '${expenses.type}', ${expenses.value}, '${expenses.date}', '${expenses.userEmail}')`,
    );
    client.release();
    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { expensesModelGet, expensesModelPost };
