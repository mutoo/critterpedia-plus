import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass';
const Action = ({ icon, label, ...props }) => (
  <Flex
    className="action"
    sx={{
      backgroundColor: 'orange',
      padding: '10px 20px',
      alignItems: 'center',
      cursor: 'pointer',
      '&:first-of-type': {
        borderRadius: '25px 0 0 25px',
      },
      '&:last-of-type': {
        borderRadius: '0 25px 25px 0',
      },
    }}
    {...props}
  >
    {icon && (
      <Box
        mr="md"
        sx={{
          transform: 'scale(0.8)',
          transition: 'transform ease-out 0.2s',
          '.action:hover &': {
            transform: 'scale(1)',
          },
        }}
      >
        {icon}
      </Box>
    )}
    <Text
      sx={{
        fontSize: '18px',
      }}
    >
      {label}
    </Text>
  </Flex>
);

Action.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default Action;
