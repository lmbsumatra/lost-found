const passwordValidator = (password) => {
  if (!password || password.trim() === "") {
    return "Password is required.";
  } else if (password.length > 8) {
    return "Password is too long.";
  } else if (password.lenght < 8) {
    return "Password is too short.";
  } else if (typeof password !== "string") {
    return "Password is on invalid data type.";
  }
  return null;
};
module.exports = passwordValidator;
