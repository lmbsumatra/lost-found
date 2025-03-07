const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");
const create = async (req, res) => {
  const { name, description, category, locationLost, dateLost } =
    req.body;

  const data = { ...req.body, userId: req.token };

  if (!name || !description || !category || !locationLost || !dateLost) {
    return res.status(400).json({ error: "Incomplete data" });
  }

  // check data
  if (!Object.keys(data).length === (null || 0)) {
    return res.status(400).json({ error: "No data to update" });
  }

  if (data.dateLost) {
    data.dateLost = new Date(data.dateLost);
  }

  const addedItem = await db.insert(schema.lostItemsTable).values(data);
  res.send({ addedItem });
};

module.exports = { create };
