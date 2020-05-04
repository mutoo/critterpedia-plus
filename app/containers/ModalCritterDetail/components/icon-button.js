import PropTypes from 'prop-types';
import SvgIcon from 'components/svg-icon';
import { Button } from 'rebass';
import React from 'react';

const IconButton = ({ icon, ...props }) => (
  <Button
    sx={{ color: 'grey-33', background: 'transparent', outline: 'none' }}
    {...props}
  >
    <SvgIcon icon={icon} fontSize={32} />
  </Button>
);

export default IconButton;

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
};
