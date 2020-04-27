import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Flex, Image } from 'rebass';
import NameTag from 'pages/Critterpedia/components/name-tag';

const PreviewBox = ({ avatar, category, data, ...props }) => {
  const [theAvatar, setAvatar] = useState(avatar);
  return (
    <Flex
      className="acnh-preview-box"
      sx={{
        position: 'relative',
        border: '2px solid',
        borderColor: 'grey-33',
        width: 120,
        height: 120,
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
          borderColor: 'grey-99',
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
      {theAvatar ? (
        <Image
          src={theAvatar}
          sx={{
            width: 64,
            height: 64,
          }}
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
