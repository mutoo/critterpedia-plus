import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { getMonth, startOfToday, differenceInSeconds } from 'date-fns';
import { ALL_HOURS, ALL_MONTHS } from 'utils/data';
import Heading from './heading';

const ActiveHours = ({
  availableMonths = ALL_MONTHS,
  availableHours = ALL_HOURS,
  ...props
}) => {
  const currentMonth = getMonth(new Date());
  const onMonth = availableMonths[currentMonth];
  const [timeOffset, setTimeOffset] = useState(0);
  const tick = useMemo(
    () => () => {
      const today = startOfToday();
      const offset =
        (differenceInSeconds(new Date(), today) / (24 * 60 * 60)) * 100;
      setTimeOffset(offset);
    },
    [],
  );
  useEffect(() => {
    tick();
    const timer = setInterval(tick, 60 * 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Box {...props}>
      <Heading mb="md">Current Active Hours</Heading>
      <Box sx={{ position: 'relative', opacity: onMonth ? '1' : '0.5' }}>
        <Flex sx={{ transform: 'translate(-0.4ex)' }}>
          <Text flex="0 0 50%">AM</Text>
          <Text flex="0 0 50%">PM</Text>
        </Flex>
        <Flex sx={{ transform: 'translate(-0.4ex)' }}>
          <Text flex="0 0 25%">12</Text>
          <Text flex="0 0 25%">6</Text>
          <Text flex="0 0 25%">12</Text>
          <Text flex="0 0 25%">6</Text>
        </Flex>
        {/* ruler */}
        <Flex
          alignItems="flex-end"
          sx={{
            borderRight: '1px solid',
            borderRightColor: 'grey-66',
            borderBottom: '2px solid',
            borderBottomColor: 'grey-66',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {ALL_HOURS.map((_, h) => (
            <Box
              sx={{
                flex: '1 1 auto',
                width: '4%',
                height: '10px',
                borderLeft: '1px solid',
                borderLeftColor: 'grey-66',
                '&:nth-of-type(4), &:nth-of-type(10), &:nth-of-type(16), &:nth-of-type(22)': {
                  height: '15px',
                },
                '&:nth-of-type(1), &:nth-of-type(7), &:nth-of-type(13), &:nth-of-type(19)': {
                  height: '20px',
                },
              }}
              /* eslint-disable-next-line react/no-array-index-key */
              key={h}
            />
          ))}
        </Flex>
        {/* indicator */}
        <Flex
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            paddingBottom: '1px',
            bottom: '3px',
            borderBottom: '1px solid',
            borderBottomColor: 'grey-99',
            flexWrap: 'wrap',
          }}
        >
          {ALL_HOURS.map((_, h) => (
            <Box
              sx={{
                flex: '1 1 auto',
                width: '4%',
                height: '10px',
                backgroundColor: availableHours[h] ? '#b8d252' : 'transparent',
                borderRadius: () => {
                  if (h === 0 || !availableHours[h - 1]) {
                    return '5px 0 0 5px';
                  }
                  if (h === 23 || !availableHours[h + 1]) {
                    return '0 5px 5px 0';
                  }
                  return '0';
                },
              }}
              /* eslint-disable-next-line react/no-array-index-key */
              key={h}
            />
          ))}
        </Flex>
        <Box
          style={{ left: `calc(${timeOffset}% - 1px)` }}
          sx={{
            height: '25px',
            width: '2px',
            backgroundColor: 'red',
            position: 'absolute',
            bottom: '-2px',
            zIndex: 2,
            '&:before, &:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: '-2px',
              border: '3px solid',
              borderColor: 'red',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
            },
            '&:before': {
              top: '0',
              borderBottom: '0',
            },
            '&:after': {
              bottom: '0',
              borderTop: '0',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ActiveHours;

ActiveHours.propTypes = {
  availableMonths: PropTypes.arrayOf(PropTypes.number),
  availableHours: PropTypes.arrayOf(PropTypes.number),
};
