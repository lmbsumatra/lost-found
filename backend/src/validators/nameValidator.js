const nameValidator = (name) => {
  if (typeof name !== "string") {
    return "Name is on invalid data type.";
  } else if (!name || name.trim() === "") {
    return "Name is required.";
  } else if (name.length === 255) {
    return "Name is too long.";
  }
  return null;
};
module.exports = nameValidator;
