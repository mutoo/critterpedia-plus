import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import BubbleSizeImg from 'assets/images/sea-bubble-size.png';

const PANEL_WIDTH = 210;
const PANEL_HEIGHT = 300;
const SPRITE_WIDTH = PANEL_WIDTH * 3;

const bubbleSizes = {
  'x-small': { frame: 0, scale: 0.82 },
  small: { frame: 0, scale: 1 },
  medium: { frame: 1, scale: 1 },
  large: { frame: 2, scale: 1 },
  'x-large': { frame: 2, scale: 1.12 },
};

const normalizeDescription = description =>
  description.toLowerCase().replace(/\s+/g, '-');

const SeaBubbleSize = ({ description, sx, ...props }) => {
  const bubbleSize = useMemo(
    () => bubbleSizes[normalizeDescription(description)] || bubbleSizes.medium,
    [description],
  );

  return (
    <Box
      {...props}
      sx={{
        width: `${PANEL_WIDTH}px`,
        height: `${PANEL_HEIGHT}px`,
        backgroundColor: '#08213a',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: `${PANEL_WIDTH}px`,
          height: `${PANEL_HEIGHT}px`,
          backgroundImage: `url(${BubbleSizeImg})`,
          backgroundPosition: `-${bubbleSize.frame * PANEL_WIDTH}px 0`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${SPRITE_WIDTH}px ${PANEL_HEIGHT}px`,
          transform: `scale(${bubbleSize.scale})`,
          transformOrigin: 'center center',
        }}
      />
    </Box>
  );
};

SeaBubbleSize.propTypes = {
  description: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default SeaBubbleSize;
