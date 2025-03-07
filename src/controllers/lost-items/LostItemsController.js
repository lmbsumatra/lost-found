const { getAll } = require("./getAll");
const { updateById } = require("./updateById");

const LostItemsController = { getAll,updateById };

module.exports = { LostItemsController };
