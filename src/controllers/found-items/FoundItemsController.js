const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { create } = require("./createFoundItem");
const { deleteItem } = require("./deleteById");

const FoundItemsController = { getAll, updateById, create, deleteItem };

module.exports = { FoundItemsController };
