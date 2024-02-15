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
      totaValuel: response.rows.map((row) => row["totalvalue"]),
      percentageValue: response.rows.map((row) => row["percentagevalue"]),
      dmdate: response.rows.map((row) => row["dmdate"]),
    };
    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

module.exports = { donutChart };
