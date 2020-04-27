// The Styled System theme object is intended to be a general purpose format
// for storing design system style values and scales.
//
// https://styled-system.com/theme-specification/
// https://system-ui.com/theme/

/* eslint-disable prefer-destructuring */

const breakpoints = ['40em', '52em', '64em'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];

const space = [0, 4, 8, 16, 32];
space.zero = space[0];
space.sm = space[1];
space.md = space[2];
space.lg = space[3];

const sizes = [0, 32, 64];
sizes.avatar = 32;
sizes.silk = 32;

const fontSizes = [10, 12, 14, 16, 20, 30];
fontSizes.sm = fontSizes[0];
fontSizes.body = fontSizes[1];
fontSizes.lg = fontSizes[2];
fontSizes.h5 = fontSizes[1];
fontSizes.h4 = fontSizes[2];
fontSizes.h3 = fontSizes[3];
fontSizes.h2 = fontSizes[4];
fontSizes.h1 = fontSizes[5];

const fonts = {
  roboto: "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  circular: "Circular, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  icon: 'racing20',
};
fonts.body = fonts.roboto;
fonts.heading = fonts.circular;
fonts.link = fonts.circular;

const fontWeights = {
  body: 400,
  bold: 700,
  heading: 700,
  black: 900,
};
const colors = {
  // black white grey
  black: 'black',
  white: 'white',
  'grey-f1': '#f1f1f1',
  'grey-de': '#dedede',
  'grey-99': '#999999',
  'grey-66': '#666666',
  'grey-4f': '#4f4f4f',
  'grey-33': '#333333',
  // general colors
  primary: '#ed1c24',
  offWhite: '#faf9f7',
  purple: '#71668d',
  green: '#80c88d',
  blue: '#5181ac',
  orange: '#f2622e',
  text: '#333333',
  src: '#ab3933',
  beteasy: '#8935c0',
  speedmap: {
    light: '#46AE44',
    dark: '#40A242',
  },
  link: {
    normal: '#333333',
    active: '#ed1c24',
  },
  // meeting
  meeting: {
    metro: '#006da6',
    country: '#91c039',
  },
  // message colors
  message: {
    dark: {
      error: '#e06158',
      success: '#4ba000',
    },
    light: {
      error: '#ffeeee',
      success: '#f5fae5',
    },
  },
  // clubs colors
  clubs: {
    crv: '#008542',
    vrc: '#201547',
    mvrc: '#ffc032',
    prc: '#c7982c',
    mrc: '#ccbb7b',
  },
  // bets
  bets: {
    BEST_BET: '#ED1C24',
    NEXT_BEST: '#046DA6',
    BEST_ROUGHIE: '#F96234',
    BEST_VALUE: '#91C039',
  },
  // indicator
  indicator: {
    positive: '#91C039',
    negetive: '#ED1C24',
  },
};

const variants = {
  link: {},
  button: {
    normal: {
      padding: 'md',
      border: '1px solid',
      borderColor: 'grey-99',
      fontSize: 'body',
      color: 'grey-99',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        borderColor: 'grey-66',
        color: 'grey-66',
      },
    },
    icon: {
      cursor: 'pointer',
      border: 'none',
      p: 'sm',
    },
  },
};

// use old module.exports for postcss config here
module.exports = {
  breakpoints,
  space,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  colors,
  variants,
};
