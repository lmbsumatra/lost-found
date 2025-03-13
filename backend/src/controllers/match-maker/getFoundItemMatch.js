const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");
const CalculateMatchScore = require("./helpers/CalculateMatchScore");

const getFoundItemMatch = async (req, res) => {
  const userId = req.token;
  const itemId = req.params.itemId;

  if (!itemId || isNaN(itemId)) {
    res.status(500).send({ error: "Invalid Item Id" });
  } else {
    try {
      const foundItem = await db.query.foundItemsTable.findFirst({
        where: eq(schema.foundItemsTable.id, itemId),
      });

      if (!foundItem) {
        res.status(500).json({
          message: "Found item not found",
          error: error.message,
          stack: error.stack,
        });
      }

      const lostItems = await db.query.lostItemsTable.findMany({});

      const matches = await Promise.all(
        lostItems.map(async (lostItem) => {
          return {
            lostItem,
            score: await CalculateMatchScore(foundItem, lostItems),
          };
        })
      );

      matches.sort((a, b) => b.score - a.score);

      res.send({ matches: [{ foundItem, matches: matches[0] }] });
    } catch (error) {
      res.status(500).json({
        message: "Match item not found",
        error: error.message,
        stack: error.stack,
      });
    }
  }
};

module.exports = { getFoundItemMatch };
