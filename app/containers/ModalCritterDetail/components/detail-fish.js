import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Image } from 'rebass';
import NameTag from 'components/name-tag';
import Seasonality from 'components/seasonality';
import { parseAvailableMonths } from 'utils/data';
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
      <Image
        sx={{
          width: '100%',
          maxWidth: '640px',
        }}
        src={`${acnhapi.defaults.baseURL}/images/fish/${data.id}`}
      />
    </Flex>
    <Flex>
      <Seasonality availableMonths={parseAvailableMonths(data.availability)} />
    </Flex>
  </Box>
);

export default DetailFish;

DetailFish.propTypes = {
  data: PropTypes.object.isRequired,
};
