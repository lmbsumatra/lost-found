const nameValidator = (name) => {
  if (!name || name.trim() === "") {
    return "Name is required.";
  } else if (name.length === 255) {
    return "Name is too long.";
  } else if (typeof name !== "string") {
    return "Name is on invalid data type.";
  }
  return null
};
module.exports = nameValidator;
