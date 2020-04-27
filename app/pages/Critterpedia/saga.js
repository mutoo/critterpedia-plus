import { fork, call, put } from 'redux-saga/effects';

import { storeCritterpediaData } from './slice';
import { acnhapi } from '../../configureAxios';

export function* loadCritterpediaDataHandler() {
  const fish = yield call(acnhapi.get, '/fish');
  const insects = yield call(acnhapi.get, '/bugs');
  const data = {
    fish: Object.values(fish?.data).sort((n, m) => n.id - m.id),
    insects: Object.values(insects?.data).sort((n, m) => n.id - m.id),
  };
  yield put(storeCritterpediaData(data));
  return data;
}

export default function* critterpediaSaga() {
  yield fork(loadCritterpediaDataHandler);
}
