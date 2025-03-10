
const { usersTable, usersRelations } = require("./UserModel");
const { foundItemsTable, foundItemsRelations } = require("./FoundItemsModel");
const { lostItemsTable, lostItemsRelations } = require("./LostItemsModel");

// on relations, 
// tables should be defined first, and imported
// then pass the tables to relations (hold by "tables" argument)
// why is that? to remove warning: circular dependency
// circular dependency creates this endless import of tables
// that are connected to each other
// also, if it's on circuar dependency,
// if a table that is not defined yet, there'll be error

const schema = {
  usersTable,
  foundItemsTable,
  lostItemsTable,
  usersRelations: usersRelations({ lostItemsTable, foundItemsTable }),
  foundItemsRelations: foundItemsRelations({ usersTable }),
  lostItemsRelations: lostItemsRelations({ usersTable }),
};

module.exports = schema;
