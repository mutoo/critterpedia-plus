import { Flex, Text } from 'rebass';
import PropTypes from 'prop-types';
import React from 'react';

const CategoryTab = ({ label, active, icon, ...props }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    p="lg"
    mr="-10px"
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
    }}
    {...props}
  >
    {icon}
    {active && (
      <Text
        sx={{
          position: 'absolute',
          background: 'orange',
          borderRadius: '10px 10px',
          color: 'grey-33',
          bottom: '80%',
          left: '50%',
          whiteSpace: 'nowrap',
          py: 'sm',
          px: 'lg',
          transform: 'translateX(-50%)',
          fontSize: '14px',
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
