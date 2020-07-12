/*
 * Critterpedia Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { createSlice } from '@reduxjs/toolkit';
import { createMigrate, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  COLLECTION_CAUGHT,
  COLLECTION_DONATED,
  COLLECTION_NA,
  CATEGORY_INSECTS,
  CATEGORY_FISH,
  CATEGORY_SEA,
} from 'utils/const';
import produce from 'immer';

export const initialState = {
  data: {
    [CATEGORY_INSECTS]: null,
    [CATEGORY_FISH]: null,
    [CATEGORY_SEA]: null,
  },
  collection: {
    [CATEGORY_FISH]: {},
    [CATEGORY_INSECTS]: {},
    [CATEGORY_SEA]: {},
  },
  ui: {
    filters: {
      month: null,
      hour: null,
    },
    selected: {},
  },
};

const critterpediaSlice = createSlice({
  name: 'critterpedia',
  initialState,
  reducers: {
    storeCritterpediaData(state, action) {
      const { insects, fish, sea } = action.payload;
      state.data = {
        [CATEGORY_FISH]: fish,
        [CATEGORY_INSECTS]: insects,
        [CATEGORY_SEA]: sea,
      };
    },
    catchCritter(state, action) {
      const { category, id } = action.payload;
      const cat = state.collection[category];
      if (cat) {
        cat[id] = COLLECTION_CAUGHT;
      }
    },
    donateCritter(state, action) {
      const { category, id } = action.payload;
      const cat = state.collection[category];
      if (cat) {
        cat[id] = COLLECTION_DONATED;
      }
    },
    toggleCritter(state, action) {
      const { id, selected } = action.payload;
      state.ui.selected[id] = selected;
    },
    resetSelected(state, action) {
      const { category } = action.payload;
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_NA;
        }
      });
      state.ui.selected = {};
    },
    markSelectedAsCaught(state, action) {
      const { category } = action.payload;
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_CAUGHT;
        }
      });
      state.ui.selected = {};
    },
    markSelectedAsDonated(state, action) {
      const { category } = action.payload;
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_DONATED;
        }
      });
      state.ui.selected = {};
    },
    clearSelected(state) {
      state.ui.selected = {};
    },
    updateFilterMonth(state, action) {
      state.ui.filters.month = action.payload;
    },
    updateFilterHour(state, action) {
      state.ui.filters.hour = action.payload;
    },
  },
});

export const {
  storeCritterpediaData,
  toggleCritter,
  resetSelected,
  markSelectedAsCaught,
  markSelectedAsDonated,
  clearSelected,
  updateFilterMonth,
  updateFilterHour,
} = critterpediaSlice.actions;

export const { name } = critterpediaSlice;

export const reducer = persistReducer(
  {
    key: name,
    version: 1,
    storage,
    blacklist: ['data', 'ui'],
    migrate: createMigrate(
      {
        1: state =>
          produce(state, draft => {
            // add sea creature collection
            if (!draft.collection[CATEGORY_SEA]) {
              draft.collection[CATEGORY_SEA] = {};
            }
          }),
      },
      { debug: false },
    ),
  },
  critterpediaSlice.reducer,
);
