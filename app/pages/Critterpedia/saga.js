import { fork, call, put } from 'redux-saga/effects';

import { parseAvailableHours, parseAvailableMonths } from 'utils/data';
import { CATEGORY_FISH, CATEGORY_INSECTS } from 'utils/const';
import { storeCritterpediaData } from './slice';
import { acnhapi } from '../../configureAxios';

const transform = category => data => ({
  ...data,
  availability: {
    ...data.availability,
    time: parseAvailableHours(data.availability),
    'month-northern': parseAvailableMonths(data.availability, 'northern'),
    'month-southern': parseAvailableMonths(data.availability, 'southern'),
    isAllYear: undefined,
    isAllDay: undefined,
  },
  category,
});

const sortById = (n, m) => n.id - m.id;

export function* loadCritterpediaDataHandler() {
  const fish = yield call(acnhapi.get, '/fish');
  const insects = yield call(acnhapi.get, '/bugs');
  const data = {
    fish: Object.values(fish?.data)
      .map(transform(CATEGORY_FISH))
      .sort(sortById),
    insects: Object.values(insects?.data)
      .map(transform(CATEGORY_INSECTS))
      .sort(sortById),
  };
  yield put(storeCritterpediaData(data));
  return data;
}

export default function* critterpediaSaga() {
  yield fork(loadCritterpediaDataHandler);
}
