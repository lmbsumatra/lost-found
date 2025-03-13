const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");
const updateById = async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  console.log(updates, id);

  if (typeof updates.dateLost === "string") {
    updates.dateLost = new Date(updates.dateLost);
  }

  // check id
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid Id is required." });
  }

  // check data
  if (!Object.keys(updates).length === (null || 0)) {
    return res.status(400).json({ error: "No data to update" });
  }

  const updatedItem = await db
    .update(schema.lostItemsTable)
    .set(updates)
    .where(eq(schema.lostItemsTable.id, id));
  res.send({ updatedItem });
};

module.exports = { updateById };
