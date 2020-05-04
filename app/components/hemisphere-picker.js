import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Text } from 'rebass';
import HomeIcon from 'assets/icons/home.svg';
import AdjustIcon from 'assets/icons/adjust.svg';
import { trackCategoryEvent } from '../configureGA';
import { colors } from '../theme';

const Hemisphere = ({ label, icon, active, ...props }) => (
  <Button
    sx={{
      py: '0',
      px: 'md',
      background: 'transparent',
      color: 'action-active',
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
      {active ? (
        <HomeIcon width={18} height={18} color={colors.indicator} />
      ) : (
        icon
      )}
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
          <AdjustIcon width="1em" height="1em" />
        </Box>
      }
      active={hemisphere === 'Northern'}
      onClick={() => {
        trackCategoryEvent('used', 'hemisphere', 'Northern');
        setHemisphere('Northern');
      }}
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
          <AdjustIcon width="1em" height="1em" />
        </Box>
      }
      active={hemisphere === 'Southern'}
      onClick={() => {
        trackCategoryEvent('used', 'hemisphere', 'Southern');
        return setHemisphere('Southern');
      }}
    />
  </Flex>
);

export default HemispherePicker;

HemispherePicker.propTypes = {
  hemisphere: PropTypes.string.isRequired,
  setHemisphere: PropTypes.func.isRequired,
};
