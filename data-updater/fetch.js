const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const ACNH_ITEM_SHEET_ID = '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4';
const ACNH_I18N_SHEET_ID = '1MMbsvDfu59OY9YBEAfHhFJ6O8vRTllNFgMrX7RBZuyI';

const SHEETS_TO_FETCH = [
  {
    id: ACNH_ITEM_SHEET_ID,
    name: 'Insects',
    output: 'sheets/insects.json',
  },
  {
    id: ACNH_ITEM_SHEET_ID,
    name: 'Fish',
    output: 'sheets/fish.json',
  },
  {
    id: ACNH_ITEM_SHEET_ID,
    name: 'Sea Creatures',
    output: 'sheets/sea-creatures.json',
  },
  {
    id: ACNH_I18N_SHEET_ID,
    name: 'Bugs',
    output: 'sheets/insects-i18n.json',
  },
  {
    id: ACNH_I18N_SHEET_ID,
    name: 'Fish',
    output: 'sheets/fish-i18n.json',
  },
  {
    id: ACNH_I18N_SHEET_ID,
    name: 'Sea Creatures',
    output: 'sheets/sea-creatures-i18n.json',
  },
];

const sheets = google.sheets({ version: 'v4' });

const fetch = () => {
  const sheetsToFetch = SHEETS_TO_FETCH.map(sheetToFetch =>
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetToFetch.id,
      range: sheetToFetch.name,
      valueRenderOption: 'FORMULA', // enable image value: =IMAGE("url")
      key: process.env.GOOGLE_SHEET_API_KEY,
    }),
  );
  return Promise.allSettled(sheetsToFetch).then(results => {
    results.forEach((result, i) => {
      const sheetToFetch = SHEETS_TO_FETCH[i];
      switch (result.status) {
        case 'fulfilled':
          fs.writeFileSync(
            path.resolve(__dirname, sheetToFetch.output),
            JSON.stringify(result.value.data.values, null, 2),
          );
          console.info(`${sheetToFetch.output} is generated`);
          break;
        case 'rejected':
          console.warn(
            `Fail to generate ${sheetToFetch.output}. ${result.reason}`,
          );
          break;
        default:
      }
    });
  });
};

module.exports = {
  SHEETS_TO_FETCH,
  fetch,
};
