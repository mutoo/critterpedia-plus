import { toLower } from 'lodash';

export const isEqualCaseInsensive = (str1, str2) =>
  // N.B. toLower(undefined) === ''
  toLower(str1) === toLower(str2);
