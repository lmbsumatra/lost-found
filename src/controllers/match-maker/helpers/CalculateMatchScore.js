const { similarity, leven } = require("@nlpjs/similarity");
const IsDateSimilar = require("./IsDateSimilar");
const moment = require("moment");

const CalculateMatchScore = async (lostItem, foundItem) => {
  const checkEmpty = (value) => {
    return value === null || value === "" || value === undefined;
  };

  const normalizeScore = (score) => {
    const maxScore = 100;
    const normalized = 100 - (score / maxScore) * 100;
    return Math.min(Math.max(normalized, 0), 100);
  };

  // Name similarity
  const nameSimilarity =
    checkEmpty(lostItem.name) || checkEmpty(foundItem.name)
      ? 0
      : normalizeScore(similarity(lostItem.name, foundItem.name));

  // Date handling
  const date1 = moment(lostItem.dateLost).isValid()
    ? moment(lostItem.dateLost).toDate()
    : null;
  const date2 = moment(foundItem.dateFound).isValid()
    ? moment(foundItem.dateFound).toDate()
    : null;

  // Date similarity
  const dateSimilarity =
    checkEmpty(date1) || checkEmpty(date2) ? 0 : IsDateSimilar(date1, date2);
  // Ensure dateSimilarity is valid
  if (isNaN(dateSimilarity)) dateSimilarity = 0;

  // Description similarity
  const lostItemDesc = lostItem.description;
  const foundItemDesc = foundItem.description;
  const descriptionSimilarity =
    checkEmpty(lostItemDesc) || checkEmpty(foundItemDesc)
      ? 0
      : normalizeScore(similarity(lostItemDesc, foundItemDesc));

  // Category similarity
  const categorySimilarity =
    checkEmpty(lostItem.category) || checkEmpty(foundItem.category)
      ? 0
      : normalizeScore(similarity(lostItem.category, foundItem.category));

  // Location similarity
  const location1 = lostItem.locationLost;
  const location2 = foundItem.locationFound;
  const locationSimilarity =
    checkEmpty(lostItem.locationLost) || checkEmpty(foundItem.locationFound)
      ? 0
      : normalizeScore(similarity(location1, location2));

  const totalScore =
    nameSimilarity * 0.3 +
    descriptionSimilarity * 0.3 +
    locationSimilarity * 0.2 +
    dateSimilarity * 0.1 +
    categorySimilarity * 0.1;
  return totalScore.toFixed(2);
};

module.exports = CalculateMatchScore;
