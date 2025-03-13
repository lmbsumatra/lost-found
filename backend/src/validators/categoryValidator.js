const categories = [
  "Others",
  "Personal",
  "Electronics",
  "Gadgets",
  "Documents",
  "ID",
  "Wearables",
  "Accessories",
  "Clothing",
  "School Materials",
];
const categoryValidator = (category) => {
  if (!category || category.trim() === "") {
    return "Category is required";
  } else if (!categories.includes(category)) {
    return "Invalid category.";
  }

  return null;
};

module.exports = categoryValidator;
