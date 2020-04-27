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
import GlobalStyle from '../../global-styles';
import { name, reducer } from './slice';

const App = () => {
  useInjectReducer({ key: name, reducer });
  const location = useLocation();
  const cache = useMemo(() => {
    const { debugCSS } = queryString.parse(location.search);
    const cssEditabledInDevTools =
      debugCSS || process.env.NODE_ENV !== 'production';
    return createCache({ speedy: !cssEditabledInDevTools });
  }, [location]);

  return (
    <CacheProvider value={cache}>
      <Helmet
        titleTemplate="%s | ACNH-Critterpedia"
        defaultTitle="ACNH-Critterpedia"
      >
        <meta name="description" content="" />
      </Helmet>
      <Switch>
        <Redirect exact from="/" to="/all" />
        <Route path="/all" component={CritterpediaPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      {/* the global modals */}
    </CacheProvider>
  );
};

export default hot(App);
