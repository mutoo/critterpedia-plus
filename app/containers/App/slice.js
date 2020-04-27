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

// The initial state of the ReposManager container
export const initialState = {};

const ACHNSlice = createSlice({
  name: 'achn',
  initialState,
  reducers: {},
});

// export const {} = ACHNSlice.actions;

export const { name, reducer } = ACHNSlice;
