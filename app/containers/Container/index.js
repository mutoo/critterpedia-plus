import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';

/**
 * The container is a responsive fixed-width div.
 * It just works like the classical bootstrap `.container`
 */
export const Container = ({ maxWidth = '1320px', ...props }) => (
  <Box
    className="acnh-container"
    sx={{
      margin: '0 auto',
      py: '0',
      px: ['20px', '', '25px', '30px'],
      width: '100%',
      maxWidth,
    }}
    {...props}
  />
);

export default Container;

Container.propTypes = {
  maxWidth: PropTypes.string,
};
