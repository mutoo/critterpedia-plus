const commonExtractor = require('./common');

const parseShadow = entry => {
  let size;
  let number;
  switch (entry.shadow.toLowerCase()) {
    case 'long':
      return 'Narrow';
    case 'x-small':
      return 'Smallest (1)';
    case 'small':
      return 'Small (2)';
    case 'medium':
      return 'Medium (3)';
    case 'large':
      size = 'Medium';
    // eslint-disable-next-line no-fallthrough
    case 'x-large':
      size = 'Large';
      switch (entry.vision.toLowerCase()) {
        case 'wide':
        case 'very wide':
          number = 5;
          break;
        default:
          number = 4;
      }
      return `${size} (${number})`;
    case 'xx-large':
      return 'Largest (6)';
    case 'x-large w/fin':
      return 'Largest with fin (6)';
    default:
      return null;
  }
};

const fishExtractor = (dataRows, i18nRows) =>
  commonExtractor(dataRows, i18nRows, entry => ({
    location: entry['where-how'],
    shadow: parseShadow(entry),
  }));

module.exports = fishExtractor;
