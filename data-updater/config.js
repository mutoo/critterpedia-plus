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

module.exports = {
  SHEETS_TO_FETCH,
};
