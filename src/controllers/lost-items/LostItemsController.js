const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { create } = require("./createLostItem");
const { deleteItem } = require("./deleteById");

const LostItemsController = { getAll, updateById, create, deleteItem };

module.exports = { LostItemsController };
