import React from 'react';
import { Box } from 'rebass';

/**
 * The container is a responsive fixed-width div.
 * It just works like the classical bootstrap `.container`
 */
export const Container = ({ ...props }) => (
  <Box
    className="acnh-container"
    sx={{
      margin: '0 auto',
      py: '0',
      px: ['10px', '20px', '25px', '30px'],
      width: '100%',
      maxWidth: '1320px',
    }}
    {...props}
  />
);

export default Container;
