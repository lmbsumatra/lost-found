const { foundItemsTable, foundItemsRelations } = require("./FoundItemsModel");
const { lostItemsTable, lostItemsRelations } = require("./LostItemsModel");
const { usersTable, usersRelations } = require("./UserModel");

const schema = {
  usersTable,
  lostItemsTable,
  foundItemsTable,
};

module.exports = schema;
