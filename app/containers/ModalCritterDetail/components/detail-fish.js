import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { parseAvailableMonths, parseAvailableHours } from 'utils/data';
import ActiveHours from 'components/active-hours';
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
    <Flex justifyContent="space-around" p="30px">
      <Seasonality availableMonths={parseAvailableMonths(data.availability)} />
      <ActiveHours
        availableMonths={parseAvailableMonths(data.availability)}
        availableHours={parseAvailableHours(data.availability)}
      />
    </Flex>
  </Box>
);

export default DetailFish;

DetailFish.propTypes = {
  data: PropTypes.object.isRequired,
};
