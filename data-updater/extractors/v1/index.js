const fs = require('fs');
const path = require('path');
const fishExtractor = require('./fish');
const insectsExtractor = require('./insects');
const seaCreaturesExtractor = require('./sea-creatures');

const extractors = {
  fish: fishExtractor,
  insects: insectsExtractor,
  'sea-creatures': seaCreaturesExtractor,
};

const dataSet = [
  {
    category: 'insects',
    i18n: 'sheets/insects-i18n.json',
    data: 'sheets/insects.json',
  },
  {
    category: 'fish',
    i18n: 'sheets/fish-i18n.json',
    data: 'sheets/fish.json',
  },
  {
    category: 'sea-creatures',
    i18n: 'sheets/sea-creatures-i18n.json',
    data: 'sheets/sea-creatures.json',
  },
];

const extract = () => {
  dataSet.forEach(set => {
    const dataSrc = fs.readFileSync(path.resolve(__dirname, '../..', set.data));
    const i18nSrc = fs.readFileSync(path.resolve(__dirname, '../..', set.i18n));
    const data = JSON.parse(dataSrc);
    const i18n = JSON.parse(i18nSrc);
    const result = extractors[set.category](data, i18n);
    fs.writeFileSync(
      path.resolve(__dirname, `../../data/v1/${set.category}.json`),
      JSON.stringify(result, null, 2),
    );
  });
};

module.exports = extract;
