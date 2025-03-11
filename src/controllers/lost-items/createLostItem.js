const { db, schema } = require("../../constants");
const validator = require("../../validators");
const create = async (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "category",
    "locationLost",
    "dateLost",
  ];
  const { name, description, category, locationLost, dateLost } = req.body;

  // check if all required fields are present and not empty/null
  if (
    !requiredFields.every(
      (field) =>
        field in req.body && req.body[field] !== null && req.body[field] !== ""
    )
  ) {
    const missingOrEmptyFields = requiredFields.filter(
      (field) =>
        !(field in req.body) ||
        req.body[field] === null ||
        req.body[field] === ""
    );
    return res.status(400).json({
      error: "Missing or empty required fields",
      details: missingOrEmptyFields,
    });
  }

  // start validation of fields
  const errors = [];
  const nameError = validator.nameValidator(name);
  if (nameError) {
    errors.push(nameError);
  }
  const userIdError = await validator.userIdValidator(req.token);
  if (userIdError) {
    errors.push(userIdError);
  }
  const categoryError = validator.categoryValidator(category);
  if (categoryError) {
    errors.push(categoryError);
  }
  const locationError = validator.locationValidator(locationLost);
  if (locationError) {
    errors.push(locationError);
  }
  const dateError = validator.dateValidator(dateLost);
  if (dateError) {
    errors.push(dateError);
  }
  // return error, if has invalid field, to prevent creation
  if (errors.length !== 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  // prepare data if all fields are valid
  const data = {
    name,
    description,
    category,
    locationLost,
    dateLost: new Date(dateLost),
    userId: req.token,
  };

  try {
    const addedItem = await db.insert(schema.lostItemsTable).values(data);
    res.status(201).json({
      message: "item created successfully",
      addedItem,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      error: "Failed to create item",
      details: "Internal Server Error",
    });
  }
};

module.exports = { create };
