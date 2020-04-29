import { createStructuredSelector } from 'reselect';
import { getHemisphere } from 'containers/App/selectors';
import { name as key } from './slice';

const emptyArray = [];
export const selectFish = state => state[key]?.fish || emptyArray;
export const selectInsects = state => state[key]?.insects || emptyArray;
export const selectActiveTab = state => state[key]?.ui.activeTab || 'Insects';
export const getDetailByCategoryAndId = (category, id) => state =>
  state[key]?.[category]?.find(i => i.id === id);

export default createStructuredSelector({
  fish: selectFish,
  insects: selectInsects,
  activeTab: selectActiveTab,
  hemisphere: getHemisphere,
});
