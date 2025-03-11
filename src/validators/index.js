const categoryValidator = require("./categoryValidator");
const dateValidator = require("./dateValidator");
const emailValidator = require("./emailValidator");
const locationValidator = require("./locationValidator");
const nameValidator = require("./nameValidator");
const passwordValidator = require("./passwordValidator");
const userIdValidator = require("./userIdValidator");

const validator = {
  nameValidator,
  userIdValidator,
  categoryValidator,
  locationValidator,
  dateValidator,
  emailValidator,
  passwordValidator
};

module.exports = validator;
