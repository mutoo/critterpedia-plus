/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import history from 'utils/history';
import createReducer from './reducers';

// eslint-disable-next-line no-shadow
export default function configureAppStore(initialState = {}, history) {
  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false, // for sagaRequest passing promise in actions
      }),
      ...middlewares,
    ],
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}

// Create redux store with history
const initialState = {};
export const store = configureAppStore(initialState, history);
