import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';
import nameTabBorder from '!file-loader!assets/images/name-tag-border.svg';

const NameTag = ({ names, fontSize = '12px', ...props }) => (
  <Box
    sx={{
      position: 'relative',
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: '-1',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.2)',
        transform: 'scale(0.8)',
        transformOrigin: 'right bottom',
      },
      '.acnh-preview-box &': {
        position: 'absolute',
        bottom: '90%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0,
        transition: 'opacity ease-out 0.2s',
        zIndex: 1,
      },
      '.acnh-preview-box:hover &': {
        opacity: 1,
      },
    }}
    {...props}
  >
    <Box
      sx={{
        whiteSpace: 'nowrap',
        backgroundColor: 'rgb(249,246,229)',
        transform: 'rotate(-4deg)',
        boxShadow: '-2px 2px 3px 0px rgba(0,0,0,0.2)',
        border: '12px solid',
        borderImage: `url(${nameTabBorder}) 40 round`,
        borderImageWidth: '12px',
        fontSize,
        fontStyle: 'italic',
        fontWeight: 'bold',
      }}
    >
      {names['name-en']}
    </Box>
  </Box>
);

export default NameTag;

NameTag.propTypes = {
  names: PropTypes.object.isRequired,
  fontSize: PropTypes.string,
};
