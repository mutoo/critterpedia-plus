import { createStructuredSelector } from 'reselect';
import { getHemisphere, getLanguage } from 'containers/App/selectors';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
  COLLECTION_NA,
  MODE_DISCOVERY,
} from 'utils/const';
import { name as key } from './slice';

const emptyArray = [];
const emptyObject = {};

export const getFish = state => state[key]?.data[CATEGORY_FISH] || emptyArray;
export const getInsects = state =>
  state[key]?.data[CATEGORY_INSECTS] || emptyArray;
export const getSeaCreatures = state =>
  state[key]?.data[CATEGORY_SEA] || emptyArray;
export const getMode = state => state[key]?.ui.mode || MODE_DISCOVERY;
export const getDetailByCategoryAndId = (category, id) => state =>
  state[key]?.data[category]?.find(i => i.id === id);
export const getSelected = state => state[key]?.ui.selected || emptyObject;
export const getCollectionState = (category, id) => state =>
  state[key]?.collection[category]?.[id] || COLLECTION_NA;
export const getCollectionStatus = category => state =>
  state[key]?.collection[category] || emptyObject;
export const getFilters = state => state[key]?.ui.filters || emptyObject;

export default createStructuredSelector({
  insects: getInsects,
  fish: getFish,
  sea: getSeaCreatures,
  mode: getMode,
  selected: getSelected,
  filters: getFilters,
  language: getLanguage,
  hemisphere: getHemisphere,
});
