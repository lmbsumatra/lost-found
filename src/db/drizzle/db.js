require("dotenv").config();
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");

// only pool works, idk why!!!
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
});

// const pool = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_UN,
//   password: process.env.DB_PW,
//   database: process.env.DB_DB,
// });
// const pool = drizzle(process.env.DB_URL)

const db = drizzle(pool);

module.exports = db;
