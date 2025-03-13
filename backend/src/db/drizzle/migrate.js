const { drizzle } = require("drizzle-orm/mysql2");
const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function main() {
  const migrationClient = await mysql.createConnection(process.env.DB_URL);
  const db = drizzle(migrationClient);

  console.log("Starting migration...");
  
  await migrate(db, {
    migrationsFolder: "./src/db/drizzle/migrations",
  });

  console.log("Migration completed.");

  await migrationClient.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
