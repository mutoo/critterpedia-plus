import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image, Text } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { insectImage } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCritterDetail,
  openCritterDetail,
} from 'containers/ModalCritterDetail/slice';
import { HemisphereContext } from 'utils/contexts';
import selector from '../selectors';
import IconButton from './icon-button';

const DetailInsect = ({ data }) => {
  const { category, nextId, prevId, collection } = useSelector(selector);
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
        <NameTag names={data.name} fontSize="16px" />
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '100%',
              paddingBottom: '100%',
            },
          }}
        >
          <Image
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: ['2px', '', '', '5px'],
              filter: 'brightness(0) opacity(0.5) blur(1px)',
            }}
            src={insectImage(data.id)}
            key={`insect-${data.id}-shadow`}
          />
          <Image
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
            src={insectImage(data.id)}
            key={`insect-${data.id}`}
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
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
          />
        </Container>
        <Container mb="lg">
          <ActiveHours
            availableMonths={
              data.availability[`month-${hemisphere.toLowerCase()}`]
            }
            availableHours={data.availability.time}
          />
        </Container>
        <Flex mb="lg">
          <Container>
            <Heading mb="md">Location</Heading>
            <Text
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {data?.availability?.location || 'Unknown'}
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
              {data?.availability?.rarity}
            </Text>
          </Container>
        </Flex>
        <Container>
          <Heading mb="md">Price</Heading>
          <Text
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.price} bells ( {data?.['price-flick']} when sell to Flick. )
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
};

export default DetailInsect;

DetailInsect.propTypes = {
  data: PropTypes.object.isRequired,
};
