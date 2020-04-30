import { keyframes } from '@emotion/core';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const leftToRight = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const scale = keyframes`
  0% {
    transform: scale(1, 1);
  }
  
  50% {
    transform: scale(1.2, 1.2);
  }
  
  100% {
    transform: scale(1, 1);
  }
`;
