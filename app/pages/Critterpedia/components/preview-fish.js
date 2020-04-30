import React from 'react';
import PropTypes from 'prop-types';
import FishIcon from 'assets/icons/fish.svg';
import PreviewBox from './preview-box';
import { acnhapi } from '../../../configureAxios';

const PreviewFish = ({ data, ...props }) => (
  <PreviewBox
    data={data}
    avatar={`${acnhapi.defaults.baseURL}/icons/fish/${data.id}`}
    preview={<FishIcon width={32} height={32} />}
    category="fish"
    {...props}
  />
);

export default PreviewFish;

PreviewFish.propTypes = {
  data: PropTypes.object.isRequired,
};
