import { createStructuredSelector } from 'reselect';
import { getHemisphere } from 'containers/App/selectors';
import { getDetailByCategoryAndId } from 'pages/Critterpedia/selectors';
import { name as key } from './slice';

export const getSelected = state => state[key]?.selected;
export const getCategory = state => getSelected(state)?.category;
export const getCollection = state => getSelected(state)?.collection;
export const getId = state => getSelected(state)?.id;
export const getData = state => {
  const category = getCategory(state);
  const id = getId(state);
  if (!category || !id) return null;
  return getDetailByCategoryAndId(category.toLowerCase(), id)(state);
};

export const getNextId = state => {
  const collection = getCollection(state);
  if (!collection) return null;
  const id = getId(state);
  if (!id) return null;
  const idx = collection.findIndex(i => i === id);
  const nextIdx = (idx + 1) % collection.length;
  return collection[nextIdx];
};

export const getPreviousId = state => {
  const collection = getCollection(state);
  if (!collection) return null;
  const id = getId(state);
  if (!id) return null;
  const idx = collection.findIndex(i => i === id);
  const previous = (idx - 1 + collection.length) % collection.length;
  return collection[previous];
};

export default createStructuredSelector({
  isModalCritterDetailOpen: state => !!getData(state),
  category: getCategory,
  data: getData,
  nextId: getNextId,
  prevId: getPreviousId,
  collection: getCollection,
  hemisphere: getHemisphere,
});
