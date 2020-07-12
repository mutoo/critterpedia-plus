import { fork, put } from 'redux-saga/effects';

import { parseAvailableHours, parseAvailableMonths } from 'utils/data';
import { CATEGORY_FISH, CATEGORY_INSECTS, CATEGORY_SEA } from 'utils/const';
import fishData from 'assets/data/fish.json';
import insectsData from 'assets/data/insects.json';
import seaData from 'assets/data/sea.json';
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

const patchFish = fish => {
  if (fish) {
    // eslint-disable-next-line no-param-reassign
    fish.availability.isAllDay = {
      northern: '9-11',
      southern: '3-5',
    };
  }
};

export function* loadCritterpediaDataHandler() {
  const data = {
    fish: fishData.map(transform(CATEGORY_FISH)).sort(sortById),
    insects: insectsData.map(transform(CATEGORY_INSECTS)).sort(sortById),
    sea: seaData.map(transform(CATEGORY_SEA)).sort(sortById),
  };
  // these two fish have special all day rules
  patchFish(data.fish.find(f => f.id === 27));
  patchFish(data.fish.find(f => f.id === 28));
  yield put(storeCritterpediaData(data));
  return data;
}

export default function* critterpediaSaga() {
  yield fork(loadCritterpediaDataHandler);
}
