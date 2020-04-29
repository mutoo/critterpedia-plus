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

export const initialState = {
  insects: null,
  fish: null,
  collection: {
    fish: {},
    insects: {},
  },
  ui: {
    activeTab: 'Insects',
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
    updateActiveTab(state, action) {
      state.ui.activeTab = action.payload;
    },
  },
});

export const {
  storeCritterpediaData,
  updateActiveTab,
} = critterpediaSlice.actions;

export const { name, reducer } = critterpediaSlice;
