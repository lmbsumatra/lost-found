const { eq } = require("drizzle-orm");
const { db, schema } = require("../../constants");
const CalculateMatchScore = require("./helpers/CalculateMatchScore");

const getLostItemMatch = async (req, res) => {
  const userId = req.token;
  const itemId = req.params.itemId;


  if (!itemId || isNaN(itemId)) {
    res.status(500).send({ error: "Invalid Item Id" });
  } else {
    try {
      const lostItem = await db.query.lostItemsTable.findFirst({
        where: eq(schema.lostItemsTable.id, itemId),
      });

      if (!lostItem) {
        res.status(500).json({
          message: "Lost Item not found",
          error: error.message,
          stack: error.stack,
        });
      }

      const foundItems = await db.query.foundItemsTable.findMany({});

      const matches = await Promise.all(
        foundItems.map(async (foundItem) => {
          return {
            foundItem,
            score: await CalculateMatchScore(lostItem, foundItem),
          };
        })
      );

      matches.sort((a, b) => b.score - a.score);

      res.send({ matches: [{ lostItem, matches: matches[0] }] });
    } catch (error) {
      res.status(500).json({
        message: "Match Item not found",
        error: error.message,
        stack: error.stack,
      });
    }
  }
};

module.exports = { getLostItemMatch };
