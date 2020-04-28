// eslint-disable-next-line no-unused-vars
export const ALL_MONTHS = Array.from({ length: 12 }, _ => true);

export const parseAvailableMonths = (available, hemisphere = 'northern') => {
  if (available?.isAllYear) return ALL_MONTHS;
  const monthDescription = available?.[`month-${hemisphere}`];
  if (!monthDescription) return ALL_MONTHS;
  return monthDescription.split('&').reduce((months, segment) => {
    const newMonths = [...months];
    const [from, to] = segment.trim().split('-');
    const normalizedTo = from < to ? to : to + 12;
    Array.from(
      { length: normalizedTo - from + 1 },
      (_, idx) => (from + idx) % 12,
    ).forEach(m => {
      newMonths[m] = true;
    });
    return newMonths;
  }, []);
};
