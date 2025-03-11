const { eq } = require("drizzle-orm");
const { db, schema } = require("../constants");

const userIdValidator = async (userId) => {
  const foundUserId = await db.query.usersTable.findMany({
    where: eq(schema.usersTable.id, userId),
    columns: {
      id: true,
    },
  });

  if (!foundUserId || foundUserId.length === 0) {
    return "User do not exist.";
  }

  return null;
};
module.exports = userIdValidator;
