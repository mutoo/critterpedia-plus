import { curry } from 'lodash';
import reactGA from 'react-ga';

if (global.siteConfig?.GA) {
  reactGA.initialize(global.siteConfig?.GA, {
    debug: global.siteConfig?.DebugGA,
  });

  reactGA.plugin.require('displayfeatures');

  // track the page loading
  reactGA.pageview(window.location.pathname + window.location.search);
}

export const trackCategoryEvent = curry((category, action, label) => {
  if (global.siteConfig?.GA) {
    reactGA.event({
      category,
      action,
      label,
    });
  }
}, 2);
