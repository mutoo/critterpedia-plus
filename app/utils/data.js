import { getHours, getMonth } from 'date-fns';

export const ALL_MONTHS = Array.from({ length: 12 }, () => 1);

export const ALL_HOURS = Array.from({ length: 24 }, () => 1);

const AVAILABILITY_LEVEL_NA = 0;
const AVAILABILITY_LEVEL_GLOBAL_MO = 1;
const AVAILABILITY_LEVEL_GLOBAL_NOW = 2;
const AVAILABILITY_LEVEL_MO = 3;
const AVAILABILITY_LEVEL_NOW = 4;

export const getAvailableHours = (available, hemisphere, month) => {
  if (available.isAllDay === true) return ALL_HOURS;
  // fish: 27/28 has special rule
  const allDayInMonths = available.isAllDay?.[hemisphere];
  if (allDayInMonths) {
    const now = new Date();
    const theMonth = !month && month !== 0 ? getMonth(now) : month;
    const [start, end] = allDayInMonths.split('-');
    const from = parseInt(start, 10) - 1;
    const to = parseInt(end, 10) - 1;
    if (from <= theMonth && theMonth <= to) return ALL_HOURS;
  }
  return available.time;
};

export const isAvailableNow = (available, hemisphere, month, hour) => {
  const hours = getAvailableHours(available, hemisphere, month);
  return hours[hour];
};

export const calculateAvailability = (available, hemisphere, month, hour) => {
  const now = new Date();
  const theMonth = !month && month !== 0 ? getMonth(now) : month;
  const months = available[`month-${hemisphere}`] || ALL_MONTHS;
  const theHour = !hour && hour !== 0 ? getHours(now) : hour;
  if (months[theMonth]) {
    if (isAvailableNow(available, hemisphere, theMonth, theHour))
      return AVAILABILITY_LEVEL_NOW;
    return AVAILABILITY_LEVEL_MO;
  }
  const theOtherHemisphere =
    hemisphere === 'northern' ? 'southern' : 'northern';
  const theOtherMonths = available[`month-${theOtherHemisphere}`] || ALL_MONTHS;
  if (theOtherMonths[theMonth]) {
    if (isAvailableNow(available, theOtherHemisphere, theMonth, theHour))
      return AVAILABILITY_LEVEL_GLOBAL_NOW;
    return AVAILABILITY_LEVEL_GLOBAL_MO;
  }
  return AVAILABILITY_LEVEL_NA;
};

export const fishImage = entry => entry['image-uri'];
export const insectImage = entry => entry['image-uri'];
export const seaImage = entry => entry['image-uri'];
export const fishIcon = entry => entry['icon-uri'];
export const insectIcon = entry => entry['icon-uri'];
export const seaIcon = entry => entry['icon-uri'];
