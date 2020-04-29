/*
 * ModalCritterDetail Slice
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
  selected: null,
};

const modalCritterDetailSlice = createSlice({
  name: 'critterDetail',
  initialState,
  reducers: {
    openCritterDetail(state, action) {
      const { category, id, collection } = action.payload;
      state.selected = { category, id, collection };
    },
    closeCritterDetail(state) {
      state.selected = null;
    },
  },
});

export const {
  openCritterDetail,
  closeCritterDetail,
} = modalCritterDetailSlice.actions;

export const { name, reducer } = modalCritterDetailSlice;
