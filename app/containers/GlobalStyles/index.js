import React from 'react';
import { Global, css } from '@emotion/core';

import 'sanitize.css/sanitize.css?global';
import 'swiper/css/swiper.css?global';
import './index.css?global';

import BackgroundImg from 'assets/images/background.jpg';

const GlobalStyle = () => (
  <Global
    styles={css`
      body {
        background-image: url(${BackgroundImg});
      }
    `}
  />
);

export default GlobalStyle;
