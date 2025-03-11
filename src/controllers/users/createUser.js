const { db, schema } = require("../../constants");
const validator = require("../../validators");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const create = async (req, res) => {
  const requiredFields = ["name", "email", "phone", "password"];
  const { name, email, phone, password } = req.body;

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
  const emailError = validator.emailValidator(email);
  if (emailError) {
    errors.push(emailError);
  }
  const passwordError = validator.passwordValidator(password);
  if (passwordError) {
    errors.push(passwordError);
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
    email,
    phone,
    password: await bcrypt.hash(password, saltRounds), // hash password before creation
  };

  try {
    const addedUser = await db.insert(schema.usersTable).values(data);
    res.status(201).json({
      message: "User created successfully",
      addedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: "Internal Server Error",
    });
  }
};

module.exports = { create };
