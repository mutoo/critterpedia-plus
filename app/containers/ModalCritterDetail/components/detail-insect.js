import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image, Text, Button } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { parseAvailableMonths, parseAvailableHours } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import { useDispatch, useSelector } from 'react-redux';
import { openCritterDetail } from 'containers/ModalCritterDetail/slice';
import ArrowLeftIcon from 'assets/icons/arrow-circle-left.svg';
import ArrowRightIcon from 'assets/icons/arrow-circle-right.svg';
import { HemisphereContext } from 'utils/contexts';
import selector from '../selectors';
import { acnhapi } from '../../../configureAxios';

const DetailInsect = ({ data }) => {
  const { category, nextId, prevId, collection } = useSelector(selector);
  const [hemisphere] = useContext(HemisphereContext);
  const dispatch = useDispatch();
  return (
    <Flex
      sx={{
        width: '100%',
        maxWidth: '960px',
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p="30px"
        sx={{
          flex: '1 1 auto',
          width: '60%',
          borderRight: '4px double',
          borderRightColor: 'grey-99',
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
              top: 0,
            }}
            src={`${acnhapi.defaults.baseURL}/images/bugs/${data.id}`}
            key={`insect-${data.id}`}
          />
        </Box>
        {prevId !== nextId && (
          <Flex
            sx={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Button
              sx={{ color: 'grey-33', background: 'transparent' }}
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: prevId,
                    collection,
                  }),
                )
              }
            >
              <ArrowLeftIcon width={32} height={32} />
            </Button>
            <Button
              sx={{ color: 'grey-33', background: 'transparent' }}
              onClick={() =>
                dispatch(
                  openCritterDetail({
                    category,
                    id: nextId,
                    collection,
                  }),
                )
              }
            >
              <ArrowRightIcon width={32} height={32} />
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex
        py="24px"
        flexDirection="column"
        justifyContent="space-around"
        sx={{
          flex: '1 1 auto',
          width: '40%',
        }}
      >
        <Container>
          <Seasonality
            availableMonths={parseAvailableMonths(
              data.availability,
              hemisphere.toLowerCase(),
            )}
          />
        </Container>
        <Container>
          <ActiveHours
            availableMonths={parseAvailableMonths(
              data.availability,
              hemisphere.toLowerCase(),
            )}
            availableHours={parseAvailableHours(data.availability)}
          />
        </Container>
        <Container>
          <Heading mr="lg">Location</Heading>
          <Text
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}
          >
            {data?.availability?.location}
          </Text>
        </Container>
        <Container />
      </Flex>
    </Flex>
  );
};

export default DetailInsect;

DetailInsect.propTypes = {
  data: PropTypes.object.isRequired,
};
