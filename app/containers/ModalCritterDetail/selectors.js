import { createStructuredSelector } from 'reselect';
import { name as key } from './slice';
import { getDetailByCategoryAndId } from '../../pages/Critterpedia/selectors';

export const getSelected = state => state[key]?.selected;
export const getCategory = state => getSelected(state)?.category;
export const getId = state => getSelected(state)?.id;
export const getData = state => {
  const category = getCategory(state);
  const id = getId(state);
  if (!category || !id) return null;
  return getDetailByCategoryAndId(category.toLowerCase(), id)(state);
};

export default createStructuredSelector({
  isModalCritterDetailOpen: state => !!getData(state),
  category: getCategory,
  data: getData,
});
