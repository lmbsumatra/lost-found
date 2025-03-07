const { getAll } = require("./getAll");
const { updateById } = require("./updateById");

const FoundItemsController = { getAll, updateById };

module.exports = { FoundItemsController };
