import React from 'react';
import { Text } from 'rebass';

const Heading = ({ ...props }) => (
  <Text
    as="h3"
    sx={{
      display: 'inline-box',
      fontStyle: 'italic',
      lineHeight: 1,
      backgroundColor: 'title-bg',
      borderRadius: '4px',
      p: '3px',
      color: 'title',
    }}
    {...props}
  />
);

export default Heading;
