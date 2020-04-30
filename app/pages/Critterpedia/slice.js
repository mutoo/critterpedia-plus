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
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  CATEGORY_INSECTS,
  COLLECTION_CAUGHT,
  COLLECTION_DONATED,
  COLLECTION_NA,
  MODE_DISCOVERY,
} from 'utils/const';

export const initialState = {
  insects: null,
  fish: null,
  collection: {
    fish: {},
    insects: {},
  },
  ui: {
    activeTab: CATEGORY_INSECTS,
    mode: MODE_DISCOVERY,
    selected: {},
  },
};

const critterpediaSlice = createSlice({
  name: 'critterpedia',
  initialState,
  reducers: {
    storeCritterpediaData(state, action) {
      const { insects, fish } = action.payload;
      state.insects = insects;
      state.fish = fish;
    },
    setActiveTab(state, action) {
      const newTab = action.payload;
      if (newTab !== state.ui.activeTab) {
        state.ui.selected = {};
      }
      state.ui.activeTab = newTab;
    },
    setMode(state, action) {
      state.ui.mode = action.payload;
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
    resetSelected(state) {
      const category = state.ui.activeTab.toLowerCase();
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_NA;
        }
      });
      state.ui.selected = {};
    },
    markSelectedAsCaught(state) {
      const category = state.ui.activeTab.toLowerCase();
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_CAUGHT;
        }
      });
      state.ui.selected = {};
    },
    markSelectedAsDonated(state) {
      const category = state.ui.activeTab.toLowerCase();
      Object.entries(state.ui.selected).forEach(([id, selected]) => {
        if (selected) {
          state.collection[category][id] = COLLECTION_DONATED;
        }
      });
      state.ui.selected = {};
    },
  },
});

export const {
  storeCritterpediaData,
  setActiveTab,
  setMode,
  catchCritter,
  donateCritter,
  toggleCritter,
  resetSelected,
  markSelectedAsCaught,
  markSelectedAsDonated,
} = critterpediaSlice.actions;

export const { name } = critterpediaSlice;

export const reducer = persistReducer(
  {
    key: name,
    storage,
  },
  critterpediaSlice.reducer,
);
