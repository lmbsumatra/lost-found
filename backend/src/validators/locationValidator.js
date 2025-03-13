const locationValidator = (location) => {
    if (!location || location.trim() === "") {
      return "Location is required.";
    } else if (location.length === 255) {
      return "Location is too long.";
    } else if (typeof location !== "string") {
      return "Location is on invalid data type.";
    }
    return null
  };
  module.exports = locationValidator;
  