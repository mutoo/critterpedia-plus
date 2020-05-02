import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ALL_MONTHS } from 'utils/data';
import { Box, Flex, Text } from 'rebass';
import { getMonth } from 'date-fns';
import { localize } from 'date-fns/locale/en-AU';
import Heading from 'components/heading';
import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { debounce } from 'lodash';

const MonthPicker = ({ month, onChange, ...props }) => {
  const wrapRef = useRef(null);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const debouncedOnChange = useMemo(
    () => debounce(onChange || (() => {}), 300),
    [onChange],
  );
  const bind = useDrag(
    ({ xy: [cx, cy] }) => {
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const offsetX = cx - bbox.x;
      const offsetY = cy - bbox.y;
      const cellWidth = bbox.width / 4;
      const cellHeight = bbox.height / 3;
      const col = Math.max(0, Math.min(Math.floor(offsetX / cellWidth), 3));
      const row = Math.max(0, Math.min(Math.floor(offsetY / cellHeight), 2));
      set({ x: col * cellWidth, y: row * cellHeight });
      const newMonth = row * 4 + col;
      if (month !== newMonth) {
        debouncedOnChange(row * 4 + col);
      }
    },
    { eventOptions: { passive: false } },
  );
  useEffect(() => {
    const onRender = () => {
      if (!wrapRef.current) return;
      const bbox = wrapRef.current.getBoundingClientRect();
      const cellWidth = bbox.width / 4;
      const cellHeight = bbox.height / 3;
      const col = month % 4;
      const row = Math.floor(month / 4);
      set({ x: col * cellWidth, y: row * cellHeight });
    };
    onRender();
    window.addEventListener('resize', onRender);
    return () => window.removeEventListener('resize', onRender);
  }, [month]);
  return (
    <Box {...props}>
      <Flex justifyContent="space-between" mb="md">
        <Heading>Month</Heading>
        <Box
          onClick={() => {
            const now = new Date();
            onChange(getMonth(now));
          }}
        >
          Reset
        </Box>
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
                // opacity: availableMonths[m] ? '1' : '0.5',
                // '&::after':
                //   currentMonth === m
                //     ? {
                //       content: '""',
                //       position: 'absolute',
                //       top: 0,
                //       left: 0,
                //       width: '100%',
                //       height: '100%',
                //       border: '2px solid',
                //       borderColor: 'red',
                //     }
                //     : null,
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
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default MonthPicker;
