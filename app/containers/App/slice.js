/*
 * ACHN Slice
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

// The initial state of the ReposManager container
export const initialState = {
  config: {
    hemisphere: 'Southern',
  },
};

const ACHNSlice = createSlice({
  name: 'achn',
  initialState,
  reducers: {
    changeHemisphere(state, action) {
      state.config.hemisphere = action.payload;
    },
  },
});

export const { changeHemisphere } = ACHNSlice.actions;

export const { name } = ACHNSlice;
export const reducer = persistReducer(
  {
    key: name,
    storage,
  },
  ACHNSlice.reducer,
);
