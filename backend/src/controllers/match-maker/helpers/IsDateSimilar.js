const moment = require("moment/moment");

const IsDateSimilar = (date1, date2, thresholdDays = 3, maxDays = 365) => {
  if (
    date1 === null ||
    date1 === undefined ||
    !(date1 instanceof Date) ||
    date2 === null ||
    date2 === undefined ||
    !(date2 instanceof Date)
  ) {
    return 0;
  }

  // moment turns dates into date objects to be able to manipulate easily
  // Math.abs(().diff(), "days") allows to find the difference between to dates by counting the "days"
  const diff = Math.abs(moment(date1).diff(moment(date2), "days"));

  // if diff(number of days between dates), if less than or equal to thresholdDay, return 100
  if (diff <= thresholdDays) {
    return 100; // multiplied to 0.2 to make scale 0 to 20 like in similarityjs
  }

  // if diff is more than 365 or 1 year, return 0
  if (diff >= maxDays) {
    return 0;
  }
  // else compute the number of diff divided by maxDays
  const percent = Math.max(0, 100 - (diff / maxDays) * 100); // e.g. lowest possible is 0, 100 - (180 / 365) * 100
  return percent; // multiplied to 0.2 to make scale 0 to 20 like in similarityjs
};

module.exports = IsDateSimilar;
