const db = require("../db_connection");
const { lostItemsTable } = require("../schemas/LostItemsModel"); // Direct import from model file
const { generateFakeLostItems } = require("./data/lostItems");

const seedLostItems = async () => {
  try {
    const lostItems = await generateFakeLostItems(1);
    if (lostItems.length === 0) {
      console.warn("No lost items generated. Skipping database insert.");
      return;
    }

    await db.insert(lostItemsTable).values(lostItems);
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

seedLostItems();
