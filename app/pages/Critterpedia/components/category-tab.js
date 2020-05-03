import { Flex, Box, Text } from 'rebass';
import PropTypes from 'prop-types';
import React from 'react';

const CategoryTab = ({ label, active, icon, ...props }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    p="lg"
    sx={{
      position: 'relative',
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      '& > svg': {
        position: 'relative',
        zIndex: 1,
        color: active ? 'orange' : 'grey-66',
        transform: `scale(${active ? 1.2 : 1})`,
        transition: 'transform ease-out 0.2s',
      },
      '&:not(:last-of-type)': {
        mr: '-10px',
      },
    }}
    {...props}
  >
    <Box
      sx={{
        fontSize: ['24px', '', '', '32px'],
      }}
    >
      {icon}
    </Box>
    {active && (
      <Text
        sx={{
          position: 'absolute',
          background: 'orange',
          borderRadius: '10px 10px',
          color: 'grey-33',
          bottom: '85%',
          left: '50%',
          whiteSpace: 'nowrap',
          py: 'sm',
          px: 'lg',
          transform: 'translateX(-50%)',
          fontSize: ['12px', '', '', '14px'],
          zIndex: 2,
        }}
      >
        {label}
      </Text>
    )}
  </Flex>
);

export default CategoryTab;

CategoryTab.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
