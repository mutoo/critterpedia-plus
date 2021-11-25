const commonExtractor = require('./common');

const fishExtractor = (dataRows, i18nRows) =>
  commonExtractor(dataRows, i18nRows, entry => ({
    shadow: entry.shadow,
    speed: entry['movement-speed'],
  }));

module.exports = fishExtractor;
