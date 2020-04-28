import React from 'react';
import { Text } from 'rebass';

const Heading = ({ ...props }) => (
  <Text
    as="h3"
    sx={{
      display: 'inline-box',
      fontSize: '16px',
      fontStyle: 'italic',
      lineHeight: 1,
      backgroundColor: 'lightgreen',
    }}
    {...props}
  />
);

export default Heading;
