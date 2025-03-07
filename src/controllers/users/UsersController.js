const { getAll } = require("./getAll");
const { updateById } = require("./updateById");
const { create } = require("./createUser");
const { deleteUser } = require("./deleteById");

const UsersController = { getAll, updateById, create, deleteUser };

module.exports = { UsersController };
