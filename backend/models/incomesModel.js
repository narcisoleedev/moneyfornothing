const pool = require("../database/database.js");

async function incomesModelGet(userEmail){
    try{
      const client = await pool.connect();
      const response = await client.query(
        `SELECT incomeName, incomeDescription, incomeType, incomeValue, incomeLiquidity, incomeFrequency, incomeStartDate FROM incomes WHERE userEmail = '${userEmail}'
        ORDER BY incomeStartDate;`
      );
      client.release();
      const incomes = {
        incomeName: response.rows.map(row=>row['incomename']),
        incomeDescription: response.rows.map(row=>row['incomedescription']),
        incomeType: response.rows.map(row=>row['incometype']),
        incomeValue: response.rows.map(row=>row['incomevalue']),
        incomeLiquidity: response.rows.map(row=>row['incomeliquidity']),
        incomeFrequency: response.rows.map(row=>row['incomefrequency']),
        incomeStartDate: response.rows.map(row=>row['incomestartdate']),
      }
      console.log(response);
      return incomes;
    }
    catch(err){
      return null;
    }
  }

async function incomesModelPost(incomes) {
    try {
      const client = await pool.connect();
      const response = await client.query(
        `INSERT INTO incomes(incomeName, incomeDescription, incomeType, incomeValue, incomeLiquidity, incomeFrequency, incomeStartDate, userEmail) VALUES ('${incomes.name}', '${incomes.description}', '${incomes.type}', ${incomes.value}, ${incomes.liquidity}, '${incomes.frequency}', '${incomes.startDate}', '${incomes.userEmail}');`,
      );
      client.release();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

module.exports = { incomesModelGet, incomesModelPost }