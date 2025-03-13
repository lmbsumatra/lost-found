const { db, schema } = require("../../constants");
const validator = require("../../validators");
const validate = require("../../validators/validate");
const create = async (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "category",
    "locationLost",
    "dateLost",
  ];
  const { name, description, category, locationLost, dateLost } = req.body;
  const userId = req.token;

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
  const validationErrors = await validate(
    { name, userId, description, category, locationLost, dateLost },
    validator.lostItemValidation
  );

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Found item validation has failed",
      details: validationErrors,
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
