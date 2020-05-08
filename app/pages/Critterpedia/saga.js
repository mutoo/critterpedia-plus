import { fork, put } from 'redux-saga/effects';

import { parseAvailableHours, parseAvailableMonths } from 'utils/data';
import { CATEGORY_FISH, CATEGORY_INSECTS } from 'utils/const';
import fishData from 'assets/data/fish.json';
import insectsData from 'assets/data/insects.json';
import { storeCritterpediaData } from './slice';

const transform = category => data => ({
  ...data,
  availability: {
    ...data.availability,
    time: parseAvailableHours(data.availability),
    'month-northern': parseAvailableMonths(data.availability, 'northern'),
    'month-southern': parseAvailableMonths(data.availability, 'southern'),
  },
  category,
});

const sortById = (n, m) => n.id - m.id;

export function* loadCritterpediaDataHandler() {
  const data = {
    fish: Object.values(fishData)
      .map(transform(CATEGORY_FISH))
      .sort(sortById),
    insects: Object.values(insectsData)
      .map(transform(CATEGORY_INSECTS))
      .sort(sortById),
  };
  yield put(storeCritterpediaData(data));
  return data;
}

export default function* critterpediaSaga() {
  yield fork(loadCritterpediaDataHandler);
}
