import { fork, put } from 'redux-saga/effects';
import { CATEGORY_FISH, CATEGORY_INSECTS, CATEGORY_SEA } from 'utils/const';
import { merge } from 'lodash';
import fishData from '../../../data-updater/data/v1/fish.json';
import insectsData from '../../../data-updater/data/v1/insects.json';
import seaData from '../../../data-updater/data/v1/sea-creatures.json';
import { storeCritterpediaData } from './slice';

const transform = category => data => ({
  ...data,
  category,
});

const sortById = (n, m) => n.id - m.id;

const patchCritter = (entry, patch) => {
  if (entry) {
    // eslint-disable-next-line no-param-reassign
    merge(entry, patch);
  }
};

export function* loadCritterpediaDataHandler() {
  const data = {
    fish: fishData.map(transform(CATEGORY_FISH)).sort(sortById),
    insects: insectsData.map(transform(CATEGORY_INSECTS)).sort(sortById),
    sea: seaData.map(transform(CATEGORY_SEA)).sort(sortById),
  };
  // these two fish have special all day rules
  patchCritter(
    data.fish.find(f => f.id === 27),
    {
      availability: {
        isAllDay: {
          northern: '9-11',
          southern: '3-5',
        },
      },
    },
  );
  patchCritter(
    data.fish.find(f => f.id === 28),
    {
      availability: {
        isAllDay: {
          northern: '9-11',
          southern: '3-5',
        },
      },
    },
  );
  // cicada shell is rare, but it sells cheap :(
  patchCritter(
    data.insects.find(i => i.id === 31),
    {
      rarity: 'Rare',
    },
  );
  yield put(storeCritterpediaData(data));
  return data;
}

export default function* critterpediaSaga() {
  yield fork(loadCritterpediaDataHandler);
}
