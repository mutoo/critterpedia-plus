import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Flex, Box, Text, Button } from 'rebass';
import { localize } from 'date-fns/locale/en-AU';
import { getMonth } from 'date-fns';
import { ALL_MONTHS } from 'utils/data';
import HomeIcon from 'assets/icons/home.svg';
import { HemisphereContext } from 'utils/contexts';
import Heading from './heading';

const Hemisphere = ({ label, active, ...props }) => (
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
    {active && (
      <Box sx={{ color: 'orange', lineHeight: '1', ml: 'sm' }}>
        <HomeIcon width={18} height={18} />
      </Box>
    )}
  </Button>
);

Hemisphere.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

const Seasonality = ({ availableMonths = ALL_MONTHS, ...props }) => {
  const currentMonth = getMonth(new Date());
  const [hemisphere, setHemisphere] = useContext(HemisphereContext);
  return (
    <Box {...props}>
      <Flex justifyContent="space-between" mb="md">
        <Heading>Seasonality</Heading>
        <Flex alignItems="center">
          <Hemisphere
            label="Northern"
            active={hemisphere === 'Northern'}
            onClick={() => setHemisphere('Northern')}
          />
          <Text mx="sm">/</Text>
          <Hemisphere
            label="Southern"
            active={hemisphere === 'Southern'}
            onClick={() => setHemisphere('Southern')}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          flexWrap: 'wrap',
        }}
      >
        {ALL_MONTHS.map((_, m) => (
          <Box
            sx={{
              flex: '1 1 25%',
              border: '1px solid',
              borderColor: 'grey-99',
              mr: '-1px',
              mb: '-1px',
              padding: '4px',
              position: 'relative',
              opacity: availableMonths[m] ? '1' : '0.5',
              '&::after':
                currentMonth === m
                  ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: '2px solid',
                      borderColor: 'red',
                    }
                  : null,
            }}
            /* eslint-disable-next-line react/no-array-index-key */
            key={m}
          >
            <Text
              sx={{
                borderRadius: '5px',
                fontSize: '14px',
                fontStyle: 'italic',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: availableMonths[m] ? '#b8d252' : '',
              }}
            >
              {localize.month(m, { width: 'abbreviated' })}.
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Seasonality;

Seasonality.propTypes = {
  availableMonths: PropTypes.arrayOf(PropTypes.bool),
};
