import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image, Text } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { fishImage, getAvailableHours } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import selector from 'containers/ModalCritterDetail/selectors';
import {
  closeCritterDetail,
  openCritterDetail,
} from 'containers/ModalCritterDetail/slice';
import { HemisphereContext } from 'utils/contexts';
import FishShadow from 'components/fish-shadow';
import SvgIcon from 'components/svg-icon';
import { COLLECTION_DONATED } from 'utils/const';
import IconButton from './icon-button';
import { trackCategoryEvent } from '../../../configureGA';
import { colors } from '../../../theme';

const DetailFish = ({ data }) => {
  const { category, nextId, prevId, collection, collectionState } = useSelector(
    selector,
  );
  const [hemisphere] = useContext(HemisphereContext);
  const [shouldPreviewShadow, previewShadow] = useState(false);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '960px',
      }}
      onClick={() => previewShadow(false)}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        p="30px"
        sx={{
          borderBottom: '4px double',
          borderBottomColor: 'grey-99',
        }}
      >
        <NameTag
          names={data.name}
          donated={collectionState === COLLECTION_DONATED}
          fontSize="16px"
          mb="10px"
        />
        <Box
          sx={{
            width: '100%',
            maxWidth: '640px',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '100%',
              paddingBottom: '50%',
            },
          }}
        >
          <Image
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: ['2px', '', '', '6px'],
              filter: 'brightness(0) opacity(0.5) blur(1px)',
            }}
            src={fishImage(data.id)}
            key={`fish-${data.id}-shadow`}
          />
          <Image
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
            src={fishImage(data.id)}
            key={`fish-${data.id}`}
          />
        </Box>
        <Flex
          sx={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {prevId !== nextId && (
            <IconButton
              icon="arrow-circle-left"
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: prevId,
                    collection,
                  }),
                )
              }
            />
          )}
          <IconButton
            icon="times-circle"
            onClick={() => dispatch(closeCritterDetail())}
          />
          {prevId !== nextId && (
            <IconButton
              icon="arrow-circle-right"
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: nextId,
                    collection,
                  }),
                )
              }
            />
          )}
        </Flex>
      </Flex>
      <Flex
        flexDirection={['column', '', 'row']}
        py="24px"
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: 'grey-99',
        }}
      >
        <Container mb={['lg', '', '0']}>
          <Seasonality
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
          />
        </Container>
        <Container>
          <ActiveHours
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
            availableHours={getAvailableHours(
              data.availability,
              hemisphere.toLowerCase(),
            )}
          />
        </Container>
      </Flex>
      <Flex flexWrap="wrap" py="24px">
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg">
          <Heading mr="lg">Location</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.availability?.location}
          </Text>
        </Container>
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg">
          <Heading mr="lg">Shadow Size</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              position: 'relative',
            }}
          >
            {data?.shadow ? (
              <Box
                as="span"
                sx={{ cursor: 'pointer' }}
                onClick={e => {
                  trackCategoryEvent(
                    'ModalCritterDetail',
                    'preview shadow',
                    `${data.id}`,
                  );
                  previewShadow(true);
                  e.stopPropagation();
                }}
              >
                {data.shadow}{' '}
                <SvgIcon color={colors.alert} icon="question-circle" inline />
                {shouldPreviewShadow && (
                  <FishShadow
                    description={data.shadow}
                    sx={{
                      position: ['fixed', '', 'absolute'],
                      bottom: ['50%', '', '100%'],
                      left: '50%',
                      transform: [
                        'translate(-50%, 50%) scale(0.75)',
                        '',
                        'translate(-50%, -20px)',
                      ],
                      borderRadius: '40%',
                      overflow: 'hidden',
                      zIndex: 3,
                      boxShadow: '0 5px 10px 0px rgba(0,0,0,0.5)',
                    }}
                  />
                )}
              </Box>
            ) : (
              'Unknown'
            )}
          </Text>
        </Container>
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg">
          <Heading mr="lg">Price</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.price} bells ( {data?.['price-cj']} when sell to C.J. )
          </Text>
        </Container>
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg">
          <Heading mr="lg">Rarity</Heading>
          <Text
            as="span"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.availability?.rarity}
          </Text>
        </Container>
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg">
          <Heading mr="lg">More</Heading>
          <Text
            as="a"
            href={`${global.siteConfig?.Wiki}/${data['file-name']}`}
            target="_blank"
            onClick={() => {
              trackCategoryEvent('used', 'wiki', data.name['name-en']);
            }}
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textDecoration: 'none',
              color: 'body',
            }}
          >
            ON ACNH WIKI <SvgIcon icon="external-link-alt" inline ml="sm" />
          </Text>
        </Container>
        <Container flex="0 0 auto" width={['100%', '', '50%']} mb="lg" />
      </Flex>
    </Box>
  );
};

export default DetailFish;

DetailFish.propTypes = {
  data: PropTypes.object.isRequired,
};
