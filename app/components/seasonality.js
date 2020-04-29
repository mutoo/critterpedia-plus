import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Flex, Box, Text } from 'rebass';
import { localize } from 'date-fns/locale/en-AU';
import { getMonth } from 'date-fns';
import { ALL_MONTHS } from 'utils/data';
import { HemisphereContext } from 'utils/contexts';
import Heading from './heading';
import HemispherePicker from './hemisphere-picker';

const Seasonality = ({ availableMonths = ALL_MONTHS, ...props }) => {
  const currentMonth = getMonth(new Date());
  const [hemisphere, setHemisphere] = useContext(HemisphereContext);
  return (
    <Box {...props}>
      <Flex justifyContent="space-between" mb="md">
        <Heading>Seasonality</Heading>
        <HemispherePicker
          hemisphere={hemisphere}
          setHemisphere={setHemisphere}
        />
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
