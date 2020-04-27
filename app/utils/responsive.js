import { useMediaQuery } from 'react-responsive';
import theme from 'theme';

export const useTablet = () =>
  useMediaQuery({ query: `screen and (min-width: ${theme.breakpoints.md})` });

export const useDesktop = () =>
  useMediaQuery({ query: `screen and (min-width: ${theme.breakpoints.lg})` });

export const usePrint = () => useMediaQuery({ query: `print` });
export const useScreen = () => useMediaQuery({ query: `screen` });
