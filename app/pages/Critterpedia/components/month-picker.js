import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ALL_MONTHS } from 'utils/data';
import { Box, Flex, Text } from 'rebass';
import {
  getMonth,
  startOfMonth,
  addMonths,
  differenceInMilliseconds,
} from 'date-fns';
import { localize } from 'date-fns/locale/en-AU';
import Heading from 'components/heading';
import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import SvgIcon from 'components/svg-icon';
import { throttle } from 'lodash';
import { trackCategoryEvent } from '../../../configureGA';

const MonthPicker = ({ month, onChange, ...props }) => {
  const currentMonth = getMonth(new Date());
  const wrapRef = useRef(null);
  const usedRef = useRef(null);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  // reduce the update rate
  const throttledOnChange = useMemo(
    () => throttle(onChange || (() => {}), 500, { leading: false }),
    [onChange],
  );
  const bind = useDrag(
    ({ xy: [cx, cy], event }) => {
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const offsetX = cx - bbox.x;
      const offsetY = cy - bbox.y;
      const cellWidth = bbox.width / 4;
      const cellHeight = bbox.height / 3;
      // snap to closest cell
      const col = Math.max(0, Math.min(Math.floor(offsetX / cellWidth), 3));
      const row = Math.max(0, Math.min(Math.floor(offsetY / cellHeight), 2));
      set({ x: col * cellWidth, y: row * cellHeight });
      // calculate month from cell idx
      const newMonth = row * 4 + col;
      if (month !== newMonth) {
        throttledOnChange(row * 4 + col);
        if (!usedRef.current) {
          trackCategoryEvent('used', 'month-picker', month);
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
  const onUpdate = useMemo(
    () => () => {
      // if no month had been set on filter
      // then use current month
      const theMonth = month !== null ? month : currentMonth;
      // can't update if there is no wrap element
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const cellWidth = bbox.width / 4;
      const cellHeight = bbox.height / 3;
      const col = theMonth % 4;
      const row = Math.floor(theMonth / 4);
      set({ x: col * cellWidth, y: row * cellHeight });
    },
    [month, currentMonth],
  );
  useEffect(() => {
    // 1. calculate timeout to next month
    // and then set a timer to update
    const now = new Date();
    const firstDatOfCurrentMonth = startOfMonth(now);
    const nextMonth = addMonths(firstDatOfCurrentMonth, 1);
    const timeout = differenceInMilliseconds(nextMonth, now);
    const timer = setTimeout(onUpdate, timeout);
    // 2. update on resize
    window.addEventListener('resize', onUpdate);
    // 3. update immediately
    onUpdate();
    return () => {
      window.removeEventListener('resize', onUpdate);
      clearTimeout(timer);
    };
  }, [onUpdate]);
  return (
    <Box {...props}>
      <Flex justifyContent="flex-start" mb="md">
        <Heading mr="md">Month</Heading>
        {month !== null ? (
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onChange(null);
            }}
          >
            Reset <SvgIcon icon="redo-alt" inline />
          </Box>
        ) : (
          <Box>Current</Box>
        )}
      </Flex>
      <animated.div {...bind()}>
        <Flex
          ref={wrapRef}
          sx={{
            position: 'relative',
            flexWrap: 'wrap',
            userSelect: 'none',
            cursor: 'pointer',
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
                pointerEvents: 'none',
                zIndex: 1,
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
                        borderColor: month === null ? 'red' : 'grey-66',
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
                  // backgroundColor: availableMonths[m] ? '#b8d252' : '',
                }}
              >
                {localize.month(m, { width: 'abbreviated' })}.
              </Text>
            </Box>
          ))}
          <animated.div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: interpolate(
                [x, y],
                (tx, ty) => `translate(${tx}px, ${ty}px)`,
              ),
              width: '25%',
              height: '30px',
              padding: '5px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                background: '#b8d252',
                boxSizing: 'border-sizing',
              }}
            />
          </animated.div>
        </Flex>
      </animated.div>
    </Box>
  );
};

MonthPicker.propTypes = {
  month: PropTypes.number,
  onChange: PropTypes.func,
};

export default MonthPicker;
