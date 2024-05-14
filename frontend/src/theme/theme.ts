import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import { fontSizes, fontWeights, fonts, textStyles } from './foundations/fonts';
import { radioTheme } from './components/Radio';

import { Theme as ChakraTheme } from '@chakra-ui/react';

declare module '@emotion/react' {
  export interface Theme extends ChakraTheme {
    colors: {
      primary: string;
      secondary: string;
      warning: string;
      error: string;
      gray: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
      green: {
        '10': string;
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
      teal: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
      red: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
      orange: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
        '900': string;
      };
    };
  }
}

const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  textStyles,
  components: {
    Radio: radioTheme,
  },
});

export default theme;
