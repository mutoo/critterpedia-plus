const { parseShadow, parseRarity } = require('../utils');
const commonExtractor = require('./common');

const fishExtractor = (dataRows, i18nRows) =>
  commonExtractor(dataRows, i18nRows, entry => ({
    shadow: parseShadow(entry),
    speed: entry['movement-speed'],
    rarity: parseRarity(entry),
  }));

module.exports = fishExtractor;
