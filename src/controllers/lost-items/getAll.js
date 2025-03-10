const { db } = require("../../constants");

const getAll = async (req, res) => {
  const items = await db.query.lostItemsTable.findMany({
    with: {
      user: { columns: { id: true } },
    },
  });
  res.send({ items });
};

module.exports = { getAll };
