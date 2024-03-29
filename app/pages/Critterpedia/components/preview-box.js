import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Image } from 'rebass';
import { css } from '@emotion/core';
import NameTag from 'components/name-tag';
import { HemisphereContext } from 'utils/contexts';
import {
  calculateAvailability,
  fishIcon,
  insectIcon,
  seaIcon,
} from 'utils/data';
import {
  MODE_ALL,
  MODE_COLLECTION,
  MODE_DISCOVERY,
  AVAILABILITY_LEVEL_NOW,
  COLLECTION_NA,
  AVAILABILITY_LEVEL_NA,
  COLLECTION_DONATED,
  CATEGORY_FISH,
  CATEGORY_INSECTS,
  CATEGORY_SEA,
} from 'utils/const';
import { createStructuredSelector } from 'reselect';
import selector, { getCollectionState } from 'pages/Critterpedia/selectors';
import { useSelector } from 'react-redux';
import { leftToRight } from 'utils/animations';
import SvgIcon from 'components/svg-icon';

const PreviewBox = ({ data, selected, ...props }) => {
  const [isLoaded, setLoaded] = useState(false);
  const stateSelector = useMemo(
    () =>
      createStructuredSelector({
        collectionState: getCollectionState(
          data.category.toLowerCase(),
          data.id,
        ),
      }),
    [data],
  );
  const {
    filters: { month, hour },
  } = useSelector(selector);
  const { collectionState } = useSelector(stateSelector);
  const [hemisphere] = useContext(HemisphereContext);
  const { mode } = useParams();
  const [availability, setAvailability] = useState(AVAILABILITY_LEVEL_NOW);
  const updateAvailability = useMemo(
    () => () =>
      setAvailability(
        calculateAvailability(
          data.availability,
          hemisphere.toLowerCase(),
          month,
          hour,
        ),
      ),
    [data, hemisphere, month, hour],
  );
  const avatar = {
    [CATEGORY_FISH]: fishIcon,
    [CATEGORY_INSECTS]: insectIcon,
    [CATEGORY_SEA]: seaIcon,
  }[data.category](data);
  const [theAvatar, setAvatar] = useState(avatar);
  const categoryIcon = useMemo(
    () => (
      <SvgIcon
        icon={
          {
            [CATEGORY_FISH]: 'fish',
            [CATEGORY_INSECTS]: 'insects',
            [CATEGORY_SEA]: 'sea-creatures',
          }[data.category]
        }
        fontSize={[24, '', '', 32]}
      />
    ),
    [data],
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
        border: ['1px solid', '', '', '2px solid'],
        borderColor: 'grey-99',
        width: [75, '', '', 100],
        height: [75, '', '', 100],
        p: 'md',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: ['2px', '', '', '4px'],
          bottom: ['2px', '', '', '4px'],
          left: ['2px', '', '', '4px'],
          right: ['2px', '', '', '4px'],
          border: '2px dashed',
          borderColor: 'grey-66',
          opacity: '0',
          transition: 'opacity ease-out 0.2s',
        },
        '&:hover::after': {
          opacity: 1,
        },
        '.acnh-critterpedia-slide &:not(:last-of-type)': {
          mb: ['-1px', '', '', '-2px'],
        },
      }}
      {...props}
    >
      {/* selected circle */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width:
            mode === MODE_COLLECTION && selected
              ? ['48px', '', '', '64px']
              : '0',
          height:
            mode === MODE_COLLECTION && selected
              ? ['48px', '', '', '64px']
              : '0',
          opacity: mode === MODE_COLLECTION && selected ? 1 : 0,
          borderRadius: '50%',
          transition: 'all ease-out 0.2s',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            display: 'block',
            backgroundImage: [
              'repeating-linear-gradient(-45deg, orange 0px, orange 8.49px, yellow 8.49px, yellow 16.97px)',
              '',
              '',
              'repeating-linear-gradient(-45deg, orange 0px, orange 11.31px, yellow 11.31px, yellow 22.62px)',
            ],
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
      {/* placeholder */}
      <Box
        sx={{
          color: 'rgba(0,0,0,0.1)',
          transition: 'transform ease-out 0.3s',
          transform: theAvatar && isLoaded ? 'scale(0)' : 'scale(1)',
        }}
        key={`${data.category}-${data.id}`}
      >
        {categoryIcon}
      </Box>
      {theAvatar && (selected || availability) ? (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: ['48px', '', '', '64px'],
          }}
        >
          <Image
            src={theAvatar}
            sx={{
              width: '100%',
              height: 'auto',
              transition: 'opacity ease-out 0.3s, filter ease-out 0.3s',
              opacity: isLoaded ? 1 : 0,
              filter: () => {
                switch (mode) {
                  case MODE_DISCOVERY:
                    // eslint-disable-next-line no-case-declarations
                    const brightness =
                      isLoaded && availability < AVAILABILITY_LEVEL_NOW ? 0 : 1;
                    // eslint-disable-next-line no-case-declarations
                    const alpha = 20 + (availability / 4) ** 2 * 80;
                    return `brightness(${brightness}) opacity(${alpha / 100})`;
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
            color: 'rgba(0,0,0,0.1)',
          }}
        >
          {categoryIcon}
        </Box>
      )}
      <NameTag names={data.names} />
      {availability > AVAILABILITY_LEVEL_NA &&
        collectionState === COLLECTION_DONATED && (
          <Box
            sx={{
              position: 'absolute',
              right: ['5px', '', '', '8px'],
              bottom: ['5px', '', '', '8px'],
              color: 'grey-66',
              transition: 'opacity ease-out 0.2s',
              opacity: mode === MODE_COLLECTION ? 1 : 0.5,
              fontSize: ['10px', '', '', '16px'],
            }}
          >
            <SvgIcon icon="museum" />
          </Box>
        )}
    </Flex>
  );
};

export default PreviewBox;

PreviewBox.propTypes = {
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
