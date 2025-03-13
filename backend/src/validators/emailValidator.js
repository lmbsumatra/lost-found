const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailValidator = (email) => {
  if (!email || email.trim() === "") {
    return "Email address is required";
  } else if (!emailRegex.test(email)) {
    return "Invalid email address.";
  }
  return null;
};

module.exports = emailValidator;
