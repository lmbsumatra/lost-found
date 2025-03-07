const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");
const create = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const data = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Incomplete data" });
  }

  // check data
  if (!Object.keys(data).length === (null || 0)) {
    return res.status(400).json({ error: "No data to update" });
  }

  const addedItem = await db.insert(schema.usersTable).values(data);
  res.send({ addedItem });
};

module.exports = { create };
