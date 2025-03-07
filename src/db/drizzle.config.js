const { defineConfig } = require("drizzle-kit");
require("dotenv").config();

module.exports = defineConfig({
  schema: "./src/db/drizzle/schemas/index.js",
  out: "./src/db/drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_UN,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
  },
  verbose: true,
  strict: true,
});
