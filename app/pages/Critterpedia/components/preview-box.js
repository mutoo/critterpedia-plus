import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Flex, Box, Image } from 'rebass';
import { css } from '@emotion/core';
import NameTag from 'components/name-tag';
import { HemisphereContext, ModeContext } from 'utils/contexts';
import { calculateAvailability } from 'utils/data';
import {
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
  AVAILABILITY_LEVEL_NOW,
  COLLECTION_NA,
  AVAILABILITY_LEVEL_NA,
  COLLECTION_DONATED,
} from 'utils/const';
import { createStructuredSelector } from 'reselect';
import { getCollectionState } from 'pages/Critterpedia/selectors';
import { useSelector } from 'react-redux';
import { leftToRight } from 'utils/animations';
import MuseumIcon from 'assets/icons/museum.svg';

const PreviewBox = ({
  avatar,
  category,
  preview,
  data,
  selected,
  ...props
}) => {
  const [theAvatar, setAvatar] = useState(avatar);
  const [isLoaded, setLoaded] = useState(false);
  const selector = useMemo(
    () =>
      createStructuredSelector({
        collectionState: getCollectionState(category, data.id),
      }),
    [category, data],
  );
  const { collectionState } = useSelector(selector);
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
        if (collectionState === COLLECTION_NA) {
          setAvailability(AVAILABILITY_LEVEL_NA);
        } else {
          setAvailability(AVAILABILITY_LEVEL_NOW);
        }
        break;
      case MODE_ALL:
      default:
        setAvailability(AVAILABILITY_LEVEL_NOW);
    }
    return () => {};
  }, [mode, updateAvailability, collectionState]);
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
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: mode === MODE_COLLECTION && selected ? '64px' : '0',
          height: mode === MODE_COLLECTION && selected ? '64px' : '0',
          opacity: mode === MODE_COLLECTION && selected ? 1 : 0,
          borderRadius: '50%',
          transition: 'all ease-out 0.2s',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            display: 'block',
            backgroundImage:
              'repeating-linear-gradient(-45deg, orange 0px, orange 11.31px, yellow 11.31px, yellow 22.62px)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '200%',
            animation: css`
              ${leftToRight} linear 1s infinite
            `,
          },
        }}
      />
      <Box
        sx={{
          color: 'rgba(0,0,0,0.1)',
          transition: 'transform ease-out 0.3s',
          transform: theAvatar && isLoaded ? 'scale(0)' : 'scale(1)',
        }}
      >
        {preview}
      </Box>
      {theAvatar && (selected || availability) ? (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px',
          }}
        >
          <Image
            src={theAvatar}
            sx={{
              width: '100%',
              height: 'auto',
              transition: 'opacity ease-out 0.3s, filter ease-out 0.3s',
              opacity: () => {
                if (!isLoaded) return 0;
                switch (mode) {
                  case MODE_DISCOVERY:
                    return `${20 + (availability / 4) ** 2 * 80}%`;
                  default:
                }
                return 1;
              },
              filter: () => {
                switch (mode) {
                  case MODE_DISCOVERY:
                    if (isLoaded && availability < AVAILABILITY_LEVEL_NOW) {
                      return 'brightness(0)';
                    }
                    break;
                  default:
                }
                return '';
              },
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setAvatar(null)}
          />
        </Box>
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
          {preview}
        </Box>
      )}
      <NameTag names={data.name} />
      {availability > AVAILABILITY_LEVEL_NA &&
        collectionState === COLLECTION_DONATED && (
          <Box
            sx={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              color: 'grey-66',
              transition: 'opacity ease-out 0.2s',
              opacity: mode === MODE_COLLECTION ? 1 : 0.5,
            }}
          >
            <MuseumIcon width="16px" height="16px" />
          </Box>
        )}
    </Flex>
  );
};

export default PreviewBox;

PreviewBox.propTypes = {
  avatar: PropTypes.string,
  preview: PropTypes.node.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
