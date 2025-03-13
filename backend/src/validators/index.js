const categoryValidator = require("./categoryValidator");
const dateValidator = require("./dateValidator");
const descriptionValidator = require("./descriptionValidator");
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
  passwordValidator,
  descriptionValidator
};

module.exports = validator;

const foundItemValidation = {
  name: validator.nameValidator,
  userId: validator.userIdValidator,
  category: validator.categoryValidator,
  locationFound: validator.locationValidator,
  dateFound: validator.dateValidator,
  description: validator.descriptionValidator,
};

const lostItemValidation = {
  name: validator.nameValidator,
  userId: validator.userIdValidator,
  category: validator.categoryValidator,
  locationLost: validator.locationValidator,
  dateLost: validator.dateValidator,
  description: validator.descriptionValidator,
};

const userSchemaValidation = {
  name: validator.nameValidator,
  email: validator.emailValidator,
  password: validator.passwordValidator,
};

module.exports = { foundItemValidation, userSchemaValidation,lostItemValidation };
