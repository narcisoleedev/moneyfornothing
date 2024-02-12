const pool = require("../database/database.js");

async function userModelLogin(user) {
  try {
    const client = await pool.connect();
    const response = await client.query(
      `SELECT password FROM usersTable WHERE username = '${user.username}'`,
    );
    client.release();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function userModelSignup(user) {
  try {
    const client = await pool.connect();
    const response = await client.query(
      `INSERT INTO usersTable(username, password) VALUES ( '${user.username}' , '${user.password}' )`,
    );
    client.release();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { userModelLogin, userModelSignup };
