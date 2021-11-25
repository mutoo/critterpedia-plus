const fetchSheets = require('./fetch-sheets');
const extractV1 = require('./extractors/v1');

if (!process.env.GOOGLE_SHEET_API_KEY) {
  console.error('Abort! google sheet api key is not set in ENV.');
  process.exit(1);
}

fetchSheets();
extractV1();
