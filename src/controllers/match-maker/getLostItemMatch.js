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
        return res.status(404).send({ serror: "Item not found" });
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

      res.send({ lostItem, matches: matches[0] });
    } catch (error) {
      res.status(500).send({ error: "Item not found" });
    }
  }
};

module.exports = { getLostItemMatch };
