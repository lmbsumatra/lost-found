// db connection
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_UN || "root",
  password: process.env.DB_PW || "NewPassword",
  database: process.env.DB_DB || "lost_found",
  port: process.env.DB_PORT || "3306",
});

module.exports = db;
