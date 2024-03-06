const pool = require("../database/database.js");

async function donutChart(userEmail) {
  try {
    const client = await pool.connect();
    const response = await client.query(`SELECT expenseType,
            SUM(expenseValue) AS totalValue, 
            --This over function iterates over all categories
            SUM(expenseValue) / SUM(SUM(expenseValue)) OVER () AS percentageValue,
            EXTRACT(DAY FROM MAX(expenseDate)) || '/' || EXTRACT(MONTH FROM MAX(expenseDate)) as dmDate 
            FROM expenses 
            WHERE userEmail = '${userEmail}'
            GROUP BY expenseType 
            HAVING EXTRACT(MONTH FROM MAX(CURRENT_TIMESTAMP)) = EXTRACT(MONTH FROM MAX(expenseDate))
            ORDER BY dmDate DESC;`);
    const data = {
      expensetype: response.rows.map((row) => row["expensetype"]),
      totalValue: response.rows.map((row) => row["totalvalue"]),
      percentageValue: response.rows.map((row) => row["percentagevalue"]),
      dmdate: response.rows.map((row) => row["dmdate"]),
    };
    client.release();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function averageExpenses(userEmail) {
  try {
    const client = await pool.connect();
    const response = await client.query(`SELECT
        SUM(expenseValue) AS totalValue,
        SUM(expenseValue) / EXTRACT(DAY FROM MAX(expenseDate)) AS averageValue
        EXTRACT(DAY FROM MAX(expenseDate)) as day
        FROM expenses
        WHERE userEmail = '${userEmail}'
        AND EXTRACT(MONTH FROM MAX(CURRENT_TIMESTAMP)) = EXTRACT(MONTH FROM MAX(expenseDate))`);
    const data = {
      totalValue: response.rows[0]["totalvalue"],
      averageValue: response.rows[0]["averagevalue"],
      days: response.rows[0]["days"],
    };
    client.release();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { donutChart, averageExpenses };
