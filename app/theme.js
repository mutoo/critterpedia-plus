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
};

const variants = {
  link: {},
  button: {},
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
