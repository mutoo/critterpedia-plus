import React from 'react';
import { Global, css } from '@emotion/core';
import 'swiper/css/swiper.css';
import './styles/index.css';

const GlobalStyle = () => (
  <Global
    styles={css`
      html,
      body {
        height: 100%;
        width: 100%;
        line-height: 1.5;
        color: #333333;
      }

      html {
        font-size: 62.5%; /* rem root */
      }

      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

        @media print {
          height: auto;
        }
      }

      body.fontLoaded {
        font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      body.ReactModal__Body--open {
        overflow: hidden;
      }

      /* BET EASY SLIP WIDGET */
      /* TODO: this selector maybe changed in future,
     it'd better be injected dynamically */
      .css-1ew4772 {
        left: 5px !important;
        &.collapse {
          display: initial !important;
          transform: translateX(-280%) !important;
        }
      }

      [id^='google_ads_iframe'] {
        background-color: #dedede;
      }

      /* the animation for loader.svg */
      @keyframes loader-fade {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `}
  />
);

export default GlobalStyle;
