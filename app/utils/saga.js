import { delay } from 'redux-saga/effects';

export const simulateDelay = () => delay(global.siteConfig?.DimulateDelay || 0);
