const { parseShadow, parseRarity } = require('../utils');
const commonExtractor = require('./common');

const fishExtractor = (dataRows, i18nRows) =>
  commonExtractor(dataRows, i18nRows, entry => ({
    location: entry['where-how'],
    shadow: parseShadow(entry),
    rarity: parseRarity(entry),
  }));

module.exports = fishExtractor;
