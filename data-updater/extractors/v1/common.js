const { rowsToArray, parseAvailability } = require('../utils');

const commonExtractor = (dataRows, i18nRows, extraFields) => {
  const data = rowsToArray(dataRows);
  const i18n = rowsToArray(i18nRows);
  return data
    .map(entry => {
      const internalId = entry['internal-id'];
      const i18nEntry = i18n.find(
        i => Number.parseInt(i.id.split('_')[1], 10) === internalId,
      );
      return {
        id: entry.id,
        filename: entry.name.split(' ').join('_'),
        names: { ...i18nEntry, id: undefined },
        availability: parseAvailability(entry),
        price: entry.sell,
        'catch-phrase': entry['catch-phrase'],
        'museum-phrase': entry.description,
        'image-uri': entry['critterpedia-image'],
        'icon-uri': entry['icon-image'],
        ...(extraFields ? extraFields(entry) : {}),
      };
    })
    .sort((n, m) => n.id - m.id);
};

module.exports = commonExtractor;
