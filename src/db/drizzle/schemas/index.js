const { foundItemsTable } = require("./FoundItemsModel");
const { lostItemsTable } = require("./LostItemsModel");
const { usersTable } = require("./UserModel");

const schema = {
  usersTable,
  lostItemsTable,
  foundItemsTable,
};

module.exports = { schema };
