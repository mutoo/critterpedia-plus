import PropTypes from 'prop-types';
import SvgIcon from 'components/svg-icon';
import { Button } from 'rebass';
import React from 'react';

const IconButton = ({ icon, ...props }) => (
  <Button
    sx={{
      color: 'action',
      background: 'transparent',
      outline: 'none',
      cursor: 'pointer',
      transition: 'color ease-out 0.2s',
      '&:hover': {
        color: 'action-active',
      },
    }}
    {...props}
  >
    <SvgIcon icon={icon} fontSize={32} />
  </Button>
);

export default IconButton;

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
};
