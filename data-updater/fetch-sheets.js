const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { SHEETS_TO_FETCH } = require('./config');

const fetchSheets = () => {
  const sheets = google.sheets({ version: 'v4' });
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

module.exports = fetchSheets();
