import { name as key } from './slice';
export const getHemisphere = state => state[key]?.config.hemisphere;
