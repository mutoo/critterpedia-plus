import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import { differenceInMilliseconds, getHours, startOfToday } from 'date-fns';
import { ALL_HOURS } from 'utils/data';
import Heading from 'components/heading';
import { animated, interpolate, useSpring } from 'react-spring';
import { throttle } from 'lodash';
import { useDrag } from 'react-use-gesture';
import { trackCategoryEvent } from '../../../configureGA';

const HourPicker = ({ hour, onChange, ...props }) => {
  const wrapRef = useRef(null);
  const usedRef = useRef(null);
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  // reduce the update rate
  const throttledOnChange = useMemo(
    () => throttle(onChange || (() => {}), 500, { leading: false }),
    [onChange],
  );
  const bind = useDrag(
    ({ xy: [cx], event }) => {
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const offsetX = cx - bbox.x;
      const cellWidth = bbox.width / 24;
      // snap to closest cell
      const col = Math.max(0, Math.min(Math.floor(offsetX / cellWidth), 23));
      set({ x: col * cellWidth });
      // calculate hour from cell idx
      if (hour !== col) {
        throttledOnChange(col);
        if (!usedRef.current) {
          trackCategoryEvent('used', 'hour-picker', hour);
          usedRef.current = true;
        }
      }
      event.preventDefault();
    },
    // prevent scroll on mobile
    {
      domTarget: wrapRef,
      eventOptions: { passive: false },
    },
  );
  const [minuteOffset, setMinuteOffset] = useState(0);
  const onUpdate = useMemo(
    () => () => {
      // the minute hand
      const today = startOfToday();
      const offset =
        differenceInMilliseconds(new Date(), today) / (24 * 60 * 60 * 1000);
      setMinuteOffset(offset * 100);
      // if no hour had been set on filter
      // the use current hour
      const currentHour = getHours(new Date());
      const theHour = hour !== null ? hour : currentHour;
      // can't update if there is no wrap element
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const cellWidth = bbox.width / 24;
      set({ x: theHour * cellWidth });
    },
    [hour],
  );
  useEffect(() => {
    // 1. update immediately
    onUpdate();
    // 2. update minutely
    const timer = setInterval(onUpdate, 60 * 1000);
    return () => clearInterval(timer);
  }, [onUpdate]);
  return (
    <Box {...props}>
      <Flex justifyContent="space-between" mb="md">
        <Heading>Hour</Heading>
        {hour !== null ? (
          <Box
            onClick={() => {
              onChange(null);
            }}
          >
            Reset
          </Box>
        ) : (
          <Box>Current</Box>
        )}
      </Flex>
      <animated.div {...bind()}>
        <Box ref={wrapRef} sx={{ position: 'relative' }}>
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
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '3px',
              height: '10px',
              paddingBottom: '1px',
              borderBottom: '1px solid',
              borderBottomColor: 'grey-99',
            }}
          >
            <animated.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: interpolate([x], tx => `translateX(${tx}px)`),
                width: '4%',
                height: '10px',
                backgroundColor: '#b8d252',
                borderRadius: '2px',
              }}
            />
          </Box>

          <Box
            style={{
              left: `calc(${minuteOffset}% - 1px)`,
            }}
            sx={{
              height: '25px',
              width: '2px',
              backgroundColor: hour === null ? 'red' : 'grey-66',
              position: 'absolute',
              bottom: '-2px',
              zIndex: 2,
              '&:before, &:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: '-2px',
                border: '3px solid',
                borderColor: hour === null ? 'red' : 'grey-66',
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
      </animated.div>
    </Box>
  );
};

export default HourPicker;

HourPicker.propTypes = {
  hour: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
