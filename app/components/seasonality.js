import PropTypes from 'prop-types';
import React from 'react';
import { Flex, Box, Text } from 'rebass';
import { localize } from 'date-fns/locale/en-AU';
import { getMonth } from 'date-fns';
import { ALL_MONTHS } from 'utils/data';
import Heading from './heading';

const Seasonality = ({ availableMonths = ALL_MONTHS }) => {
  const currentMonth = getMonth(new Date());
  return (
    <Box>
      <Heading>Seasonality</Heading>
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
                backgroundColor: availableMonths[m] ? 'green' : '',
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
