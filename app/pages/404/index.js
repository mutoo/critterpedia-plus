import React from 'react';
import Container from 'containers/Container';
import Heading from 'components/heading';
import { Box, Text } from 'rebass';

const NotFoundPage = () => (
  <Box my="30px">
    <Container maxWidth="660px">
      <Heading>404 Critter Not Caught</Heading>
      <Text fontSize="18px">
        <p>The little critter is vanish in the dark, please try again!</p>
      </Text>
    </Container>
  </Box>
);

export default NotFoundPage;
