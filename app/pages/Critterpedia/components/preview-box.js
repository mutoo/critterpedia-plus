import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Flex, Box, Image } from 'rebass';
import NameTag from 'components/name-tag';

const PreviewBox = ({ avatar, category, data, ...props }) => {
  const [theAvatar, setAvatar] = useState(avatar);
  const [isLoaded, setLoaded] = useState(false);
  return (
    <Flex
      className="acnh-preview-box"
      sx={{
        position: 'relative',
        border: '2px solid',
        borderColor: 'grey-99',
        width: 100,
        height: 100,
        p: 'md',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          left: '4px',
          right: '4px',
          border: '2px dashed',
          borderColor: 'grey-66',
          opacity: '0',
          transition: 'opacity ease-out 0.2s',
        },
        '&:hover::after': {
          opacity: 1,
        },
        '.acnh-critterpedia-slide &:not(:last-of-type)': {
          mb: '-2px',
        },
      }}
      {...props}
    >
      <Box
        sx={{
          color: 'rgba(0,0,0,0.1)',
          transition: 'transform ease-out 0.3s',
          transform: theAvatar && isLoaded ? 'scale(0)' : 'scale(1)',
        }}
      >
        {category}
      </Box>
      {theAvatar ? (
        <Image
          src={theAvatar}
          sx={{
            width: 64,
            height: 64,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity ease-out 0.3s',
            opacity: isLoaded ? 1 : 0,
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setAvatar(null)}
        />
      ) : (
        category
      )}
      <NameTag names={data.name} />
    </Flex>
  );
};

export default PreviewBox;

PreviewBox.propTypes = {
  avatar: PropTypes.string,
  category: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};
