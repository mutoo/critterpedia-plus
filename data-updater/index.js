const fetchSheets = require('./fetch-sheets');
const extractV1 = require('./extractors/v1');

if (process.env.GOOGLE_SHEET_API_KEY) {
  fetchSheets();
} else {
  console.warn(
    'Skip fetching data, since google sheet api key is not set in ENV.',
  );
}

extractV1();
