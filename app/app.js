/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { PersistGate } from 'redux-persist/integration/react';
// import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';

// Import root app
import App from 'containers/App';
import ReactModal from 'react-modal';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./assets/images/favicon.png';
// eslint-disable-next-line import/extensions
import 'file-loader?name=.htaccess!./.htaccess';

import { HelmetProvider } from 'react-helmet-async';
import { persistor, store } from './configureStore';
import './configureGA';

// Theme
import theme from './theme';

const MOUNT_NODE = document.getElementById('app');
ReactModal.setAppElement(MOUNT_NODE);

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </PersistGate>,
  MOUNT_NODE,
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
// require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
