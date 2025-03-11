const { formatInTimeZone, toZonedTime } = require("date-fns-tz");

const dateValidator = (date) => {
  date = new Date(date);

  if (!date || isNaN(date.getTime())) {
    return "Invalid date.";
  }

  const dateNow = new Date();

  if (date > dateNow) {
    return "Future date is snot allowed.";
  }

  return null;
};

module.exports = dateValidator;
