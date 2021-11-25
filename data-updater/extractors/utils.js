const normalizeHeader = key => {
  switch (key) {
    case '#':
      return 'id';
    // keep raw
    case 'USen':
    case 'EUen':
    case 'EUde':
    case 'EUes':
    case 'USes':
    case 'EUfr':
    case 'USfr':
    case 'EUit':
    case 'EUnl':
    case 'CNzh':
    case 'TWzh':
    case 'JPja':
    case 'KRko':
    case 'EUru':
      return key;
    default:
      // to snake case:
      return key
        .toLowerCase()
        .split(/[ /]/)
        .join('-');
  }
};

const normalizeValue = value => {
  switch (value.toLowerCase()) {
    case 'no':
      return false;
    case 'yes':
      return true;
    case 'na':
      return null;
    default:
      if (value.startsWith('=IMAGE("')) {
        // handle image field
        const maybeUrl = /^=IMAGE\("(.*?)"\)$/.exec(value);
        return (maybeUrl && maybeUrl[1]) || null;
      }
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(value)) {
        return parseFloat(value);
      }
      return value;
  }
};

const rowsToArray = ([header, ...rows]) => {
  const normalizedHeader = header.map(normalizeHeader);
  return rows.map(row =>
    row.reduce((item, value, idx) => {
      const key = normalizedHeader[idx];
      if (!key) return item;
      return {
        ...item,
        [key]: typeof value === 'string' ? normalizeValue(value) : value,
      };
    }, {}),
  );
};

const MONTHS_KEY = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const MONTHS_KEY_NORTHERN = MONTHS_KEY.map(mo => `nh-${mo}`);
const MONTHS_KEY_SOUTHERN = MONTHS_KEY.map(mo => `sh-${mo}`);

const parseAvailableMonths = (entry, hemi) => {
  const selectedMonths =
    hemi === 'nh' ? MONTHS_KEY_NORTHERN : MONTHS_KEY_SOUTHERN;
  const months = Array.from({ length: 12 }, () => 0); // 12 zeros
  selectedMonths.forEach((mo, idx) => {
    if (entry[mo]) months[idx] = 1;
  });
  return months;
};

const getFirstTimeString = entry =>
  entry[MONTHS_KEY_NORTHERN.find(mo => entry[mo] !== null)];

const parseAvailableHours = timeString => {
  if (timeString.toLowerCase() === 'all day') {
    return undefined;
  }
  const hours = Array.from({ length: 24 }, () => 0); // 24 zeros
  // a time string may contains multiple time description, e.g. "4 AM - 8 PM; 4 PM - 7 AM"
  timeString.split(/;\s?/).forEach(timeDesc => {
    // read "7 AM - 4 PM" or "7 PM - 8 AM",
    // and set 1 in hours array
    // eslint-disable-next-line prefer-const
    let [from, to] = timeDesc
      .split(/[-–]/)
      .map(td => td.trim().toLowerCase())
      .map(td => {
        const h = Number.parseInt(td, 10);
        // translate 0 am - 11 am, 12 pm - 11 pm to 24-hour
        return td.endsWith('am') || h === 12 ? h : h + 12;
      });
    // is single hour value possible? e.g. "12 PM"
    if (!to) {
      to = from + 1;
    }
    // if cross midnight, move to next day
    if (to < from) {
      to += 24;
    }
    // set available hours
    // N.B. the end hour is exclusive: [a-b)
    for (let h = from; h < to; h += 1) {
      hours[h % 24] = 1;
    }
  });
  return hours;
};

const parseAvailability = entry => {
  // if all months are not null, then it's all year entry
  const isAllYear = !MONTHS_KEY_NORTHERN.some(mo => entry[mo] === null);
  // if all day was found in a certain month, then it's all day entry
  const isAllDay = MONTHS_KEY_NORTHERN.some(
    mo => entry[mo] && entry[mo].toLowerCase() === 'all day',
  );
  const time = parseAvailableHours(getFirstTimeString(entry));
  const monthNorthern = !isAllYear ? parseAvailableMonths(entry, 'nh') : null;
  const monthSouthern = !isAllYear ? parseAvailableMonths(entry, 'sh') : null;
  return {
    isAllYear,
    isAllDay,
    time,
    'month-northern': monthNorthern,
    'month-southern': monthSouthern,
  };
};

const parseShadow = () => null;

const RARITY_PRICE = [0, 1000, 8000, 12000];

const RARITY_LABEL = ['Common', 'Uncommon', 'Rare', 'Ultra-rare'];

const parseRarity = entry => {
  let rarityLevel = 0;
  while (entry.sell >= RARITY_PRICE[rarityLevel + 1]) {
    rarityLevel += 1;
  }
  return RARITY_LABEL[rarityLevel];
};

module.exports = {
  normalizeHeader,
  normalizeValue,
  rowsToArray,
  parseAvailability,
  parseShadow,
  parseRarity,
};
