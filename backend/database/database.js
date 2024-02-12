require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
