const db = require("../db_connection");
const { usersTable } = require("../schemas");
const users = require("./data/user.json");

const seedUsers = async () => {
  try {
    await db.insert(usersTable).values(users);
  } catch (error) {
    console.log("error: ", error);
  } finally {
    process.exit();
  }
};

if (require.main === module) {
  seedUsers().finally(() => {
    process.exit();
  });
}

module.exports = { seedUsers };
