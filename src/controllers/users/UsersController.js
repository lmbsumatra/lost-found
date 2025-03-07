const { getAll } = require("./getAll");
const { updateById } = require("./updateById");

const UsersController = { getAll, updateById };

module.exports = { UsersController };
