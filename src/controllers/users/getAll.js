const { db, schema } = require("../../constants");

const getAll = async (req, res) => {
  const users = await db.select().from(schema.usersTable);
  res.send({ users });
};

module.exports = { getAll };
