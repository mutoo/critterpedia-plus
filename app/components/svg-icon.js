import React, { createElement, Suspense, lazy, memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

// create a dynamic require helper that loads all icons into a chunk
const requireSvgIcon = require.context('assets/icons', true, /\.svg$/, 'lazy');

const SvgIcon = ({ icon, inline, ...props }) => (
  <Suspense fallback={<Box {...props} />}>
    <Box
      sx={{
        display: inline ? 'inline-block' : 'block',
        '& > svg': {
          position: 'relative',
          top: inline ? '0.25ex' : '0',
          width: '1em',
          height: '1em',
          display: 'block',
        },
      }}
      {...props}
    >
      {createElement(
        lazy(() =>
          requireSvgIcon(`./${icon}${icon.endsWith('.svg') ? '' : '.svg'}`),
        ),
      )}
    </Box>
  </Suspense>
);

SvgIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};

export default memo(SvgIcon);
