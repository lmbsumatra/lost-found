const { db, schema } = require("../../constants");

const getAll = async (req, res) => {
  const items = await db.select().from(schema.foundItemsTable);
  res.send({ items });
};

module.exports = { getAll };
