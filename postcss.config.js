const theme = require('./app/theme');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-simple-vars')({
      variables: {
        sm: theme.breakpoints.sm,
        md: theme.breakpoints.md,
        lg: theme.breakpoints.lg,
      },
    }),
  ],
};
