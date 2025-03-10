const { db } = require("../../constants");
const getAll = async (req, res) => {
  try {
    const users = await db.query.usersTable.findMany({
      with: {
        lostItems: { columns: { userId: true } },
      },
    });

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getAll };
