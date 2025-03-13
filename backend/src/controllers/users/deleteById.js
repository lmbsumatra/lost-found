const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  if (!req.params.userId || !userId) {
    res.status(400).json({ error: "userId is required." });
  }
  const deletedUser = await db
    .delete(schema.usersTable)
    .where(eq(schema.usersTable.id, userId));
  res.send({ deletedUser });
};

module.exports = { deleteUser };
