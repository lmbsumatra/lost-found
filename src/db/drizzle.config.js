const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  schema: "./src/db/drizzle/schemas/schemas.js",
  out: "./src/db/drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NewPassword",
    database: "lost_found",
  },
  verbose: true,
  strict: true,
});
