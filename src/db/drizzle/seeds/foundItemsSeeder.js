const db = require("../db_connection");
const { foundItemsTable } = require("../schemas");
const foundItems = require("./data/foundItems.json");

const seedFoundItems = async () => {
  try {
    await db.insert(foundItemsTable).values(foundItems);
  } catch (error) {
    console.log("error: ", error);
  } finally {
    process.exit();
  }
};

if (require.main === module) {
  seedFoundItems().finally(() => {
    process.exit();
  });
}

module.exports = { seedFoundItems };
