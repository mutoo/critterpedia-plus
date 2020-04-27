import React from 'react';
import { PropTypes } from 'prop-types';
import { Flex, Box, Heading, Text } from 'rebass';
import LoaderSvg from 'assets/images/loader.svg';
import { css } from '@emotion/core';
import { fadeIn } from 'utils/animations';

// eslint-disable-next-line react/prop-types
const LoadingBox = ({ sx = {}, ...props }) => (
  <Flex
    className="loading"
    sx={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '128px',
      overflow: 'auto',
      ...sx,
    }}
    {...props}
  ></Flex>
);

const Loading = ({ loading, data, error, children }) => {
  if (loading) {
    return (
      <LoadingBox>
        <LoaderSvg width="48px" height="48px" />
      </LoadingBox>
    );
  }
  if (error) {
    return (
      <LoadingBox
        sx={{
          alignItems: 'flex-start',
          border: '1px dashed',
          borderColor: 'grey-33',
        }}
      >
        <Box p="lg">
          <Heading>Could not fetch data</Heading>
          <Text
            as="pre"
            sx={{
              whiteSpace: 'pre-wrap',
            }}
          >{`${error}`}</Text>
        </Box>
      </LoadingBox>
    );
  }
  if (data) {
    return (
      <Box
        sx={{
          animation: css`
            ${fadeIn} 1s ease-out
          `,
        }}
      >
        {children}
      </Box>
    );
  }
  return null;
};

Loading.propTypes = {
  /** whether the request is loading */
  loading: PropTypes.bool,
  /** the data in the response */
  data: PropTypes.object,
  /** any error occurs during the request */
  error: PropTypes.object,
  /** the children components to display after data is loaded */
  children: PropTypes.node,
};

export default Loading;
