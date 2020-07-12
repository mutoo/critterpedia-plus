import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';
import SvgIcon from 'components/svg-icon';
import { useSelector } from 'react-redux';
import { getLanguage } from 'containers/App/selectors';
import { capitalize } from 'lodash';
import nameTabBorder from '!file-loader!assets/images/name-tag-border.svg';

const NameTag = ({ names, donated, fontSize = '12px', ...props }) => {
  const language = useSelector(getLanguage);
  return (
    <Box
      sx={{
        position: 'relative',
        pointerEvents: 'none',
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: 0,
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
          position: 'relative',
          zIndex: 1,
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
        {donated && (
          <>
            <SvgIcon
              icon="museum"
              inline
              style={{
                fontSize: '1.2em',
                transform: 'rotate(4deg)',
              }}
            />{' '}
          </>
        )}
        {capitalize(names[`name-${language}`])}
      </Box>
    </Box>
  );
};

export default NameTag;

NameTag.propTypes = {
  names: PropTypes.object.isRequired,
  donated: PropTypes.bool,
  fontSize: PropTypes.string,
};
