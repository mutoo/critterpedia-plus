const commonExtractor = require('./common');

const insectsExtractor = (dataRows, i18nRows) =>
  commonExtractor(dataRows, i18nRows, entry => ({
    location: entry['where-how'],
  }));

module.exports = insectsExtractor;
