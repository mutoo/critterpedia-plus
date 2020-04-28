import React from 'react';
import PropTypes from 'prop-types';
import InsectIcon from 'assets/icons/insects.svg';
import PreviewBox from './preview-box';
import { acnhapi } from '../../../configureAxios';

const InsectPreview = ({ data, ...props }) => (
  <PreviewBox
    data={data}
    avatar={`${acnhapi.defaults.baseURL}/icons/bugs/${data.id}`}
    category={<InsectIcon width={32} height={32} />}
    {...props}
  />
);

export default InsectPreview;

InsectPreview.propTypes = {
  data: PropTypes.object.isRequired,
};
