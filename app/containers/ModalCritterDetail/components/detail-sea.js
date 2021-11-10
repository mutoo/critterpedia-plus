import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { ALL_MONTHS, getAvailableHours } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCritterDetail,
  openCritterDetail,
} from 'containers/ModalCritterDetail/slice';
import { HemisphereContext } from 'utils/contexts';
import { COLLECTION_DONATED } from 'utils/const';
import SvgIcon from 'components/svg-icon';
import PreviewImage from 'containers/ModalCritterDetail/components/preview-image';
import selector from '../selectors';
import IconButton from './icon-button';
import { trackCategoryEvent } from '../../../configureGA';

const DetailSea = ({ data }) => {
  const { category, nextId, prevId, collection, collectionState } = useSelector(
    selector,
  );
  const [hemisphere] = useContext(HemisphereContext);
  const dispatch = useDispatch();
  return (
    <Flex
      flexDirection={['column', '', 'row']}
      sx={{
        width: '100%',
        maxWidth: '960px',
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={['30px', '', '30px']}
        sx={{
          flex: '1 1 auto',
          width: ['100%', '', '60%'],
          borderRight: ['none', '', '4px double'],
          borderRightColor: 'grey-99',
          borderBottom: ['4px double', '', 'none'],
          borderBottomColor: 'grey-99',
        }}
      >
        <NameTag
          names={data.names}
          fontSize="16px"
          donated={collectionState === COLLECTION_DONATED}
        />
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            position: 'relative',
          }}
        >
          <PreviewImage
            data={data}
            width={640}
            height={640}
            key={`sea-${data.id}`}
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
        py="24px"
        flexDirection="column"
        justifyContent="space-around"
        sx={{
          flex: '1 1 auto',
          width: ['100%', '', '40%'],
        }}
      >
        <Container mb="lg">
          <Seasonality
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`] ||
              ALL_MONTHS
            }
          />
        </Container>
        <Container mb="lg">
          <ActiveHours
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`] ||
              ALL_MONTHS
            }
            availableHours={getAvailableHours(
              data.availability,
              hemisphere.toLowerCase(),
            )}
          />
        </Container>
        <Flex mb="lg">
          <Container>
            <Heading mb="md">Speed</Heading>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {data?.speed}
            </Text>
          </Container>
          <Container>
            <Heading mb="md">Shadow</Heading>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {data?.shadow}
            </Text>
          </Container>
        </Flex>
        <Flex mb="lg">
          <Container>
            <Heading mb="md">Price</Heading>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {data?.price} bells
            </Text>
          </Container>
          <Container>
            <Heading mb="md">Rarity</Heading>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {data?.rarity}
            </Text>
          </Container>
        </Flex>
        <Container mb="md">
          <Heading mr="lg">More</Heading>
          <Text
            as="a"
            href={`${global.siteConfig?.Wiki}/${data.names.USen.replace(
              /\s/g,
              '_',
            )}`}
            target="_blank"
            onClick={() => {
              trackCategoryEvent('used', 'wiki', data.names.USen);
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
      </Flex>
    </Flex>
  );
};

export default DetailSea;

DetailSea.propTypes = {
  data: PropTypes.object.isRequired,
};
