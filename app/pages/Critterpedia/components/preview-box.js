import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Flex, Box, Image } from 'rebass';
import NameTag from 'components/name-tag';
import { HemisphereContext, ModeContext } from 'utils/contexts';
import { calculateAvailability } from 'utils/data';
import {
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
  AVAILABILITY_LEVEL_NOW,
  AVAILABILITY_LEVEL_MO,
} from 'utils/const';

const PreviewBox = ({ avatar, category, data, ...props }) => {
  const [theAvatar, setAvatar] = useState(avatar);
  const [isLoaded, setLoaded] = useState(false);
  const [hemisphere] = useContext(HemisphereContext);
  const mode = useContext(ModeContext);
  const [availability, setAvailability] = useState(AVAILABILITY_LEVEL_NOW);
  const updateAvailability = useMemo(
    () => () =>
      setAvailability(
        calculateAvailability(data.availability, hemisphere.toLowerCase()),
      ),
    [data, hemisphere],
  );
  useEffect(() => {
    switch (mode) {
      case MODE_DISCOVERY:
        updateAvailability();
        // eslint-disable-next-line no-case-declarations
        const timer = setInterval(updateAvailability, 60 * 1000);
        return () => clearInterval(timer);
      case MODE_COLLECTION:
      case MODE_ALL:
      default:
        setAvailability(AVAILABILITY_LEVEL_NOW);
    }
    return () => {};
  }, [mode, updateAvailability]);
  return (
    <Flex
      className="acnh-preview-box"
      sx={{
        position: 'relative',
        border: '2px solid',
        borderColor: 'grey-99',
        width: 100,
        height: 100,
        p: 'md',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          left: '4px',
          right: '4px',
          border: '2px dashed',
          borderColor: 'grey-66',
          opacity: '0',
          transition: 'opacity ease-out 0.2s',
        },
        '&:hover::after': {
          opacity: 1,
        },
        '.acnh-critterpedia-slide &:not(:last-of-type)': {
          mb: '-2px',
        },
      }}
      {...props}
    >
      <Box
        sx={{
          color: 'rgba(0,0,0,0.1)',
          transition: 'transform ease-out 0.3s',
          transform: theAvatar && isLoaded ? 'scale(0)' : 'scale(1)',
        }}
      >
        {category}
      </Box>
      {theAvatar && availability ? (
        <Image
          src={theAvatar}
          sx={{
            width: 64,
            height: 64,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity ease-out 0.3s',
            opacity: isLoaded ? `${20 + (availability / 4) ** 1 * 80}%` : 0,
            filter: () => {
              if (isLoaded && availability < AVAILABILITY_LEVEL_MO) {
                return 'grayscale(1)';
              }
              return '';
            },
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setAvatar(null)}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: '10%',
          }}
        >
          {category}
        </Box>
      )}
      <NameTag names={data.name} />
    </Flex>
  );
};

export default PreviewBox;

PreviewBox.propTypes = {
  avatar: PropTypes.string,
  category: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};
