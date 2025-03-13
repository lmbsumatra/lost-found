require("dotenv").config();
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");
const schema = require("./schemas");


// di ko alam kung bakit createPool, mas nasanay ako na createConnection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  database: process.env.DB_DB,
});

const db = drizzle(pool, {
  schema,
  mode: "default", // mode warning: resolved: if schema is passed, should have mode: default/nalimutan ko
});

module.exports = db;
