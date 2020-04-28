import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image, Text } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { parseAvailableMonths, parseAvailableHours } from 'utils/data';
import ActiveHours from 'components/active-hours';
import Heading from 'components/heading';
import Container from 'containers/Container';
import { acnhapi } from '../../../configureAxios';

const DetailFish = ({ data }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '960px',
    }}
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
      <NameTag names={data.name} fontSize="16px" mb="10px" />
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
            top: 0,
          }}
          src={`${acnhapi.defaults.baseURL}/images/fish/${data.id}`}
        />
      </Box>
    </Flex>
    <Flex py="24px">
      <Container>
        <Seasonality
          availableMonths={parseAvailableMonths(data.availability)}
        />
      </Container>
      <Container>
        <ActiveHours
          availableMonths={parseAvailableMonths(data.availability)}
          availableHours={parseAvailableHours(data.availability)}
        />
      </Container>
    </Flex>
    <Flex py="24px">
      <Container>
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
      <Container />
    </Flex>
  </Box>
);

export default DetailFish;

DetailFish.propTypes = {
  data: PropTypes.object.isRequired,
};
