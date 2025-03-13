const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");

const deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!req.params.itemId || !itemId) {
    res.status(400).json({ error: "userId is required." });
  }
  const deletedFoundItems = await db
    .delete(schema.foundItemsTable)
    .where(eq(schema.foundItemsTable.id, itemId));
  res.send({ deletedFoundItems });
};

module.exports = { deleteItem };
