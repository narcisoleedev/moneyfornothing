const pool = require("../database/database.js");

async function userModelLogin(user) {
  try {
    const client = await pool.connect();
    const response = await client.query(
      `SELECT password FROM usersTable WHERE email = '${user.email}';`,
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
      `INSERT INTO usersTable(email, firstname, lastname, password) VALUES ( '${user.email}' , '${user.firstname}', '${user.lastname}' , '${user.password}' );`,
    );
    client.release();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { userModelLogin, userModelSignup };
