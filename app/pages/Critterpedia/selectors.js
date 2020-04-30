import { createStructuredSelector } from 'reselect';
import { getHemisphere } from 'containers/App/selectors';
import { COLLECTION_NA, MODE_DISCOVERY } from 'utils/const';
import { name as key } from './slice';

const emptyArray = [];
const emptyObject = {};

export const getFish = state => state[key]?.fish || emptyArray;
export const getInsects = state => state[key]?.insects || emptyArray;
export const getActiveTab = state => state[key]?.ui.activeTab || 'Insects';
export const getMode = state => state[key]?.ui.mode || MODE_DISCOVERY;
export const getDetailByCategoryAndId = (category, id) => state =>
  state[key]?.[category]?.find(i => i.id === id);
export const getSelected = state => state[key]?.ui.selected || emptyObject;
export const getCollectionState = (category, id) => state =>
  state[key]?.collection[category]?.[id] || COLLECTION_NA;

export default createStructuredSelector({
  fish: getFish,
  insects: getInsects,
  activeTab: getActiveTab,
  mode: getMode,
  selected: getSelected,
  hemisphere: getHemisphere,
});
