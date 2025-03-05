const db = require("../db_connection");
const { lostItemsTable } = require("../schemas");
const lostItems = require("./data/lostItems.json");

const seedLostItems = async () => {
  try {
    await db.insert(lostItemsTable).values(lostItems);
  } catch (error) {
    console.log("error: ", error);
  } finally {
    process.exit();
  }
};

if (require.main === module) {
  seedLostItems().finally(() => {
    process.exit();
  });
}

module.exports = { seedLostItems };
