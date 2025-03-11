const descriptionValidator = (description) => {
  if (!description || description.trim() === "") {
    return "Description is required.";
  } else if (typeof description !== "string") {
    return "Description is on invalid data type.";
  }
  return null;
};
module.exports = descriptionValidator;
