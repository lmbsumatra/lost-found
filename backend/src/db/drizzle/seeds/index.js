const { seedUsers } = require("./userSeeder");
const { seedFoundItems } = require("./foundItemsSeeder");
const { seedLostItems } = require("./lostItemsSeeder");

const seeds = {
  seedUsers,
  seedFoundItems,
  seedLostItems,
};

module.exports = seeds;
