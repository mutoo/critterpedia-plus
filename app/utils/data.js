import { getHours, getMonth } from 'date-fns';
import { acnhapi } from '../configureAxios';

// eslint-disable-next-line no-unused-vars
export const ALL_MONTHS = Array.from({ length: 12 }, _ => true);

export const parseAvailableMonths = (available, hemisphere = 'northern') => {
  if (available?.isAllYear) return ALL_MONTHS;
  const monthsDescription = available?.[`month-${hemisphere}`];
  if (!monthsDescription) return ALL_MONTHS;
  return monthsDescription.split('&').reduce((months, segment) => {
    const newMonths = [...months];
    const [from, to] = segment
      .trim()
      .split('-')
      .map(m => parseInt(m, 10));
    if (!to) {
      newMonths[from - 1] = true;
      return newMonths;
    }
    const normalizedTo = from < to ? to : to + 12;
    Array.from(
      { length: normalizedTo - from + 1 },
      (_, idx) => (from + idx - 1) % 12,
    ).forEach(m => {
      newMonths[m] = true;
    });
    return newMonths;
  }, []);
};

// eslint-disable-next-line no-unused-vars
export const ALL_HOURS = Array.from({ length: 24 }, _ => true);

export const parseAvailableHours = available => {
  if (available?.isAllDay) return ALL_HOURS;
  const hoursDescription = available?.time;
  if (!hoursDescription) return ALL_HOURS;
  return hoursDescription.split('&').reduce((hours, segment) => {
    const newHours = [...hours];
    const [from, to] = segment
      .trim()
      .split(/-|to/)
      .map(part => {
        const trimmed = part.trim();
        const h = parseInt(trimmed, 10);
        if (trimmed.endsWith('am')) {
          return h;
        }
        // pm
        return h + 12;
      });
    if (!to) {
      newHours[from - 1] = true;
      return newHours;
    }
    const normalizedTo = from < to ? to : to + 24;
    Array.from(
      { length: normalizedTo - from + 1 },
      (_, idx) => (from + idx) % 24,
    ).forEach(m => {
      newHours[m] = true;
    });
    return newHours;
  }, []);
};

const AVAILABILITY_LEVEL_NA = 0;
const AVAILABILITY_LEVEL_GLOBAL_MO = 1;
const AVAILABILITY_LEVEL_GLOBAL_NOW = 2;
const AVAILABILITY_LEVEL_MO = 3;
const AVAILABILITY_LEVEL_NOW = 4;

export const calculateAvailability = (available, hemisphere, month, hour) => {
  const now = new Date();
  const theMonth = !month && month !== 0 ? getMonth(now) : month;
  const months = available[`month-${hemisphere}`];
  const theHour = !hour && hour !== 0 ? getHours(now) : hour;
  const hours = available.time;
  if (months[theMonth]) {
    if (hours[theHour]) return AVAILABILITY_LEVEL_NOW;
    return AVAILABILITY_LEVEL_MO;
  }
  const theOtherHemisphere =
    hemisphere === 'northern' ? 'southern' : 'northern';
  const theOtherMonths = available[`month-${theOtherHemisphere}`];
  if (theOtherMonths[theMonth]) {
    if (hours[theHour]) return AVAILABILITY_LEVEL_GLOBAL_NOW;
    return AVAILABILITY_LEVEL_GLOBAL_MO;
  }
  return AVAILABILITY_LEVEL_NA;
};

export const fishImage = id => `${acnhapi.defaults.baseURL}/images/fish/${id}`;
export const insectImage = id =>
  `${acnhapi.defaults.baseURL}/images/bugs/${id}`;
export const fishIcon = id => `${acnhapi.defaults.baseURL}/icons/fish/${id}`;
export const insectIcon = id => `${acnhapi.defaults.baseURL}/icons/bugs/${id}`;
