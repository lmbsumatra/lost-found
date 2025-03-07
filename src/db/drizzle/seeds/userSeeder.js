const db = require("../db_connection");
const { usersTable } = require("../schemas");
const { generateFakeUsers } = require("./data/user");

const seedUsers = async () => {
  try {
    const users = generateFakeUsers(10);
    await db.insert(usersTable).values(users);
  } catch (error) {
    console.log("error: ", error);
  } finally {
    process.exit();
  }
};

seedUsers();

module.exports = { seedUsers };
