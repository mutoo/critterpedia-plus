/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import CritterpediaPage from 'pages/Critterpedia/loadable';
import NotFoundPage from 'pages/404';
import { useInjectReducer } from 'redux-injectors';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import queryString from 'query-string';
import GlobalStyle from 'containers/GlobalStyles';
import {
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
} from 'utils/const';
import { name, reducer } from './slice';

const App = () => {
  useInjectReducer({ key: name, reducer });
  const location = useLocation();
  const cache = useMemo(() => {
    const { debugCSS } = queryString.parse(location.search);
    const cssEditabledInDevTools =
      debugCSS || process.env.NODE_ENV !== 'production';
    return createCache({ speedy: !cssEditabledInDevTools });
  }, []);

  return (
    <CacheProvider value={cache}>
      <Helmet titleTemplate="%s | ACNH" defaultTitle="ACNH">
        <meta name="description" content="" />
      </Helmet>
      <Switch>
        <Redirect
          exact
          from="/"
          to={`/${MODE_DISCOVERY}/${CATEGORY_INSECTS}`}
        />
        <Route
          path={`/:mode(${MODE_COLLECTION}|${MODE_DISCOVERY}|${MODE_ALL})/:category(${CATEGORY_FISH}|${CATEGORY_INSECTS}|${CATEGORY_SEA})`}
          component={CritterpediaPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      {/* the global modals */}
      <GlobalStyle />
    </CacheProvider>
  );
};

export default hot(App);
