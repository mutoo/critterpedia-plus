import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Text } from 'rebass';
import HomeIcon from 'assets/icons/home.svg';
import AdjustIcon from 'assets/icons/adjust.svg';

const Hemisphere = ({ label, icon, active, ...props }) => (
  <Button
    sx={{
      py: '0',
      px: 'md',
      background: 'transparent',
      color: 'grey-33',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
    }}
    {...props}
  >
    {label}
    <Box sx={{ lineHeight: '1', ml: 'sm' }}>
      {active ? <HomeIcon width={18} height={18} color="orange" /> : icon}
    </Box>
  </Button>
);

Hemisphere.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
};

const HemispherePicker = ({ hemisphere, setHemisphere, ...props }) => (
  <Flex alignItems="center" {...props}>
    <Hemisphere
      label="Northern"
      icon={
        <Box
          sx={{
            transform: 'rotate(90deg)',
          }}
        >
          <AdjustIcon width={18} height={18} />
        </Box>
      }
      active={hemisphere === 'Northern'}
      onClick={() => setHemisphere('Northern')}
    />
    <Text mx="sm">/</Text>
    <Hemisphere
      label="Southern"
      icon={
        <Box
          sx={{
            transform: 'rotate(-90deg)',
          }}
        >
          <AdjustIcon width={18} height={18} />
        </Box>
      }
      active={hemisphere === 'Southern'}
      onClick={() => setHemisphere('Southern')}
    />
  </Flex>
);

export default HemispherePicker;

HemispherePicker.propTypes = {
  hemisphere: PropTypes.string.isRequired,
  setHemisphere: PropTypes.func.isRequired,
};