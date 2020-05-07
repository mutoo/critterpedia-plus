import React from 'react';
import Container from 'containers/Container';
import Heading from 'components/heading';
import { Box, Text } from 'rebass';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Box my="30px">
      <Container maxWidth="660px">
        <Heading>404 Critter Not Caught</Heading>
        <Text fontSize="18px">
          <p>The little critter is vanish in the dark, please try again!</p>
        </Text>
        <Text
          onClick={() => {
            history.push('/');
          }}
          sx={{
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <p>Back to critterpedia page</p>
        </Text>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
