import React from 'react';
import PropTypes from 'prop-types';
import FishIcon from 'assets/images/fish.svg';
import PreviewBox from './preview-box';
import { acnhapi } from '../../../configureAxios';

const FishPreview = ({ data, ...props }) => (
  <PreviewBox
    data={data}
    avatar={`${acnhapi.defaults.baseURL}/icons/fish/${data.id}`}
    category={<FishIcon width={32} height={32} />}
    {...props}
  />
);

export default FishPreview;

FishPreview.propTypes = {
  data: PropTypes.object.isRequired,
};
