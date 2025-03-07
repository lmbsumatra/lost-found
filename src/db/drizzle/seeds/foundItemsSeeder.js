const db = require("../db_connection");
const { foundItemsTable } = require("../schemas/FoundItemsModel");
const { generateFakeFoundItems } = require("./data/foundItems");

const seedFoundItems = async () => {
  try {
    const foundItems = await generateFakeFoundItems(1);
    if (foundItems.length === 0) {
      console.warn("No lost items generated. Skipping database insert.");
      return;
    }

    await db.insert(foundItemsTable).values(foundItems);
  } catch (error) {
    console.error("Error inserting fake lost items:", error);
    console.error("Error details:", error.stack);
  } finally {
    try {
      if (db.end) await db.end();
      else if (db.pool && db.pool.end) await db.pool.end();
    } catch (err) {
      console.error("Error closing DB connection:", err);
    }
    process.exit();
  }
};

seedFoundItems();
