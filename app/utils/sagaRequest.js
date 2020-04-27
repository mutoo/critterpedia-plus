import { useState, useEffect, useRef } from 'react';
import { take, call, fork, cancel } from 'redux-saga/effects';
import invariant from 'invariant';
import { store } from '../configureStore';
/**
 * Dispatch the request action to saga and return a promise object.
 * The promise will be resolved or rejected hence we can know the
 * status of request without redux.
 *
 * It's good to keep the temporary status out of redux,
 * so that we don't need to write a lot of reducers/actions to handle that.
 *
 * @param {*} action the request action
 */
export const dispatchSagaRequest = action =>
  new Promise((resolve, reject) => {
    const injectedAction = {
      ...action,
      promise: {
        resolve,
        reject,
      },
    };
    store.dispatch(injectedAction);
  });

/**
 * The Saga Request hook, provides handy dispatch function
 * and the status of the request handled by saga
 */
export const useSagaRequest = () => {
  const initialState = {
    loading: false,
    error: null,
    data: null,
  };
  const [status, setStatus] = useState(initialState);
  // the mounted state indicates if the component is still mounted
  // the status won't be updated for unmounted components.
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );
  // turn into loading status, this will clear the error and data.
  const setLoading = () => {
    if (isMounted.current)
      setStatus({
        loading: true,
        error: null,
        data: null,
      });
  };
  // recieve data, this will also clear the loading and error.
  const setData = data => {
    if (isMounted.current)
      setStatus({
        loading: false,
        error: null,
        data,
      });
    return data;
  };
  // get error, this will also clear the loading and data.
  const setError = error => {
    if (isMounted.current)
      setStatus({
        loading: false,
        data: null,
        error,
      });
    return error;
  };
  // dispatch the action using sagaRequest
  // and link status to the promise chain.
  const dispatch = action => {
    setLoading();
    return dispatchSagaRequest(action).then(setData, setError);
  };
  // reset the status
  const reset = () => {
    setStatus(initialState);
  };
  return { status, reset, dispatch };
};

/**
 * This saga request wrapper handles the promise resovler tranparently
 * with given request handler.
 *
 * @param {*} handler the request handler
 */
export function sagaRequestWrapper(handler) {
  return function* requestHandler(action) {
    invariant(
      action.promise,
      'A saga request action must provide promise handlers',
    );
    const { resolve, reject } = action.promise;
    try {
      const data = yield handler(action);
      yield call(resolve, data);
    } catch (err) {
      yield call(reject, err);
    }
  };
}

/**
 * Watch the request actions and then wrap with promise handler
 */
export const takeEverySagaRequest = (pattern, saga, ...args) =>
  fork(function* requestsHandler() {
    let lastTask;
    while (true) {
      const action = yield take(pattern);
      if (lastTask) {
        yield cancel(lastTask); // cancel is no-op if the task has already terminated
      }
      lastTask = yield fork(sagaRequestWrapper(saga), ...args.concat(action));
    }
  });
