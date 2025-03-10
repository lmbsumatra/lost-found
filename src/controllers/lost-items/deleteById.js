const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");

const deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!req.params.itemId || !itemId) {
    res.status(400).json({ error: "userId is required." });
  }
  const deletedLostItem = await db
    .delete(schema.lostItemsTable)
    .where(eq(schema.lostItemsTable.id, itemId));
  res.send({ deletedLostItem });
};

module.exports = { deleteItem };
