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
